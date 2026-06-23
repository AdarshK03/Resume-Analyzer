import { useNavigate } from "react-router-dom";
import api from '../services/api';
import {useState, useEffect} from 'react';

function History (){
    const navigate = useNavigate();

    const [history, setHistory] =useState([]);

    useEffect(()=>{
        fetchhistory();
    },[]);

    const fetchhistory = async()=>{
        const token = localStorage.getItem("token");

        try{
            const res = await api.get('/resume/history',{
                headers:{
                    Authorization:
                        `bearer ${token}`
                }
            });

            setHistory(res.data);

            //console.log(res.data);
        }
        catch(e){
            console.log(e);
            alert(e.response?.data?.message);
        };
    };

    return (
        <>
        <div className="bg-slate-400">
            {
                history.map((item)=>(
                    <div key={item.id} className="flex gap-10 mb-5 bg-amber-200 w-min" onClick={()=>{navigate(`/analysis/${item.id}`)}}>
                        <h1>TITLE: {item.file_name}</h1>
                        <h2>TOTAL SCORE : {item.total_score}</h2>
                        <p>CREATED ON : {item.created_at}</p>
                    </div>
                ))
            }
        </div>
        </>
    );
}

export default History;