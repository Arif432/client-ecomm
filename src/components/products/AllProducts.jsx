import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaCamera, FaTrash,FaBars , FaSearch } from 'react-icons/fa';

const FilterDrawer = ({ minPrice, maxPrice, setMinPrice, setMaxPrice, handleFilter, toggleDrawer, isDrawerOpen }) => {
  return (
    <div className="relative">
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleDrawer}></div>
      )}
      <div style={{ background: "#e0dddd" }} className={`fixed inset-y-0 right-0 bg-white p-4 z-50 transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform ease-in-out`}>
        <h2 className="text-2xl mb-4" style={{ color: "#333333" }}>Filters</h2>
        <label className="flex items-center mb-4">
          <span className="text-lg mr-2" style={{ color: "#333333" }}>Min Price:</span>
          <input
            type="number"
            className="border rounded p-2"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </label>
        <label className="flex items-center mb-4">
          <span className="text-lg mr-2" style={{ color: "#333333" }}>Max Price:</span>
          <input
            type="number"
            className="border rounded p-2"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </label>
        <button
          style={{ backgroundColor: '#a09c9c' }}
          className="text-white rounded p-2 px-4"
          onClick={() => {
            handleFilter();
            toggleDrawer();
          }}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">
            EveryBookShop
          </Link>
          <div className="flex space-x-4 items-center">
            {/* Moved the Bars button to the Navbar component */}
           
            <Link to="/getAllAuthors" className="text-white text-lg hover:text-gray-300">
              Authors
            </Link>
            <Link to="/getAllGenres" className="text-white text-lg hover:text-gray-300">
              Genres
            </Link>
            <Link to="/cart" className="text-white text-lg hover:text-gray-300">
              My Cart
            </Link>
            <Link to="/my-orders" className="text-white text-lg hover:text-gray-300">
              Orders
            </Link>
            <Link to="/getUserInfo" className="text-white text-lg hover:text-gray-300">
              Profile
            </Link>

            <FaBars
              className="text-white cursor-pointer"
              style={{ fontSize: '1.5rem' }}
              onClick={toggleDrawer}
            />
          </div>
        </div>
      </nav>

      <FilterDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        // other props
      />
    </div>
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
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/getAllProduct?page=${currentPage}&limit=8`)
      .then((response) => {
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, [currentPage]);

  const handleFilter = () => {
    const filtered = products.filter(
      (product) =>
        (!minPrice || product.price >= parseFloat(minPrice)) &&
        (!maxPrice || product.price <= parseFloat(maxPrice))
    );
    setProducts(filtered);
    setCurrentPage(1);
  };

  return (
    <div>
      <Navbar />
      <FilterDrawer
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        handleFilter={handleFilter}
      />
      <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold" style={{ color: "#333333" }}>
              All Products
            </h1>
        <div className="flex items-center p-4">
          <div className='absolute right-8 mb-12'>
            <input
              type="text"
              placeholder="Search..."
              className="border rounded px-3 py-1 w-28 lg:w-80 md:w-60 sm:w-28 focus:outline-none focus:border-blue-500"
            />
            <button className="absolute right-0 top-0 mt-2 mr-2">
              <FaSearch/>
            </button>
          </div>
        </div>
  
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
  
        {/* Pagination controls */}
        {products.length > 0 ? (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-2 px-4 py-2 border ${
                  currentPage === index + 1 ? 'bg-gray-300' : ''
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        ) : (
          <h1>loading...</h1>
        )}
      </div>
    </div>
  );
};

export default AllProducts;