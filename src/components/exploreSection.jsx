import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaDollarSign, FaCartPlus } from "react-icons/fa6";
import { IoNavigate } from 'react-icons/io5';
import { addToCart } from '../Redux/Slices/cartSlice';
import { toast } from 'react-toastify';

const ExploreSection = () => {
  const [restaurant, setRestaurant] = useState(null);
  const restaurantID = useSelector((state) => state.user.restaurantID);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!restaurantID) return;

      try {
        const res = await axios.get(`https://zomatoclone-kjxd.onrender.com/api/restaurant/get/${restaurantID}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          }
        });
        setRestaurant(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurant();
  }, [restaurantID]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`);
  };

  if (!restaurant) return <p>Loading...</p>;

  return (
    <div className="w-[80%] p-4 flex flex-col text-white">
      <div className='rounded-2xl shadow-xl p-6'>
        <div className='w-full flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center justify-between'>
              <p className='text-xl font-bold'>{restaurant.name}</p>
              <div className='flex items-center gap-1 text-lg text-gray-500'>
                <span className='text-2xl text-yellow-300'><FaStar /></span>
                {restaurant.rating}
              </div>
            </div>
            <p className='flex gap-1 items-center text-lg text-gray-400'><span className='text-2xl text-gray-200'><IoNavigate /></span>{restaurant.address}</p>
          </div>
        </div>
      </div>
      <div className='rounded-2xl shadow-xl p-6 mt-6'>
        <h2 className='text-2xl font-bold mb-4'>Menu</h2>
        {restaurant.menu.map((item) => (
          <div key={item._id.$oid} className='flex justify-between items-center p-4 mb-4 border-b border-gray-200'>
            <div className='flex items-center gap-4'>
              <img src={item.image} className='w-20 h-20 object-cover rounded-lg' alt={item.name} />
              <div className='flex flex-col'>
                <p className='text-lg font-semibold text-gray-100'>{item.name}</p>
                <p className='text-sm text-gray-600'>{item.description}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <FaDollarSign className='text-lg text-gray-100' />
              <p className='text-lg text-gray-100'>{item.price}</p>
              <button 
                className='bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700' 
                onClick={() => handleAddToCart(item)}
              >
                <FaCartPlus />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreSection;
