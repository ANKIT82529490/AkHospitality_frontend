import React from 'react'


const Footer = () => {
  return (
    <div className='md:mx-10 bg-gradient-to-br from-gray-50 to-blue-50 rounded-t-3xl mt-16 sm:mt-20'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 sm:gap-14 my-8 sm:my-10 mt-32 sm:mt-40 text-sm'>
        {/* ----------Left Section----------- */}
        <div>
          <img className='mb-5 w-40 sm:w-65 h-24 sm:h-40 hover:scale-105 transition-transform duration-300' src="mainlogo.png" alt="" />
          <p className='w-full  md:w-2/3 text-gray-600 leading-6 text-sm sm:text-base'>Advanced healthcare solutions delivered with care, integrity, and excellence.</p>
        </div>
        {/* ----------Center Section--------- */}
        <div>
          <p className='text-xl font-medium mb-5 text-gray-800'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='hover:text-blue-600 cursor-pointer transition-colors duration-300'>Home</li>
            <li className='hover:text-blue-600 cursor-pointer transition-colors duration-300'>About us</li>
            <li className='hover:text-blue-600 cursor-pointer transition-colors duration-300'>Contact us</li>
            <li className='hover:text-blue-600 cursor-pointer transition-colors duration-300'>Privacy policy</li>
          </ul>
        </div>
        {/* ----------Right Section--------- */}
        <div>
          <p className='text-xl font-medium mb-5 text-gray-800'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='text-2xl font-semibold text-blue-600'><span className='text-red-600 text-3xl'>+</span> 108</li>
            <li className='hover:text-blue-600 transition-colors duration-300'>akHospitality@gmail.com</li>
          </ul>
        </div>
      </div>
      {/*--------------Copyright Text--------------- */}
      <div>
        <hr className='border-gray-300' />
        <p className='py-5 text-sm text-center text-gray-500'>Copyright 2025@ AKHospitality - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
