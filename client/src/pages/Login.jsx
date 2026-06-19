import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../services/api';

function Login (){
    const [formData, setFormData] = useState({
        email : '',
        password : '',
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setFormData({
            ...formData, [e.target.name] : e.target.value,
        });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            const res = await api.post('/auth/login', formData);

            console.log(res.data);

            localStorage.setItem('token', res.data.token);

            navigate('/');
        }
        catch(e){
            alert(e.response?.data?.message || "login failed !!");
        }
    };
        return (
            <>
                <div className='bg-slate-400 flex justify-center'>
                    <form onSubmit={handleSubmit}
                    className='bg-slate-300 flex flex-col gap-7'>
                        <input type='email' name='email' placeholder='enter your email' value={formData.email} onChange={handleChange} className='bg-amber-100'/>
                        <input type='password' name='password' placeholder='enter your password' value={formData.password} onChange={handleChange} className='bg-amber-100'/>

                        <button>LOGIN</button>
                    </form>
                </div>
            </>
        );
}

export default Login;