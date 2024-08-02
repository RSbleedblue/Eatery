import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { FaDollarSign } from "react-icons/fa";
import { toast } from 'react-toastify';
import { removeFromCart } from '../../Redux/Slices/cartSlice';
import { FaDumpster } from 'react-icons/fa';

const CartModal = ({ isOpen, onRequestClose }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userId = "66a9d633499f6dd545a63b01"; 
  const restaurantId = useSelector((state)=>state.user.restaurantID);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handlePlaceOrder = async () => {
    const items = cartItems.map(item => ({
      menuItem: item._id,
      quantity: 1 
    }));
    const totalAmount = calculateTotalAmount();

    try {
      const response = await fetch('https://zomatoclone-kjxd.onrender.com/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` 
        },
        body: JSON.stringify({
          user: userId,
          restaurant: restaurantId,
          items,
          totalAmount
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Order placed successfully!');
        dispatch({ type: 'CLEAR_CART' }); 
        onRequestClose();
      } else {
        toast.error(`Error placing order: ${data.message}`);
      }
    } catch (error) {
      toast.error('An error occurred while placing the order.');
      console.error('Order creation error:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Cart Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-2xl mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img src={item.image} className="w-16 h-16 object-cover rounded-lg" alt={item.name} />
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <FaDollarSign />
                    <p>{item.price}</p>
                  </div>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => dispatch(removeFromCart(item))}
              >
                <FaDumpster />
              </button>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      )}
    </Modal>
  );
};

export default CartModal;
