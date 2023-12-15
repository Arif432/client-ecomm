import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SingleAuthor() {
  const [author, setAuthor] = useState({});
  const { id } = useParams();
  console.log(id);
  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/authors/getSingleAuthor/${id}`);
        setAuthor(response.data);

        const relatedBooksResponse = await axios.get(`http://localhost:5000/product/getAllProduct?authorId=${id}`);
        setRelatedBooks(relatedBooksResponse.data.products);
        console.log(relatedBooksResponse.data.products);
      } catch (error) {
        console.error('Error fetching author data:', error);
      }
    };

    fetchAuthor();
  }, [id]);

  return (
    <div>
      <div style={{ borderRadius: '12px', flex: 1, alignItems: 'center', justifyContent: 'center', padding: '20px', background: "#ece9e9" }}>
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
                <p>No Image</p>
              </div>
            )}
          </div>
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1>{author.authorName}</h1>
            <p style={{ fontSize: '16px', color: '#666', marginTop: '10px' }}>{author.introduction}</p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold" style={{ color: "#333333" }}>
              Related Books
            </h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {relatedBooks.map((book) => (
          <Link to={`/product/${book._id}`} key={book._id} style={{ 
              width: '280px', 
              margin: '30px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
              borderRadius: '8px', 
              overflow: 'hidden' ,
              backgroundColor: "#ece9e9",
              border: '1px solid #b2b2b2',
           }}>
        
            {book.images && book.images.length > 0 ? (
              <img src={book.images[0]} alt={book.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} />
            ) : (
              <div style={{ backgroundColor: '#eee', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>No Image</p>
              </div>
            )}
            <div style={{ padding: '16px' }}>
              <h2 style={{ margin: '0' }}>{book.title}</h2>
              <p style={{ marginTop: '8px', color: '#666' }}>{book.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SingleAuthor;
