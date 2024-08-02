import { IoRestaurant } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PopularRestoCards from './Cards/popularRestoCards';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from "react";

export default function PopularRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);

  const fetchData = async () => {
    if (!localStorage.getItem("accessToken")) {
      return null;
    }
    const res = await axios.get("https://zomatoclone-kjxd.onrender.com/api/restaurant/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }
    });
    setRestaurants(res.data.data);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(restaurants.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-[80%] flex flex-col gap-2 p-10">
      <p className="flex items-center gap-2 text-xl font-semibold text-white">
        <span className='text-white'><IoRestaurant /></span>
        Popular Restaurants
      </p>
      <div className="relative flex items-center justify-center">
        <button 
          className="absolute left-[-40px] z-10 p-2 bg-white rounded-full shadow"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          <IoIosArrowBack size={24} />
        </button>
        <div className="flex overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100 / itemsPerPage}%)` }}
          >
            {restaurants.map((restaurant, index) => (
              <div key={restaurant.id} className="w-1/4 p-2"
                   style={{ display: Math.floor(index / itemsPerPage) === currentPage ? 'block' : 'none' }}>
                <PopularRestoCards restaurant={restaurant} />
              </div>
            ))}
          </div>
        </div>
        <button 
          className="absolute right-[-40px] z-10 p-2 bg-white rounded-full shadow"
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(restaurants.length / itemsPerPage) - 1}
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </div>
  );
}
