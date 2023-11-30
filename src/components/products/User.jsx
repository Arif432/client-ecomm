import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function User() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['token']);
  const token = cookies['token'];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/getUserInfo', {
          headers: {
            'token': token,
          },
        });

        if (!response.data.user) {
          throw new Error('Failed to fetch user information');
        }

        setUserData(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user information:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]); // Include token in the dependency array to re-run the effect when the token changes

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <div>
          <h2>User Information</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
          <img src={userData.avatar} alt="User Avatar" style={{ maxWidth: '100px' }} />
        </div>
      ) : (
        <p>Error loading user information</p>
      )}
    </div>
  );
}
