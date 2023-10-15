import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [logoutStatus, setLogoutStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/user/logout')
            .then(res => {
                console.log('Logout successful:', res.data.message);
                navigate('/login');
                setLogoutStatus(res.data.message);
            })
            .catch(error => {
                console.error('Logout error:', error);
                setLogoutStatus('Logout failed');
            });
    }, []);

    return (
        <div>
            <p>Logout Status: {logoutStatus}</p>
        </div>
    );
}

export default Logout;
