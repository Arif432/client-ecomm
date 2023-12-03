import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1); // New state for quantity
  const sliderRef = useRef(null);
  const slideInterval = 3000; // Slide interval in milliseconds
  const [cookies] = useCookies(['token']);
  const token = cookies['token'];

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/getProduct/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const slider = sliderRef.current;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === product?.images?.length - 1 ? 0 : prevIndex + 1
      );
    }, slideInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [product]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product?.images?.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const addToCart = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/cart/addToCart/${id}`,
        {},  // Empty data object if your API doesn't require additional payload
        {
          headers: {
            'token': token,
          },
        }
      );
      console.log('Added to cart:', response.data);
      alert("added to cart");
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert("failed cart add");
    }
  };
  

  return (
    <div className="container mx-auto my-8 text-center">
      {loading ? (
        <p className="text-xl">Loading product details...</p>
      ) : product ? (
        <div className="flex flex-col md:flex-row">
          {/* Image Slider */}
          <div className="items-center justify-center">
            {product?.images?.map((image, index) => (
              <div
                key={index}
                className={`slide ${index === currentIndex ? 'visible' : 'hidden'} h-96`}
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-96 h-96 rounded-full"
                />
              </div>
            ))}
            <div className="flex m-8 justify-center">
              {/* Adjusted margin here */}
              <button onClick={handlePrev} className="bg-gray-800 text-white px-4 py-2 rounded-lg mr-4">
                Previous
              </button>
              <button onClick={handleNext} className="bg-gray-800 text-white px-4 py-2 rounded-lg">
                Next
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/3 md:ml-8">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

            <div className="text-left">
            <div className="mb-4 text-center">
                <span className="font-bold">Author:</span> 
                {product.author}
              </div>
              <div className="mb-4 text-center">
                <span className="font-bold">Description:</span> 
                {product.description}
              </div>
              <div className="mb-4 text-center">
                <span className="font-bold">ISBN:</span> {product.isbn}
              </div>
              <div className="mb-4 text-center font-bold text-4xl">
                {/* <span className="font-bold">Price:</span> */}
                 ${product.price}
              </div>
              <div className="flex items-center justify-center mb-4">
                <span className="font-bold mr-2 text-center">Quantity:</span>
                <button onClick={handleDecrement} className="quantity-btn">
                  -
                </button>
                <span className="text-2xl mx-4">{quantity}</span>
                <button onClick={handleIncrement} className="quantity-btn">
                  +
                </button>
              </div>

              <div className="mb-4 items-center justify-center flex flex-row">
                <button onClick={addToCart} className="bg-blue-800 text-white px-4 py-2 rounded-lg mr-4">
                    Add to cart
                </button>
                <button onClick={()=> navigate('/cart')} className="bg-blue-800 text-white px-4 py-2 rounded-lg mr-4">
                    go to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-500">Product details not found.</p>
      )}
    
    </div>
  );
};

export default ProductDetailPage;



