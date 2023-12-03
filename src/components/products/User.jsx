import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { FaCamera, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function User() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [cookies, removeCookie] = useCookies(['token']);
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
        setEditedUserData(response.data.user); // Initialize editedUserData with user data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user information:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  

  const handleSave = async () => {
    try {
      // Make API call to update user information
      const response = await axios.put(
        `http://localhost:5000/user/updateUser/${userData._id}`,
        editedUserData,
        {
          headers: {
            'token': token,
          },
        }
      );
      setIsEditing(false);
      setUserData(response.data.updatedUser);
    } catch (error) {
      console.error('Error updating user information:', error);
    }
    navigate('/login');
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/user/deleteUser/${userData._id}`, {
        headers: {
          'token': token,
        },
      });
      removeCookie('token'); // Remove the token from cookies
      navigate('/login');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedUserData((prevData) => ({ ...prevData, avatar: reader?.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    removeCookie('token'); // Remove the token from cookies
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4 flex justify-between items-center">
          <button onClick={handleLogout} className="bg-gray-500 text-white px-4 py-2 mt-2 ml-4">
                        Logout
          </button>
        <h1 className="text-3xl font-semibold m-auto">User Profile</h1>
        {userData && (
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 mr-8">
            <FaTrash/>
          </button>
        )}
      </header>

      <div className="container mx-auto mt-8 relative">
        <div onClick={(e) => handleImageChange(e)}>
          <img
            src={userData?.avatar}
            alt="User Avatar"
            className="rounded-full mx-auto"
            style={{ maxWidth: '100px' }}
          />
          <label>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <FaCamera
              className="w-4 h-4 inline-block ml-16 cursor-pointer"
              style={{ color: '#3B82F6', marginTop: -30 }}
            />
          </label>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : userData ? (
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">User Information</h2>
             
             
              {isEditing ? (
                <div className="mb-4">
                  <label htmlFor="name" className="text-gray-600">
                    Name:
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={editedUserData.name}
                      onChange={handleInputChange}
                      className="border-b-2 border-blue-500 ml-2 focus:outline-none"
                    />
                  </label>
                  <label htmlFor="email" className="text-gray-600 block mt-4">
                    Email:
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={editedUserData.email}
                      onChange={handleInputChange}
                      className="border-b-2 border-blue-500 ml-2 focus:outline-none"
                    />
                  </label>
                  <p className="text-gray-600 block mt-4">Role: {userData.role}</p>
                  <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 mt-4">
                    Save
                  </button>
                 
                </div>
              ) : (
                <div className="mb-4">
                  <p className="text-gray-600">Name: {userData.name}</p>
                  <p className="text-gray-600">Email: {userData.email}</p>
                  <p className="text-gray-600">Role: {userData.role}</p>
                  <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 mt-4">
                    Edit
                  </button>
                 
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">Error loading user information</p>
        )}
      </div>
    </div>
  );
}
