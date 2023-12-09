import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';

export default function UpdatePassword() {
    const [password,setPassword] = useState()
    const navigate = useNavigate();
    const {state} = useLocation();
    const { resetLink} = state; 

    const updatePassword = async (e) => {
        e.preventDefault()
        try {
          const response = await axios.post(resetLink, {
            password: password
          });
          console.log('Password reset request successful', response.data);
        } catch (error) {
          console.error('Error sending reset request:', error);
        }
        navigate('/login');
      };

  return (
    <div className="container mx-auto mt-20">
        {/* <Navbar/> */}
        <div className="max-w-md mx-auto bg-white rounded p-8 shadow-lg" >
            <h2 className="text-2xl font-bold mb-4">Update Password</h2>
            <form id="loginForm" className="space-y-4" onSubmit={updatePassword}>
                <div>
                    <label for="password" className="block mb-1">New Password:</label>
                    <input type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded"
                    onChange={(E)=>setPassword(E.target.value)}/>
                </div>
                <button type="submit" className="block w-full bg-blue-500 text-white py-2 rounded">Update</button>
            </form>
        </div>
    </div>
  )
}