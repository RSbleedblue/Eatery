import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserEmail, setIsLoggedIn} from '../Redux/Slices/userSlice';
import HeroSection from "../components/heroSection";
import Navbar from "../components/navbar";
import PopularRestaurants from "../components/popularRestaurants";

const Landing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(setIsLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Here you can add a function to validate the token
      // If token is valid, dispatch(setIsLoggedIn(true));
      // If token is invalid, dispatch(setIsLoggedIn(false));
    } else {
      setIsModalOpen(true);
    }
  }, [dispatch]);

  return (
    <div className="w-full items-center justify-center flex flex-col">
      <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      {isLoggedIn ? (
        <>
          <HeroSection />
          <PopularRestaurants />
        </>
      ) : null}
    </div>
  );
};

export default Landing;
