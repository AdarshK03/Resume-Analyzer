import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import api from '../services/api';

function UploadResume (){
    const [file,setFile] = useState(null);

    async function handleSubmit () {
        if(!file){
            alert('please select a file !');
            return;
        }

        try{
            const formData = new FormData();

            formData.append('resume', file);

            const token = localStorage.getItem('token');

            const res = await api.post('/resume/upload',formData, {headers :{Authorization : `Bearer ${token}`}});

            console.log(res);
        }catch(e){
            alert(e.response?.data?.message || "upload failed !");
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="bg-red-300 w-80 m-10 h-80 flex flex-col">
                    <input type="file" name="resume" placeholder="upload your resume" className="bg-slate-400 w-50 ml-13 mt-10 rounded-xl" onChange={(e)=>setFile(e.target.files[0])}/>
                    <button className="bg-slate-600 w-20  ml-27 m-10 rounded-xl" onClick={handleSubmit} >UPLOAD</button>
                </div>
            </div>        
        </>
    );
}

export default UploadResume;