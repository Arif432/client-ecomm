import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          EveryBookShop
        </Link>
        <div className="flex space-x-4">
          <Link to="/cart" className="text-white hover:text-gray-300">
            Go to Cart
          </Link>
          <Link to="/getAllGenres" className="text-white hover:text-gray-300">
            Genres
          </Link>
          <Link to="/my-orders" className="text-white hover:text-gray-300">
            My Orders
          </Link>
        </div>
      </div>
    </nav>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="w-full p-6 rounded-lg shadow-lg"
    style={{
      backgroundColor: "#ece9e9",
      border: '1px solid #b2b2b2',
    }} >
      <Link to={`/product/${product._id}`}>
        <img
          src={product?.images[0]}
          alt={product.title}
          className="mb-4 w-full h-40 object-cover rounded-lg"
        />
        <h2 className="font-bold text-base" style={{color:"#333333"}}>{product.title}</h2>
        <p className="font-bold" style={{color:"#27ae60"}}>${product.price}</p>
      </Link>
    </div>
  );
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/product/getAllProduct')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-8" style={{
          color:"#333333"
        }}>All Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
