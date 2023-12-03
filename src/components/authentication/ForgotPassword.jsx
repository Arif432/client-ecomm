import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [email,setEmail] = useState()
    const [resetLink,setResetLink] = useState()
    const navigate = useNavigate()

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        try {
          const response = await axios.post('http://localhost:5000/user/forgot-password', {
            email: email // Assuming 'email' is the state variable containing the user's email
          });
          console.log('Password reset request successful', response.data.link);
          await navigate('/updatePassword', {state : { resetLink: response.data.link}});
        } catch (error) {
          console.error('Error sending reset request:', error);
        }
      };

  return (
    <div className="container mx-auto mt-20">
        {/* <Navbar/> */}
        <div className="max-w-md mx-auto bg-white rounded p-8 shadow-lg" >
            <h2 className="text-2xl font-bold mb-4">reset password</h2>
            <form id="loginForm" className="space-y-4" onSubmit={handleForgotPassword}>
                <div>
                    <label for="email" className="block mb-1">Email:</label>
                    <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded"
                    onChange={(E)=>setEmail(E.target.value)}/>
                </div>
                <button type="submit" className="block w-full bg-blue-500 text-white py-2 rounded">send email</button>
            </form>
        </div>
    </div>
  )
}
