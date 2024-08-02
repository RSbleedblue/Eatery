import React from 'react';
import bg from '../assets/home.jpg';
import { FaSearch } from "react-icons/fa";

const HeroSection = () => {
    return (
        <div className='relative w-full flex justify-center p-10 '>
             <img src={bg} className='w-full h-full object-cover absolute top-0 left-0 z-10 opacity-30 blur-[10px]' alt="background" /> 
            <div className='relative z-10 flex justify-center items-center w-[40%] h-[50%] bg-blue-900  bg-opacity-10 rounded-lg backdrop-blur-md shadow-2xl border border-white border-opacity-20 flex-col p-2'>
                <h1 className='text-[20px] text-white font-sans p-2'>A Really Great Place to Eat in the city of Your Liking</h1>
                <p className='text-xs p-2 bg-blue-950 text-white rounded-lg cursor-pointer border-2 border-transparent  transition-all flex items-center justify-center gap-2 backdrop-blur-sm hover:backdrop-blur-md'>
                    <span><FaSearch/></span>
                    Explore
                </p>
            </div>
        </div>
    );
}

export default HeroSection;
