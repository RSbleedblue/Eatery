import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail, setIsLoggedIn, setUserID } from "../Redux/Slices/userSlice";
import { IoRestaurant, IoCart, IoLogOut } from "react-icons/io5";
import CartModal from "./Modals/cartModal";

const Navbar = ({ isModalOpen, setIsModalOpen }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleCartModal = () => setIsCartModalOpen(!isCartModalOpen);
  const switchForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
  };

  const dispatch = useDispatch();

  const handleUser = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'https://zomatoclone-kjxd.onrender.com/api/user/login' : 'https://zomatoclone-kjxd.onrender.com/api/user/register';
    const payload = isLogin 
      ? { email, password } 
      : { email, password, name };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      if (response.ok) {
        toast.success(`${isLogin ? 'Login' : 'Sign Up'} successful!`);
        if (isLogin) {
          const { accessToken } = data;
          sessionStorage.setItem('accessToken', accessToken);
          dispatch(setIsLoggedIn(true));
        }
        toggleModal();
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    dispatch(setIsLoggedIn(false));
    toast.success('Logout successful!');
  };

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      dispatch(setIsLoggedIn(true));
    }

    if (isModalOpen) {
      document.body.classList.add('modal-blur');
    } else {
      document.body.classList.remove('modal-blur');
    }
  }, [isModalOpen, dispatch]);

  return (
    <>
      <div className="w-[60%] flex items-center p-2">
        <div className="w-full flex justify-between items-center">
          <a href="/">
            <h1 className="text-3xl font-bold text-blue-100 flex items-center">
              <IoRestaurant className="mr-2" />
              Eatery
            </h1>
          </a>
          <div className="flex items-center gap-6">
            {isLoggedIn && (
              <>
                <button
                  className="text-white text-2xl hover:text-blue-500"
                  onClick={toggleCartModal}
                >
                  <IoCart />
                </button>
                <button
                  className="text-white text-2xl hover:text-blue-500"
                  onClick={handleLogout}
                >
                  <IoLogOut />
                </button>
              </>
            )}
            {!isLoggedIn && (
              <button
                onClick={toggleModal}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Auth Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <form onSubmit={handleUser} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={switchForm} className="text-blue-500 underline">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </Modal>
      <CartModal isOpen={isCartModalOpen} onRequestClose={toggleCartModal} />
      <ToastContainer />
    </>
  );
};

export default Navbar;
