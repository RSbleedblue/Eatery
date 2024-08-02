import { useState, useEffect } from "react";
import Modal from 'react-modal';
import logo from '../assets/eatery.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setUserEmail, setIsLoggedIn } from "../Redux/Slices/userSlice";
import { FaTruck } from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";

const Navbar = ({ isModalOpen, setIsModalOpen }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const toggleModal = () => setIsModalOpen(!isModalOpen);
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
          localStorage.setItem('accessToken', accessToken);
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

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-blur');
    } else {
      document.body.classList.remove('modal-blur');
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="w-[60%] flex items-center p-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex w-[35%] items-center justify-between">
            <p className="text-2xl flex items-center font-sans text-white gap-2">
              Eatery
              <span><IoRestaurant/></span>
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={() => { toggleModal(); setIsLogin(true); }} className="p-2 bg-blue-950 rounded-lg text-white hover:bg-gray-100 hover:text-gray-800 border-2 border-transparent hover:border-blue-950 transition-all text-xs">Login</button>
            <button onClick={() => { toggleModal(); setIsLogin(false); }} className="p-2 bg-blue-950 rounded-lg text-white hover:bg-gray-100 hover:text-gray-800 border-2 border-transparent hover:border-blue-950 transition-all text-xs">Sign up</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Authentication Modal"
        className="modal-content"
        overlayClassName="modal-overlay "
        shouldCloseOnOverlayClick={false} 
         
      >
        <h2 className="text-2xl mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        <form className="flex flex-col gap-4 w-full focus:outline-none" onSubmit={handleUser}>
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-2 border border-gray-300 rounded focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <button className="p-2 bg-blue-950 rounded-lg text-white hover:bg-gray-100 hover:text-gray-800 border-2 border-transparent hover:border-blue-950 transition-all focus:outline-none" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 cursor-pointer text-blue-600" onClick={switchForm}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Navbar;
