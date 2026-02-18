import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div className='flex flex-col items-center gap-4 py-12 sm:py-16 text-gray-800 bg-gradient-to-br from-blue-50 to-purple-50' id='speciality'>
            <h1 className='text-2xl sm:text-3xl font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm px-4'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className='flex sm:justify-center gap-4 sm:gap-6 pt-5 w-full overflow-scroll px-4 sm:px-6'>
                {specialityData.map((item, index) => (
                    <Link
                        onClick={() => scrollTo(0, 0)}
                        className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg'
                        key={index}
                        to={`/doctor/${item.speciality}`}
                    >
                        <img className='w-12 sm:w-16 md:w-24 mb-2 rounded-full' src={item.image} alt="" />
                        <p className='font-medium text-gray-700 text-center'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu