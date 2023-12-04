import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="mb-4 w-full h-40 object-cover rounded-lg"
        />
        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-700 mb-2">Author: {product.author}</p>
      <p className="text-green-700 font-bold">${product.price}</p>
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
      {/* <Navbar /> */}
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
