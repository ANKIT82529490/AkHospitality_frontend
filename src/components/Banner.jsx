import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {


    const navigate = useNavigate()

    return (
        <div
            className="flex flex-col md:flex-row rounded-xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 my-12 sm:my-16 md:my-20 md:mx-4 lg:mx-8 xl:mx-12 2xl:mx-16
             bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20240528/pngtree-background-of-operation-room-in-hospital-health-care-concept-image_15733972.jpg')]
             bg-cover bg-center bg-no-repeat relative overflow-hidden shadow-2xl min-h-[50vh] sm:min-h-[60vh]"
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60 rounded-xl"></div>

            {/* ----------Left Side-------------- */}

            <div className='flex-1 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 2xl:py-20 relative z-10 flex flex-col justify-center'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold text-white drop-shadow-lg mb-4 sm:mb-6'>
                    <p>Book Appointment</p>
                    <p className='mt-2 sm:mt-4'>With 100+ Trusted Doctors</p>
                </div>
                <button
                    onClick={() => { navigate('/login'); scrollTo(0, 0) }}
                    className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto max-w-xs'
                >
                    Create account
                </button>
            </div>


            {/* ----------Right Side-------------- */}

            <div className='hidden md:flex md:w-1/2 lg:w-[400px] xl:w-[450px] 2xl:w-[500px] relative z-10 items-end justify-end mt-8 md:mt-0'>
                <img className='w-full h-auto max-w-full rounded-lg shadow-lg' src={assets.appointment_img} alt="Medical appointment illustration" />
            </div>
        </div>
    )
}

export default Banner