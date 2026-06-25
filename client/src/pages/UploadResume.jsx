// import { useState } from "react";
// import {useNavigate} from 'react-router-dom';
// import api from '../services/api';

// function UploadResume (){
//     const [file,setFile] = useState(null);

//     const [analysis, setAnalysis] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();

//     async function handleSubmit () {
//         if(!file){
//             alert('please select a file !');
//             return;
//         }
//         setLoading(true);

//         try{
//             const formData = new FormData();

//             formData.append('resume', file);

//             const token = localStorage.getItem('token');

//             const res = await api.post('/resume/upload',formData, {headers :{Authorization : `Bearer ${token}`}});

//             console.log(res);

//             navigate(`/analysis/${res.data.id}`);
//         }catch(e){
//             alert(e.response?.data?.message || "upload failed !");
//         }
//         finally{
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <div className="flex bg-slate-400 justify-center">
//                 <div className="bg-red-300 w-80 m-10 h-96 flex flex-col">
//                     <input type="file" name="resume" placeholder="upload your resume" className="bg-slate-400 w-50 ml-13 mt-10 rounded-xl" onChange={(e)=>setFile(e.target.files[0])}/>
//                     <button className="bg-slate-600 w-20  ml-27 m-10 rounded-xl" onClick={handleSubmit} disabled={loading} >{loading?'analyzing...':'UPLOAD'}</button>
//                     {
//                         loading && (
//                             <h1 className="text-amber-200">analyzing your resume
//                                 please wait, this may take few seconds!
//                             </h1>
//                         )
//                     }
//                 </div>
//             </div>        
//         </>
//     );
// }

// export default UploadResume;


import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api';
import Navbar from "../components/Navbar";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

            formData.append('resume', file);

            const token = localStorage.getItem('token');

            const res = await api.post('/resume/upload',formData, {headers :{Authorization : `Bearer ${token}`}});

            console.log(res);

            navigate(`/analysis/${res.data.id}`);
    } catch (err) {
      console.log(err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
        <Navbar/>
      <div className="mx-auto max-w-4xl px-6 py-16">

        {/* Heading */}

        <div className="text-center">

          <h1 className="text-5xl font-bold">

            Upload your{" "}

            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Resume
            </span>

          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Upload your PDF resume and let AI analyze it in seconds.
          </p>

        </div>

        {/* Upload Box */}

        <div
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);

            const uploaded = e.dataTransfer.files[0];

            if (uploaded) {
              setFile(uploaded);
            }
          }}
          className={`

            mt-12
            cursor-pointer
            rounded-3xl
            border-2
            border-dashed
            p-16
            text-center
            transition

            ${
              dragging
                ? "border-cyan-400 bg-slate-900"
                : "border-slate-700 bg-slate-900"
            }

          `}
        >

          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-4xl">

            📄

          </div>

          <h2 className="mt-8 text-2xl font-semibold">

            {file
              ? file.name
              : "Drag & Drop your Resume"}

          </h2>

          <p className="mt-3 text-slate-400">

            {file
              ? `${(file.size / 1024).toFixed(1)} KB`
              : "or click to browse"}

          </p>

          <p className="mt-6 text-sm text-slate-500">

            PDF only • Maximum 10 MB

          </p>

        </div>

        {/* Buttons */}

        <div className="mt-10 flex justify-end gap-4">

          <button
            onClick={() => setFile(null)}
            className="rounded-xl border border-slate-700 px-6 py-3 hover:bg-slate-800"
          >
            Clear
          </button>

          <button
            disabled={!file || loading}
            onClick={handleSubmit}
            className="rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-3 font-semibold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loading
              ? "Analyzing..."
              : "Analyze Resume →"}

          </button>

        </div>

        {/* Bottom Hint */}

        <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h3 className="text-lg font-semibold">

            What happens next?

          </h3>

          <ul className="mt-4 space-y-3 text-slate-400">

            <li>✓ Extract text from your PDF.</li>

            <li>✓ Analyze using Google Gemini AI.</li>

            <li>✓ Score Education, Skills, Projects, Experience and Structure.</li>

            <li>✓ Save the report to your account.</li>

            <li>✓ View and compare previous analyses anytime.</li>

          </ul>

        </div>

      </div>

    </div>
  );
}

export default UploadResume;