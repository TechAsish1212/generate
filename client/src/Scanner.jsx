import React, { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

function Scanner() {
  const videoRef = useRef(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    codeReader.decodeFromVideoDevice(
      null,
      videoRef.current,
      (res, err) => {
        if (res) {
          setResult(res.getText());
        }
      }
    );

    return () => codeReader.reset();
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-lg mx-auto mt-6">
      <h1 className="text-2xl font-bold text-center mb-4">QR Code Scanner</h1>

      <video ref={videoRef} className="w-full rounded-xl border shadow" />

      {result && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <strong>Scanned Result:</strong> {result}
        </div>
      )}
    </div>
  );
}

export default Scanner;
