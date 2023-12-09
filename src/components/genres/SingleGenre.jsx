import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SingleGenre() {
  const { id } = useParams();
  const [genre, setGenre] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleGenre = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/genres/getSingleGenre/${id}`);
        setGenre(response.data);
      } catch (error) {
        console.error('Error fetching single genre:', error);
        navigate('/error');
      }
    };
    fetchSingleGenre();
  }, [id, navigate]);

  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: `url(${genre?.genreImage})`, height: '30vh', width: '100%' }}>
      <div className="container mx-auto p-8 text-white">
        {genre ? (
          <div>
            {/* <h2 className="text-3xl font-bold mb-2">{genre.genreName}</h2>
            <p className="text-lg mb-4">{genre.description}</p> */}
          </div>
        ) : (
          <p className="text-center text-xl mt-4">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default SingleGenre;
