import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [relDoc, setRelDoc] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(doctorsData)
      setLoading(false)
    }
  }, [doctors, speciality, docId])

  if (loading) {
    return (
      <div className='flex flex-col items-center gap-4 my-16 text-gray-900 px-4 sm:px-6 lg:px-8'>
        <div className='animate-pulse'>
          <div className='h-8 bg-gray-200 rounded w-64 mb-4'></div>
          <div className='h-4 bg-gray-200 rounded w-96 mb-8'></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='bg-gray-200 rounded-xl h-64'></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center gap-6 my-16 sm:my-20 lg:my-24 text-gray-900 px-4 sm:px-6 lg:px-8'>
      {/* Header Section */}
      <div className='text-center max-w-2xl'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
          Related Doctors
        </h1>
        <p className='text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed'>
          Discover more healthcare professionals in {speciality} who can provide excellent care and expertise.
        </p>
      </div>

      {/* Doctors Grid */}
      {relDoc.length > 0 ? (
        <>
          <div className='w-full max-w-7xl'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6'>
              {relDoc.slice(0, 5).map((item, index) => (
                <div
                  onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                  key={index}
                  className='group bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-500 hover:border-blue-200'
                >
                  {/* Doctor Image */}
                  <div className='relative overflow-hidden'>
                    <img
                      className='w-full h-48 sm:h-52 object-cover group-hover:scale-110 transition-transform duration-500'
                      src={item.image}
                      alt={item.name}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                    {/* Availability Badge */}
                    <div className='absolute top-3 right-3'>
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${item.available
                          ? 'bg-green-500/90 text-white'
                          : 'bg-gray-500/90 text-white'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-white' : 'bg-gray-300'
                          }`}></div>
                        <span>{item.available ? 'Available' : 'Unavailable'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className='p-4 sm:p-5'>
                    <h3 className='text-gray-900 text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors duration-300'>
                      {item.name}
                    </h3>
                    <p className='text-gray-600 text-sm font-medium mb-2'>{item.speciality}</p>

                    {/* Experience/Location could be added here if available */}
                    <div className='flex items-center justify-between text-xs text-gray-500'>
                      <span>⭐ 4.8</span>
                      <span>{item.experience || '5+ years'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* More Button */}
          <button
            onClick={() => { navigate(`/doctor`); window.scrollTo(0, 0) }}
            className='mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            View All Doctors
          </button>
        </>
      ) : (
        <div className='text-center py-12'>
          <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <span className='text-2xl'>👨‍⚕️</span>
          </div>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>No Related Doctors Found</h3>
          <p className='text-gray-600 mb-6'>We couldn't find other doctors in this specialty at the moment.</p>
          <button
            onClick={() => { navigate(`/doctor`); window.scrollTo(0, 0) }}
            className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300'
          >
            Browse All Doctors
          </button>
        </div>
      )}
    </div>
  )
}

export default RelatedDoctors