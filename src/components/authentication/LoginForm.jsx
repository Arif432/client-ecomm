import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function LoginForm() {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['token']);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/user/login', { email, password });
            if (res.status === 200) {
                const token = res.data.token;
                setCookie('token', token, { path: '/' });

                if (res.data.role === 'admin') {
                    await navigate('/admin');
                    alert('Login success admin');
                } else if (res.data.role === 'customer') {
                    await navigate('/');
                    alert('Login success customer');
                }
            }
        } catch (error) {
            alert(error.response.data.error);
        }
    }
    
  return (
      <div className="container mx-auto mt-20">
        {/* <Navbar/> */}
        <div className="max-w-md mx-auto rounded p-8 shadow-lg" style={{background:"#ece9e9"}}>
            <h2 className="text-2xl font-bold mb-4" style={{color:"#333333"}}>Login</h2>
            <form id="loginForm" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label for="email" className="block mb-1" style={{color:"#333333"}}>Email:</label>
                    <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded"
                    onChange={(E)=>setEmail(E.target.value)}/>
                </div>
                <div>
                    <label for="password" className="block mb-1" style={{color:"#333333"}}>Password:</label>
                    <input type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded"
                    onChange={(E)=>setPassword (E.target.value)}/>
                </div>
                <button type="submit" className="block w-full bg-blue-500 text-white py-2 rounded">Login</button>
            </form>
            <Link to="/register" className="block w-full py-2 rounded" style={{color:"#333333"}}>register</Link>
            <Link to='/forget' className="block w-full text-blue-500 underline text-right">ForgotPassword</Link>
        </div>
    </div>
  );
}
