import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const [year, month, day] = slotDate.split('_')
    return `${day} ${months[Number(month) - 1]} ${year}`
  }




  const getUserAppointments = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/user/appointments',
        {
          headers: { token }
        })

      console.log(data)

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  const cancelAppointment = async (appointmentId) => {
    try {

      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)

        try {

          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')

          }

        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }

      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  // const appointmentRazorpay = async (appointmentId) => {

  //   try {

  //     const {data} = await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
  //     if(data.success) {
  //       initPay(data.order)

  //     }
  //   } catch (error) {


  //   }

  // }






  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } }
      )

      if (data.success) {
        initPay(data.order)
      } else {
        console.error('Payment API Error:', data.message)
        toast.error(data.message || 'Payment initiation failed')
      }

    } catch (error) {
      console.error('Razorpay Error:', error)

      // axios error (backend se response aaya)
      if (error.response) {
        toast.error(
          error.response.data?.message ||
          'Payment failed. Please try again.'
        )
      }
      // network error / server down
      else if (error.request) {
        toast.error('Server not responding. Check your internet or backend.')
      }
      // code level error
      else {
        toast.error(error.message)
      }
    }
  }


  useEffect(() => {
    if (token)
      getUserAppointments()
  }, [token])



  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        <p className='pb-3 mt-12 font-medium text-zinc-700 border-b text-lg'>My Appointments</p>
        <div className='mt-6'>
          {appointments.map((item, index) => (
            <div className='bg-white grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 px-6 border border-gray-200 rounded-lg shadow-md mb-4' key={index}>
              <div>
                <img className='w-32 h-32 object-cover rounded-lg bg-indigo-50' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold text-lg'>{item.docData.name}</p>
                <p className='text-gray-500'>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-2'>Address</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-2'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime} </p>
              </div>
              <div></div>
              <div className='flex flex-col gap-3 justify-end'>
                {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded-full text-white bg-gradient-to-r from-green-500 to-blue-500 shadow-md'>Paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-white text-center sm:min-w-48 py-2 border rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 cursor-pointer transition-all duration-300 shadow-md'>Pay Online</button>}
                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-white text-center sm:min-w-48 py-2 border rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 cursor-pointer transition-all duration-300 shadow-md'>Cancel appointment</button>}
                {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded-full text-red-500 bg-red-50'>Appointment cancelled</button>}
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded-full text-green-500 bg-green-50'>Completed</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyAppointment;




