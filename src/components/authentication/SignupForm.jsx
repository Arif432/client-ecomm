import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function SignupForm() {

    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }
        console.log('Form data:', { name, email, password });
        axios.post('http://localhost:5000/user/register', { name, email, password })
            .then(res => {
                console.log('Response:', res);
                navigate('/login');
            })
            .catch(error => {
                console.log('Error:', error);
                if (error.response) {
                    console.log('Server Error:', error.response.data);
                    alert(error.response.data.error);
                } else if (error.request) {
                    console.log('Request Error:', error.request);
                } else {
                    console.log('Error Message:', error.message);
                }
            });
    }
    

  return (
    <div className="container mx-auto mt-4" >
    <div className="max-w-md mx-auto bg-white rounded p-4 shadow-lg" style={{background:"#ece9e9"}}>
        <h2 className="text-2xl font-bold mb-4" style={{color:styles.textColor}}>Signup</h2>
        <form id="loginForm"  className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label for="title" className="block mb-1" style={{color:styles.textColor}}>Name:</label>
                <input 
                style={styles.input}
                 onChange={(E)=>setName(E.target.value)}
                type="text" id="title" name="title" className="w-full px-3 py-2 border border-gray-300 rounded"/>
            </div>
            <div>
                <label for="email" className="block mb-1" style={{color:styles.textColor}}>Email:</label>
                <input style={styles.input} type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded"
                 onChange={(E)=>setEmail(E.target.value)}/>
            </div>
            <div>
                <label for="password" className="block mb-1" style={{color:styles.textColor}}>Password:</label>
                <input style={styles.input} type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded"
                  onChange={(E)=>setPassword (E.target.value)}/>
            </div>
            <div>
                <label for="email" className="block mb-1" style={{color:styles.textColor}}>Confirm password</label>
                <input style={styles.input} type="password" id="confirmPassword" name="confirmPassword" className="w-full px-3 py-2 border border-gray-300 rounded"/>
            </div>
           
            <button type="submit" className="block w-full bg-blue-500 text-white py-2 rounded">Signup</button>
        </form>
        <Link to="/login" className="block w-full py-2 rounded" style={{color:styles.textColor}}>Login</Link>

    </div>
</div>
  )
}


const styles = {
    input: {
        background: '#F0EEEE',
        border: '1px solid #ccc',
        padding: '8px',
        borderRadius: '4px',
    },
}