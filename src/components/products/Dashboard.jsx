import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Navbar from '../Navbar';

export default function Dashboard() {
    const [suc, setSuc] = useState('');
    const navigate = useNavigate();
    const [cookies,removeCookie] = useCookies(['token']);
    const token = cookies['token'];

    const handleLogout = () => {
        axios.get('http://localhost:5000/user/logout')
            .then(res => {
                console.log('Logout successful:', res.data.message);
                // Remove the token from cookies and memory
                setSuc('');
                removeCookie('token');  // Clear token from cookies
                navigate('/login');
            })
            .catch(error => {
                console.error('Logout error:', error);
                // Clear the token from cookies and memory
                setSuc('');
                removeCookie('token');  // Clear token from cookies on error
                navigate('/login');
            });
    }
    
    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            axios.get('http://localhost:5000/user/admin', {
                headers: {
                    "token": token,
                },
            })
            .then(res => {
                if (res.status === 200) {
                    console.log('Response:', res.data);
                    if (res.data === 'Success') {
                        setSuc('Login success admin');
                    } else {
                        navigate('/allProducts');
                        alert('Login success customer');
                    }
                } else {
                    console.error('Login failed:', res.data);
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                navigate('/login');
            });
        }
    }, [token, navigate]);
    
    
    return (
        <div>
            <Navbar/>
            <div>sadsadasddsadsasd admin</div>
            <button onClick={handleLogout}>Logout funciton</button> 
            <h1>{suc}</h1>
        </div>
    );
}
