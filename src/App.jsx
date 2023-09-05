import React, { useState } from "react";
import logo from "./assets/logo.svg";
import "./index.css";
import Uploader from "./components/Uploader";
import PDFMerger from "pdf-merger-js"; // Import pdf-merger-js

export default function App() {
  const [mergedPdf, setMergedPdf] = useState(null); // State to store the merged PDF
  const [uploadMode, setUploadMode] = useState(false);

  // Function to merge PDFs using pdf-merger-js
  const mergePDFs = async (uploadedFiles) => {
    if (uploadedFiles.length === 0) return;
    try {
      const merger = new PDFMerger();
      console.log(uploadedFiles)
      for (const { file } of uploadedFiles) {
        await merger.add(file)
      }
      const mergedPdf = await merger.saveAsBlob();
      setMergedPdf(mergedPdf);
    } catch (error) {
      console.error("Error merging PDFs:", error);
    }
  };

  // Function to download the merged PDF
  const downloadMergedPDF = () => {
    if (mergedPdf) {
      console.log(mergedPdf); // Check if mergedPdf has data
      const a = document.createElement("a");
      a.href = URL.createObjectURL(mergedPdf);
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // Function to handle file uploads
  const handleUpload = (uploadedFiles) => {
    // Call the mergePDFs function with the uploaded files
    mergePDFs(uploadedFiles);
  };

  const UploadHandler = () => {
    setUploadMode(!uploadMode);
  };

  return (
    <div className="z-[-1] min-w-screen min-h-screen bg no-scrollbar">
      <nav className="h-[7rem] w-screen text-white font-bold text-3xl p-12 days flex flex-row items-center">
        <img className="mr-4 h-12 w-12" src={logo} alt="Logo" />
        PDF BIND
      </nav>
      {uploadMode && (
        <div className="absolute top-0 left-0 p-2 w-full h-full bg-white bg-opacity-10 z-50 flex justify-center items-center">
          <div className="white-box p-6 bg-white shadow-md rounded-lg">
            <div className="text-right mb-2">
              <button
                onClick={UploadHandler}
                className="text-white hover:text-black h-8 w-8 shadow-xl rounded-full bg-red-500"
              >
                &#x2715;
              </button>
            </div>
            <Uploader onUpload={handleUpload} />
            <div className="mt-4 text-center">
              <button
                onClick={downloadMergedPDF}
                className="px-6 py-4 bg-[#845EC2] text-white rounded-md hover:bg-opacity-80"
              >
                Download Merged PDF
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-[35rem] items-center flex flex-col p-8">
        <div className="text-3xl text-white font-bold mt-6 istok">
          Upload your PDF
        </div>
        <div className="text-white text-xl font-thin my-6 istok">
          Merge pdf with ease.
        </div>
        <div
          onClick={UploadHandler}
          className="text-center shadow-xl text-lg rounded-xl py-4 px-6 w-[7rem] bg-[#845EC2] hover:scale-105 ease-in-out duration-300 text-white"
        >
          Upload
        </div>
      </div>
    </div>
  );
}
