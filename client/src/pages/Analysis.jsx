import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../services/api';
import { useNavigate } from "react-router-dom";

function Analysis (){
    const {id} = useParams();
    const navigate = useNavigate();
    const [analysis, setanalysis] = useState(null);

    useEffect (()=>{
        fetchanalysis();
    },[]);
    
    const fetchanalysis = async()=>{
        try{
            const token = localStorage.getItem('token');

            const res = await api.get(`/resume/${id}`, {
                headers : {
                    Authorization : `bearer ${token}`
                }
            });

            setanalysis(res.data.analysis);
        }catch(e){
            alert(e.response?.data?.message);
            console.log(e);
        }
    }

    if(!analysis){
        return (
            <h1 className="text-center mt-10 text-2xl text-red-300">LOADING...</h1>
        )
    }
    return(
        <>
            {
                analysis && (
                    <div className="bg-red-300 w-80 m-10 h-80">

                        <h2>
                            Education:
                            {analysis.educationScore}
                        </h2>

                        <h2>
                            Skills:
                            {analysis.skillsScore}
                        </h2>

                        <h2>
                            Projects:
                            {analysis.projectsScore}
                        </h2>

                        <h2>
                            Experience:
                            {analysis.experienceScore}
                        </h2>

                        <h2>
                            Structure:
                            {analysis.structureScore}
                        </h2>

                        <h1>
                            Total:
                            {analysis.totalScore}
                        </h1>

                        </div>
                    )
                }
                <div className="flex">    
                {
                    analysis && (
                        <div className="m-10 w-80 bg-red-300 p-5 rounded">

                            <h2 className="font-bold mb-3">
                                Strengths
                            </h2>

                            <ul className="list-disc pl-5">
                                {
                                    analysis.strengths.map(
                                        (item, index) => (
                                            <li key={index}>
                                        {item}
                                    </li>
                                    )
                                )
                                }
                            </ul>

                            </div>
                        )
                }
                {
                    analysis && (
                        <div className="m-10 w-80 bg-red-300 p-5 rounded">

                                <h2 className="font-bold mb-3">
                                    Weaknesses
                                </h2>

                                <ul className="list-disc pl-5">
                                    {
                                        analysis.weaknesses.map(
                                            (item, index) => (
                                                <li key={index}>
                                            {item}
                                        </li>
                                        )
                                    )
                                    }
                                </ul>

                                </div>
                            )
                }
                {
                    analysis && (
                        <div className="m-10 w-80 bg-red-300 p-5 rounded">

                            <h2 className="font-bold mb-3">
                                Improvements
                            </h2>

                            <ul className="list-disc pl-5">
                                {
                                    analysis.improvements.map(
                                        (item, index) => (
                                            <li key={index}>
                                        {item}
                                    </li>
                                    )
                                )
                                }
                            </ul>

                            </div>
                        )
                }
        </div>
        <div className="text-center">
            <button className="bg-slate-600 text-amber-200 w-50 mb-10 rounded-xl" onClick={()=>{navigate('/history')}}>PREVIOUS RECORDS</button>
        </div>
        </>
    );
}


export default Analysis;