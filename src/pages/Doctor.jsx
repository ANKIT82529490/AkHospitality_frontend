import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Docter = () => {

  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  // console.log(speciality)


  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>Find Doctors</h1>
        <p className='text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base'>Browse through the doctors by speciality.</p>
        <div className='flex flex-col sm:flex-row items-start gap-4 sm:gap-5'>
          <button className={`py-2 px-4 border rounded-full text-sm transition-all sm:hidden shadow-md ${showFilter ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-white hover:bg-gray-100'}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
          <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            {[
              'General physician',
              'Gynecologist',
              'Dermatologist',
              'Pediatricians',
              'Neurologist',
              'Gastroneterologist'
            ].map(spec => (
              <button
                key={spec}
                onClick={() => speciality === spec ? navigate('/doctor') : navigate(`/doctor/${spec}`)}
                className={`w-full sm:w-auto pl-4 py-2 pr-12 sm:pr-16 border border-gray-300 rounded-full transition-all cursor-pointer shadow-sm hover:shadow-md ${speciality === spec ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "bg-white hover:bg-gray-100"
                  }`}
              >
                {spec}
              </button>
            ))}
          </div>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6'>
            {
              filterDoc.map((item, index) => (
                <div
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  key={index}
                  className='bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-md hover:shadow-lg'
                >
                  <img className='w-full h-40 sm:h-48 object-cover bg-gradient-to-br from-blue-100 to-purple-100' src={item.image} alt='' />
                  <div className='p-3 sm:p-4'>
                    <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                      <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                      <p>{item.available ? 'Available' : 'Not Available'}</p>
                    </div>
                    <p className='text-gray-900 text-base sm:text-lg font-medium mt-2'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Docter
