import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row flex-wrap rounded-lg px-4 sm:px-6 md:px-10 lg:px-20 bg-gradient-to-r from-blue-500 to-purple-600 bg-cover bg-center shadow-lg">
      {/* ------------Left Side---------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-8 sm:py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight transition-all duration-300 hover:text-blue-100 hover:-translate-y-1">
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-20 sm:w-28 rounded-full shadow-md' src={assets.group_profiles} alt="" />
          <p className="mt-4 text-white hover:-translate-y-1 transition-transform duration-500 cursor-pointer hover:text-blue-100 text-sm sm:text-base leading-relaxed">
            Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.
          </p>
        </div>
        <a className='flex items-center gap-2 bg-white px-6 sm:px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-md' href="">
          {/* Book appointment <img className='w-3' src={assets.arrow_icon} alt="" /> */}
          <button onClick={() => navigate('/doctor')} className='w-full px-4 py-2 rounded-lg hover:bg-red-100 transition-all duration-300 text-left text-red-600'>Book appointment</button>
        </a>
      </div>

      {/* -------------Right Side----------- */}
      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg shadow-lg' src={assets.header_img} alt="#speciality" />
      </div>
    </div>
  )
}

export default Header











