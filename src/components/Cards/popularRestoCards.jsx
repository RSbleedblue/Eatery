import bg1 from '../../assets/3.jpg';
import { FaLocationDot, FaStar, FaTruckArrowRight } from "react-icons/fa6";
const PopularRestoCards = ({restaurant}) => {
    return (
        <>
        <div className='bg-gray-100 flex flex-col rounded-2xl  shadow-xl'>
        <div className='h-[250px] overflow-hidden rounded-t-2xl'>
          <img src={restaurant.image} className='object-cover w-full h-full transition-transform duration-300 hover:scale-105 cursor-pointer' />
        </div>
        <div className='w-full flex p-2 flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center justify-between'>
                <p>{restaurant.name}</p>
                <div className='flex items-center gap-1 text-xs text-gray-800'>
                    <span className='text-lg text-yellow-300'><FaStar /></span>
                    {restaurant.rating}
                </div>
            </div>
            <p className='flex gap-1 items-center text-sm text-gray-800'><span className='text-xl text-gray-500'><FaLocationDot /></span>{restaurant.address}</p>
          </div>
          <button className='flex items-center gap-2 bg-blue-900 rounded-lg justify-center p-2 text-sm text-white hover:bg-blue-800 transition-all relative group'>
            Explore
            <span className='transition-transform duration-300 transform group-hover:translate-x-2'>
              <FaTruckArrowRight />
            </span>
          </button>
        </div>
      </div>
        </>
    )
}
export default PopularRestoCards;