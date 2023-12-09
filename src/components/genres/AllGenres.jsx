import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AllGenres() {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/genres/getAllGenre');
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchData();
  }, []);

  const handleGenreClick = (genreId) => {
    navigate(`/getSingleGenre/${genreId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {genres.map((genre) => (
        <li
          key={genre._id}
          className="relative rounded-md overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
        >
          <div
            className="bg-cover bg-center bg-no-repeat h-48"
            style={{ backgroundImage: `url(${genre?.genreImage})` }}
            onClick={() => handleGenreClick(genre._id)}
          />
          <Link to={`/getSingleGenre/${genre._id}`} className="absolute inset-0 p-4 flex flex-col justify-end bg-black bg-opacity-20">
            <strong className="text-xl text-white">{genre.genreName}</strong>
            <p className="mt-2 text-gray-200 whitespace-pre-line">{genre.description}</p>
          </Link>
        </li>
      ))}
    </div>
  );
}

export default AllGenres;
