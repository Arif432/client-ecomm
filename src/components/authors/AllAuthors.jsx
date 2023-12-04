import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AuthorCard({ author }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <Link to={`/author/${author._id}`}>
            {author.authorImage ? (
            <img src={author.authorImage} alt={author.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} />
            ) : (
            <div style={{ backgroundColor: '#eee', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>No Image</p>
            </div>
            )}
            <div style={{ padding: '16px' }}>
            <h2 style={{ margin: '0' }}>{author.name}</h2>
            <p style={{ marginTop: '8px', color: '#666' }}>{author.introduction}</p>
            </div>
        </Link>
    </div>
  );
}

function AllAuthors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/authors/getAllAuthors');
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>All Authors</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {authors.map((author) => (
          <AuthorCard key={author._id} author={author} />
        ))}
      </div>
    </div>
  );
}

export default AllAuthors;
