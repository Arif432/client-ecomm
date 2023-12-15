import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function SingleGenre() {
  const { id } = useParams();
  const [genre, setGenre] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleGenre = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/genres/getSingleGenre/${id}`);
        setGenre(response.data);
        const productsResponse = await axios.get(`http://localhost:5000/product/getAllProduct?genreId=${id}`);
        setProducts(productsResponse.data.products);
      } catch (error) {
        console.error('Error fetching single genre:', error);
        navigate('/error');
      }
    };
    fetchSingleGenre();
  }, [id, navigate]);

  return (
    <div>
      <div className="bg-cover bg-center" style={{ backgroundImage: `url(${genre?.genreImage})`, height: '30vh', width: '100%' }}>
        <div className="container mx-auto p-8 text-white">
          {genre ? (
            <div>
              <h2 className="text-3xl font-bold mb-2">{genre.genreName}</h2>
              <p className="text-lg mb-4">{genre.description}</p>
            </div>
          ) : (
            <p className="text-center text-xl mt-4">Loading...</p>
          )}
        </div>
      </div>

      <div className="container mx-auto mt-8 gap-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`} className="text-black no-underline">
                <div className="p-4 rounded-md shadow-md w-full"
                   style={{
                    backgroundColor: "#ece9e9",
                    border: '1px solid #b2b2b2',
                  }} >
                  <img src={product.images[0]} alt={product.title} className="w-full h-60 object-cover mb-4 rounded-md" />
                  <h4 className="text-lg font-bold mb-2">{product.title}</h4>
                  <p className="mb-2">{product.description}</p>
                  <p className="text-black font-bold">Price: ${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No products available in this genre.</p>
        )}
      </div>
    </div>
  );
}

export default SingleGenre;

