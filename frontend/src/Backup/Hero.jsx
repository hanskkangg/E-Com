import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 dark:bg-gray-700'>
      
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          
          {/* Section Title */}
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]  dark:bg-gray-300'></p>
            <p className='font-medium text-sm md:text-base dark:text-gray-300 '>OUR BEST SELLER</p>
          </div>

            <h1 className = 'prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed dark:text-gray-50'>Latest Arrivals</h1>

            <div className='flex items-center gap-2'>
                <p className='font-medium text-sm md:text-base dark:text-gray-300'>Shop Now</p>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141] dark:bg-gray-300'></p>
            </div>

        </div>
      </div>

    {/* Hero for right side */}
    <img className='w-full sm:w-1/2' src={assets.p_img_pizza} alt='Pizza Image'/>

    
    </div>
  );
};

export default Hero;
