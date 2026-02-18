import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-12 sm:my-16 text-gray-900 md:mx-10 bg-gradient-to-br from-blue-50 to-purple-50 py-12 sm:py-16'>
      <h1 className='text-2xl sm:text-3xl font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm px-4'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 pt-5 px-3 sm:px-6'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            key={index}
            className='bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-md hover:shadow-lg'
          >
            <img className='w-full h-40 sm:h-48 object-cover bg-gradient-to-br from-blue-100 to-purple-100' src={item.image} alt='' />
            <div className='p-3 sm:p-4'>
              <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'} `}>
                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className='text-gray-900 text-base sm:text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => { navigate(`/doctor`); scrollTo(0, 0) }}
        className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 sm:px-12 py-3 rounded-full mt-8 sm:mt-10 cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all shadow-md'
      >
        More
      </button>
    </div>
  )
}

export default TopDoctors









