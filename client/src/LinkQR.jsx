import { useState } from "react";
import axios from "axios";

export default function LinkQR() {
  const [link, setLink] = useState("");
  const [qr, setQr] = useState("");

  const generateQR = async () => {
    if (!link) return alert("Enter a link first");

    const res = await axios.post("https://generate-2oiw.onrender.com/generate-link-qr", {
      link,
    });

    setQr(res.data.qr);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Link → QR Code</h1>

      <input
        type="text"
        placeholder="Enter any link..."
        className="w-full p-3 border rounded-xl focus:ring focus:ring-blue-300"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <button
        onClick={generateQR}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
      >
        Generate QR
      </button>

      {qr && (
        <div className="mt-6 text-center">
          <img
            src={qr}
            alt="QR"
            className="w-56 h-56 mx-auto border rounded-xl shadow-md"
          />
        </div>
      )}
    </div>
  );
}
