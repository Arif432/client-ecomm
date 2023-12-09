import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Cart() {
  const [cartData, setCartData] = useState(null);
  const [cookies, removeCookie] = useCookies(['token']);
  const token = cookies['token'];

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart/getCart', {
          headers: {
            'token': token,
          },
        });

        if (response.status === 200) {
          setCartData(response.data);
        } else {
          console.error('Error fetching cart:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cart:', error.message);
        alert("cart not found")
      }
    };
    fetchCart();
  }, [token]);

  const getUniqueProducts = (products) => {
    const uniqueProducts = {};
    products.forEach(product => {
      const key = product._id;
      if (uniqueProducts[key]) {
        uniqueProducts[key].quantity += product.quantity;
        uniqueProducts[key].qtyInCart += 1;
      } else {
        uniqueProducts[key] = { ...product, qtyInCart: 1 };
      }
    });
    return Object.values(uniqueProducts);
  };

  const handleIncrement = (productId) => {
    // Implement the logic to increment the quantity of a specific product
    // Make an API call to update the cart with the new quantity
    alert(`Increment product with ID ${productId}`);
  };

  const handleDecrement = (productId) => {
    // Implement the logic to decrement the quantity of a specific product
    // Make an API call to update the cart with the new quantity
    alert(`Decrement product with ID ${productId}`);
  };


  const handleDeleteProduct = async (productId) => {
    try {
      const apiUrl = `http://localhost:5000/cart/removeFromCart/${productId}`;
      await axios.delete(apiUrl, {
        headers: {
          'token': token,
        },
      });
    } catch (error) {
      console.error('There was a problem with the Axios request:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleDeleteCart = async () => {
    try {
      const apiUrl = `http://localhost:5000/cart/deleteAllFromCart`;
      await axios.delete(apiUrl, {
        headers: {
          'token': token,
        },
      });
      alert("cart deleted")
    } catch (error) {
      alert('Failed to delete cart. Please try again.');
    }
  };

  return (
    <div className="container mx-auto my-8 p-8 shadow-lg rounded-xl" style={{background:"#ece9e9"}}>
      <h2 className="text-2xl font-bold mb-4" style={{color:"#333333"}}>Your Cart</h2>
      {cartData ? (
        <div>
          {getUniqueProducts(cartData.cart.products).map(product => (
            <div key={product._id} className='flex flex-col border-b border-gray-300 py-4'>
              <div className="flex flex-row">
                <img
                  src={product?.images[0]}
                  className="object-cover h-16 w-16 rounded-full mr-4"
                  alt={product.title}
                />
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <h3 className="text-lg font-semibold mb-2" style={{color:"#333333"}}>Title: {product.title}</h3>
                  </div>
                  <div className="flex flex-row">
                    <p className="text-gray-600 mb-2" style={{color:"#333333"}}>Description: {product.description}</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="mr-4" style={{color:"#333333"}}>Quantity: {product.qtyInCart}</p>
                    <button
                      className=" text-white px-2 py-1 rounded ml-2 "
                      style={{ backgroundColor: '#a09c9c' }}
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {cartData.cart.products.length === 0 && (
            <h1>Nothing to show in your cart</h1>
          )}
          {cartData.cart.products.length > 0 && (
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDeleteCart}
            >
              Delete Entire Cart
            </button>
          )}
        </div>
      ) : (
        <div>
          <p>Loading cart...</p>
        </div>
      )}
    </div>
  );
}  
export default Cart;

