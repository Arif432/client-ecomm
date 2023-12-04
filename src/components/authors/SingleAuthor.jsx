import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using react-router

import axios from 'axios';

function SingleAuthor() {
  const [author, setAuthor] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/authors/getSingleAuthor/${id}`);
        setAuthor(response.data);
      } catch (error) {
        console.error('Error fetching author data:', error);
      }
    };

    fetchAuthor();
  }, [id]);

  return (
    <div className='bg-blue-300 rad' style={{borderRadius:'12px', flex:1 , alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <h1>Author Detail</h1>
      <div className="flex">
      <div style={{ width: '300px', marginRight: '20px' }}>
        {author.authorImage ? (
          <img
            src={author.authorImage}
            alt={author.name}
            style={{ width: '100%', height: '300px', borderRadius: '8px', objectFit: 'cover', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          />
        ) : (
          <div style={{ backgroundColor: '#eee', width: '100%', height: '300px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <p>yes image</p>
          </div>
        )}
      </div>
      <div style={{ textAlign: 'left', maxWidth: '600px' }}>
        <h1>{author.name}</h1>
        <p style={{ fontSize: '16px', color: '#666', marginTop: '10px' }}>{author.introduction}</p>
      </div>
      </div>
      </div>
  );
}

export default SingleAuthor;
