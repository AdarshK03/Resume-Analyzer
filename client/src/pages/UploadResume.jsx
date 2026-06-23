import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import api from '../services/api';

function UploadResume (){
    const [file,setFile] = useState(null);

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit () {
        if(!file){
            alert('please select a file !');
            return;
        }
        setLoading(true);

        try{
            const formData = new FormData();

            formData.append('resume', file);

            const token = localStorage.getItem('token');

            const res = await api.post('/resume/upload',formData, {headers :{Authorization : `Bearer ${token}`}});

            console.log(res);

            navigate(`/analysis/${res.data.id}`);
        }catch(e){
            alert(e.response?.data?.message || "upload failed !");
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex bg-slate-400 justify-center">
                <div className="bg-red-300 w-80 m-10 h-96 flex flex-col">
                    <input type="file" name="resume" placeholder="upload your resume" className="bg-slate-400 w-50 ml-13 mt-10 rounded-xl" onChange={(e)=>setFile(e.target.files[0])}/>
                    <button className="bg-slate-600 w-20  ml-27 m-10 rounded-xl" onClick={handleSubmit} disabled={loading} >{loading?'analyzing...':'UPLOAD'}</button>
                    {
                        loading && (
                            <h1 className="text-amber-200">analyzing your resume
                                please wait, this may take few seconds!
                            </h1>
                        )
                    }
                </div>
            </div>        
        </>
    );
}

export default UploadResume;