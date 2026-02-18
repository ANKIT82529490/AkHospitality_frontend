import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";





const Appointment = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState([])
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')


  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo || { slots_booked: {} })
  }


  const getAvailableSlots = async () => {
    setDocSlots([])

    // getting current date

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      // getting date with index

      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // setting end time of the date with index

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // setting hours

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        // const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false: true



        const isSlotAvailable = docInfo.slots_booked && docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {

          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })

        }


        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
    try {

      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }

  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots])

  return docInfo && (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6'>
      <div className='max-w-6xl mx-auto'>
        {/* ----------Doctor Details----------- */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className='flex-shrink-0'>
            <img className="w-full sm:max-w-72 rounded-lg shadow-lg" src={docInfo.image} alt="" />
          </div>

          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-8 py-7 shadow-lg mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* ---------- Doc Info : name,degree,experience ------------- */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className="py-0.5 px-2 border text-xs rounded-full bg-gradient-to-r from-blue-100 to-purple-100">{docInfo.experience}</button>
            </div>

            {/* -------------- Doctor About------------- */}
            <div className='mt-4'>
              <p className="flex items-center font-medium gap-1 text-sm text-gray-900">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-2">{docInfo.about}</p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee: <span className="text-gray-600 font-semibold">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* --------- BOOKING SLOTS --------- */}
        <div className="sm:ml-0 mt-8 bg-white rounded-lg p-6 shadow-lg">
          <p className='text-lg font-semibold text-gray-700 mb-4'>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mb-4">
            {
              docSlots.length && docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all shadow-md ${slotIndex === index ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'border border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))
            }
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll">
            {docSlots.length && docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all ${item.time === slotTime ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-gray-400 border border-gray-300 bg-white hover:bg-gray-100'
                  }`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>
          <div className='flex justify-center mt-6'>
            <button
              onClick={bookAppointment}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-light px-14 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
            >
              Book an appointment
            </button>
          </div>
        </div>

        {/* -----------Listing Related Doctors ------------ */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  );
};

export default Appointment;




