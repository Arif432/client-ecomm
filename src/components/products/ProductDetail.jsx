import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const slideInterval = 3000; // Slide interval in milliseconds

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
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }, slideInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [product]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container mx-auto my-8 text-center">
      {loading ? (
        <p className="text-xl">Loading product details...</p>
      ) : product ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex flex-col items-center">
          <div className="w-full max-w-screen-md mx-auto">
            {product.images.map((image, index) => (
                <div
                key={index}
                className={`slide ${index === currentIndex ? 'visible' : 'hidden'} h-96 `}
                >
                <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-96 object-cover rounded-lg"
                />
                </div>
            ))}
        </div>

            <div className="flex m-8"> {/* Adjusted margin here */}
              <button onClick={handlePrev} className="bg-gray-800 text-white px-4 py-2 rounded-lg mr-4">Previous</button>
              <button onClick={handleNext} className="bg-gray-800 text-white px-4 py-2 rounded-lg">Next</button>
            </div>

            <div className="col-span-1 text-left">
              <div className="mb-2">
                <span className="font-bold">Author:</span> {product.author}
              </div>
              <div className="mb-2">
                <span className="font-bold">Description:</span> {product.description}
              </div>
              <div className="mb-2">
                <span className="font-bold">Price:</span> ${product.price}
              </div>
              <div className="mb-2">
                <span className="font-bold">Quantity:</span> {product.quantity}
              </div>
              <div className="mb-2">
                <span className="font-bold">ISBN:</span> {product.isbn}
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
