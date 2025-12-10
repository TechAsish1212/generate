import React, { useState } from "react";
import UploadQR from "./UploadQR";
import Scanner from "./Scanner";
import LinkQR from "./LinkQR";

function App() {
  const [page, setPage] = useState("upload");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Navigation Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        
        <button
          onClick={() => setPage("upload")}
          className={`px-4 py-2 text-white rounded-lg ${
            page === "upload" ? "bg-blue-600" : "bg-gray-600"
          }`}
        >
          Upload → QR
        </button>

        <button
          onClick={() => setPage("link")}
          className={`px-4 py-2 text-white rounded-lg ${
            page === "link" ? "bg-blue-600" : "bg-gray-600"
          }`}
        >
          Link → QR
        </button>

        <button
          onClick={() => setPage("scan")}
          className={`px-4 py-2 text-white rounded-lg ${
            page === "scan" ? "bg-blue-600" : "bg-gray-600"
          }`}
        >
          Scanner
        </button>

      </div>

      {/* Page Renderer */}
      {page === "upload" && <UploadQR />}
      {page === "link" && <LinkQR />}
      {page === "scan" && <Scanner />}
    </div>
  );
}

export default App;
