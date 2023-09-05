import React, { useState } from "react";
import logo from "./assets/logo.svg";
import pdf from "./assets/pdf.svg";

import "index.css";
import Uploader from "./components/Uploader";
import PDFMerger from "pdf-merger-js";


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
    setMergedPdf(null)
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
    <div className="bg overflow-x-hidden min-h-screen">
      <nav className="h-[7rem] w-screen text-white font-bold text-3xl p-12 days flex flex-row items-center">
        <img className="mr-4 h-12 w-12" src={logo} alt="Logo" />
        PDF BIND
      </nav>
      {uploadMode && (
        <div className="absolute top-0 left-0 p-2 w-full h-full pink-glass bg-opacity-10 z-50 flex justify-center items-center">
          <div className="white-box p-6 pink-glass shadow-md rounded-lg">
            <div className="text-right mb-2">
              <button
                onClick={UploadHandler}
                className="text-white hover:scale-110 ease-in-out duration-300 drop-shadow-lg h-8 w-8 rounded-full bg-red-500"
              >
                &#x2715;
              </button>
            </div>
            <Uploader onUpload={handleUpload} />
            <div className="mt-4 text-center">
              <button
                onClick={downloadMergedPDF}
                className="px-6 py-4 blue-glass text-white rounded-lg hover:bg-opacity-80 drop-shadow-xl "
              >
                Download Merged PDF
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-[35rem] items-center flex flex-col p-8">
        <div className="text-4xl text-center text-white font-bold md:mt-[8rem] mt-[5rem] roboto">
          Upload your PDF
        </div>
        <div className="text-white text-xl font-regular my-6 roboto">
          Merge pdf with ease.
        </div>
        <div
          onClick={UploadHandler}
          className="text-center shadow-xl text-lg rounded-xl py-4 px-6 w-[7rem] blue-glass hover:scale-105 ease-in-out duration-300 text-white"
        >
          Upload
        </div>
      </div>
      <div className="p-6 text-white flex flex-col justify-center items-center pink-glass mb-8 gap-2 w-[90%] md:w-[60%] mx-auto">
<p className="days text-xl mb-4">How to combine PDF files online?</p>
<div className="flex  flex-wrap w-full justify-center md:gap-x-[6rem] gap-y-[2rem] items-center md:px-8 px-4">
  <div> <img className="animate-bounce slo" src={pdf} alt=""/></div>
<div className="text-md roboto mb-2">
  <ul>
<li> ➾ Click on the upload Button.</li>
<li>➾ Drag and drop or click and upload the PDF files you want to merge.</li>
<li>➾ Rearrange the Files in the desired order.</li>
<li>➾ Add more files, or remove files, if needed.</li>
<li>➾ Click on 'Download Merged Pdf'.</li>
<li>➾ Your File will automatically get downloaded.</li></ul></div>


</div>


      </div>
      <div className="p-4 justify-center pink-glass text-center text-white font-thin flex">
      <div>

      </div>
         
         © 2023 PDF BIND — Made with &nbsp;&#10084;&nbsp; for the people of the internet.

      </div>
    </div>
  );
}
