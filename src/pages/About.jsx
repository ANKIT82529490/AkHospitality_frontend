import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center text-2xl sm:text-3xl pt-8 sm:pt-10 text-gray-700 font-bold'>
          <p>ABOUT <span className='bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>US</span></p>
        </div>

        <div className='flex flex-col md:flex-row gap-8 sm:gap-12 my-8 sm:my-10'>
          <img className='w-full md:max-w-[360px] rounded-lg shadow-lg' src={assets.about_image} alt="" />
          <div className='flex flex-col justify-center gap-4 sm:gap-6 md:w-2/4 text-sm text-gray-600'>
            <p>Welcome To AKHospitality, Your Trusted Partner In Managing Your Healthcare Needs Conveniently And Efficiently. At AKHospitality, We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor Appointments And Managing Their Health Records.</p>
            <p>Platform, Integrating The Latest Advancements To Improve User Experience And Deliver Superior Service. Whether You're Booking Your First Appointment Or Managing Ongoing Care, AKHospitality Is Here To Support You Every Step Of The Way.</p>
            <b className='text-gray-800 text-base sm:text-lg'>Our Vision</b>
            <p>Our Vision At AKHospitality Is To Create A Seamless Healthcare Experience For Every User. We Aim To Bridge The Gap Between Patients And Healthcare Providers, Making It Easier For You To Access The Care You Need, When You Need It.</p>
          </div>
        </div>

        <div className='text-xl sm:text-2xl my-6 sm:my-8 text-center'>
          <p>WHY <span className='bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold'>CHOOSE US</span></p>
        </div>

        <div className='flex flex-col md:flex-row mb-16 sm:mb-20 gap-4'>
          <div className='bg-white border border-gray-200 px-6 sm:px-10 md:px-16 py-6 sm:py-8 md:py-16 flex flex-col gap-4 sm:gap-5 text-sm sm:text-[15px] hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-md hover:shadow-lg'>
            <b className='text-base sm:text-lg'>EFFICIENCY:</b>
            <p>Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.</p>
          </div>
          <div className='bg-white border border-gray-200 px-6 sm:px-10 md:px-16 py-6 sm:py-8 md:py-16 flex flex-col gap-4 sm:gap-5 text-sm sm:text-[15px] hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-md hover:shadow-lg'>
            <b className='text-base sm:text-lg'>CONVENIENCE:</b>
            <p>Access To A Network Of Trusted Healthcare Professionals In Your Area.</p>
          </div>
          <div className='bg-white border border-gray-200 px-6 sm:px-10 md:px-16 py-6 sm:py-8 md:py-16 flex flex-col gap-4 sm:gap-5 text-sm sm:text-[15px] hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-md hover:shadow-lg'>
            <b className='text-base sm:text-lg'>PERSONALIZATION:</b>
            <p>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About




