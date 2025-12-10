import express from "express";
import multer from "multer";
import QRCode from "qrcode";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

// Save file physically (important!)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Upload file → Generate QR (correct way)
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    // Public URL
    const fileUrl = `https://generate-2oiw.onrender.com/${req.file.filename}`;

    // QR of link
    const qr = await QRCode.toDataURL(fileUrl);

    res.json({
      success: true,
      fileUrl,
      qr
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error generating QR" });
  }
});

// QR for direct link
app.post("/generate-link-qr", async (req, res) => {
  try {
    const { link } = req.body;
    if (!link) return res.status(400).json({ message: "No link provided" });

    const qr = await QRCode.toDataURL(link);

    res.json({
      success: true,
      qr
    });
  } catch (err) {
    res.status(500).json({ message: "Error generating QR" });
  }
});

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

app.listen(5000, () => console.log("Server running on port 5000"));
