import React from "react";
import logo from './assets/logo.svg'
import "./index.css"
function App() {
  return (
    <div className="min-w-screen min-h-screen bg">
      <nav className="h-[7rem] w-screen text-white font-bold text-3xl p-12 days flex flex-row items-center"><img className="mr-4 h-12 w-12 "src={logo} alt="Logo" />PDF BIND
     </nav>
      <div className="h-[35rem]  items-center flex flex-col p-8">
        <div className="text-3xl text-white font-bold mt-6 istok">Upload your PDF</div>
        <div className="text-white text-xl font-thin my-6 istok">Merge pdf with ease.</div>
        <div className=" text-center text-lg rounded-xl py-4 px-6 w-[7rem] bg-[#845EC2] hover:scale-105 ease-in-out duration-300 text-white ">Upload</div>
      </div>
    </div>
  );
}

export default App;
