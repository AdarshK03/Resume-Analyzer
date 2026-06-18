import { useState } from "react";
import api from '../services/api';
import {useNavigate} from 'react-router-dom';

function Register (){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name :'',
        email : '',
        password : '',
    });

    const handleChange = (e) =>{
        setFormData({
            ...formData, [e.target.name] : e.target.value,
        });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            const response = await api.post('./auth/register', formData);

            alert(response.data.message);

            navigate('/login');
        }
        catch(error){
            console.error(error);

            alert(error.response?.data?.message || 'registration failed');
        }
    };

        return (
            <>
                <div className="min-h-screen flex items-center justify-center">
                    <form onSubmit = {handleSubmit} className="flex flex-col gap-4 w-80">
                        <h1 className="text-red-600">REGISTER :)</h1>
                        <input type="text" name="name" placeholder="enter your name" value={formData.name} onChange={handleChange} className=""/>
                        <input type="email" name="email" placeholder="enter your email" value={formData.email} onChange={handleChange} className=""/>
                        <input type="password" name="password" placeholder="create a new password" value={formData.password} onChange={handleChange} className=""/>
                        <button>REGISTER</button>
                    </form>
                </div>            
            </>
        );
}

export default Register;