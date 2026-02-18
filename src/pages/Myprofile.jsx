import React, { useState, useContext, useEffect } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Myprofile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const navigate = useNavigate()
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData(); // 👈 capital F

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6'>
      {userData ? (
        <div className='max-w-sm sm:max-w-md md:max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6 mt-6'>
          {/* Profile Image */}
          {
            isEdit ? (
              <label htmlFor="image">
                <div className="inline-block relative cursor-pointer group">
                  <img
                    className="w-24 sm:w-36 h-24 sm:h-36 rounded-full object-cover border-4 border-gradient-to-r from-blue-400 to-purple-500 shadow-md transition-transform group-hover:scale-105 mx-auto"
                    src={image ? URL.createObjectURL(image) : userData.image || assets.defaultProfile}
                    alt="Profile"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <img
                      className="w-6 sm:w-8 h-6 sm:h-8"
                      src={assets.upload_icon}
                      alt="Upload Icon"
                    />
                  </div>
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                className="w-24 sm:w-36 h-24 sm:h-36 rounded-full object-cover border-4 border-gradient-to-r from-blue-400 to-purple-500 shadow-md mx-auto"
                src={userData.image || assets.defaultProfile}
                alt="Profile"
              />
            )
          }

          {/* Name */}
          {
            isEdit
              ? <input className='bg-gray-50 text-xl sm:text-3xl font-medium max-w-48 sm:max-w-60 mt-4 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 block mx-auto text-center' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
              : <p className='text-neutral-800 text-xl sm:text-3xl font-medium max-w-48 sm:max-w-60 mt-4 text-center mx-auto'>{userData.name}</p>
          }

          <hr className='bg-zinc-400 h-[1px] border-none my-4' />

          {/* Contact Information */}
          <div className='mb-6'>
            <p className='text-neutral-500 underline mt-3 font-semibold text-sm sm:text-base'>CONTACT INFORMATION</p>
            <div className='grid grid-cols-[1fr_2fr] sm:grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 text-sm sm:text-base'>
              <p className='font-medium'>Email id:</p>
              <p className='text-blue-500 break-all'>{userData.email}</p>
              <p className='font-medium'>Phone:</p>
              {
                isEdit
                  ? <input className='bg-gray-100 max-w-40 sm:max-w-52 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                  : <p className='text-blue-500'>{userData.phone}</p>
              }
              <p className='font-medium'>Address:</p>
              {
                isEdit
                  ? <div>
                    <input className='bg-gray-50 w-full border border-gray-300 rounded px-2 py-1 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type='text' placeholder="Line 1" />
                    <input className='bg-gray-50 w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type='text' placeholder="Line 2" />
                  </div>
                  : <p className='text-gray-500'>
                    {userData.address.line1}
                    <br />
                    {userData.address.line2}
                  </p>
              }
            </div>
          </div>

          {/* Basic Information */}
          <div className='mb-6'>
            <p className='text-neutral-500 underline mt-3 font-semibold text-sm sm:text-base'>BASIC INFORMATION</p>
            <div className='grid grid-cols-[1fr_2fr] sm:grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700 text-sm sm:text-base'>
              <p className='font-medium'>Gender:</p>
              {
                isEdit
                  ? <select className='max-w-20 bg-gray-100 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  : <p className='text-gray-400'>{userData.gender}</p>
              }
              <p className='font-medium'>Birthday:</p>
              {
                isEdit
                  ? <input className='max-w-28 bg-gray-100 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                  : <p className='text-gray-400'>{userData.dob}</p>
              }
            </div>
          </div>

          {/* Buttons */}
          <div className='flex justify-center'>
            {
              isEdit
                ? <button className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all shadow-md text-sm sm:text-base' onClick={updateUserProfileData}>Save information</button>
                : <button className='bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 sm:px-8 py-2 rounded-full hover:from-green-600 hover:to-blue-600 transition-all shadow-md text-sm sm:text-base' onClick={() => setIsEdit(true)}>Edit</button>
            }
          </div>

        </div>
      ) : (
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading profile...</p>
        </div>
      )}
    </div>
  )
}

export default Myprofile;