import React, { useState } from "react";
import axios from "axios";

function UploadQR() {
  const [qr, setQr] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    const res = await axios.post("http://localhost:5000/upload", form);
    setQr(res.data.qr);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload File → QR Code</h1>

      <label className="block w-full cursor-pointer text-center">
        <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 text-gray-500 hover:bg-gray-50">
          Click to Upload File
        </div>
        <input type="file" onChange={handleUpload} className="hidden" />
      </label>

      {qr && (
        <div className="mt-6 text-center">
          <img
            src={qr}
            alt="QR Code"
            className="w-56 h-56 mx-auto border rounded-xl shadow-md"
          />
        </div>
      )}
    </div>
  );
}

export default UploadQR;
    