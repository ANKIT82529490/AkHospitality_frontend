import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbaar = () => {

    const navigate = useNavigate();

    const { token, setToken, userData } = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 h-16 sm:h-20 mb-5 border-b border-b-gray-200 bg-white/90 backdrop-blur-sm shadow-sm'>
            <img onClick={() => navigate('/')} className='w-40 sm:w-60 cursor-pointer hover:scale-105 transition-transform duration-300' src="mainlogo.png" alt="" />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1 hover:-translate-y-1 transition-all duration-500 hover:bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl px-3'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden' />
                </NavLink>

                <NavLink to='/doctor'>
                    <li className='py-1 hover:-translate-y-1 transition-all duration-500 hover:bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl px-3'>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden' />
                </NavLink>

                <NavLink to='/about'>
                    <li className='py-1 hover:-translate-y-1 transition-all duration-500 hover:bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl px-3'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden' />
                </NavLink>

                <NavLink to='/context'>
                    <li className='py-1 hover:-translate-y-1 transition-all duration-500 hover:bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl px-3'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-blue-900 w-3/5 m-auto hidden' />
                </NavLink>

                <li><a href="https://ak-hospitality-admin.vercel.app/" target="_blank" className='py-1 hover:-translate-y-1 transition-all duration-500 hover:bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl px-3 block'>ADMIN LOGIN</a></li>
            </ul>
            <div className='flex items-center gap-4 '>
                {
                    token && userData
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-8 rounded-full border-2 border-blue-500 hover:scale-110 transition-transform duration-300' src={userData.image} alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/my-profile')} className='hover:text-blue-600 cursor-pointer transition-colors duration-300'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointments')} className='hover:text-blue-600 cursor-pointer transition-colors duration-300'>My Appointments</p>
                                    <p onClick={logout} className='hover:text-red-600 cursor-pointer transition-colors duration-300'>Logout</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate('/login')} className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white cursor-pointer px-8 py-3 rounded-full font-light shadow-lg hover:shadow-xl transition-all duration-300'>Create account</button>
                }
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

                {/* Mobile Menu Background Overlay */}
                {showMenu && (
                    <div
                        className='md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm'
                        onClick={() => setShowMenu(false)}
                    ></div>
                )}

                {/* ------------ Mobile Menu ------------ */}
                <div className={`md:hidden fixed right-0 top-0 bottom-0 z-20 bg-white/95 backdrop-blur-sm transition-all duration-300 shadow-2xl ${showMenu ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src="mainlogo.png" alt="" />
                        <img className='w-7 cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded-lg hover:bg-gradient-to-r from-blue-100 to-purple-100 transition-all duration-300'>HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctor'><p className='px-4 py-2 rounded-lg hover:bg-gradient-to-r from-blue-100 to-purple-100 transition-all duration-300'>ALL DOCTORS</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded-lg hover:bg-gradient-to-r from-blue-100 to-purple-100 transition-all duration-300'>ABOUT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/context'><p className='px-4 py-2 rounded-lg hover:bg-gradient-to-r from-blue-100 to-purple-100 transition-all duration-300'>CONTACT</p></NavLink>
                        <li>
                            <a
                                href={"https://ak-hospitality-admin.vercel.app/" ||import.meta.env.VITE_ADMIN_URL || "http://localhost:5174"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='py-1 hover:-translate-y-1 transition-all duration-500 hover:bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl px-3 block'
                            >
                                ADMIN LOGIN
                            </a>
                        </li>


                        {/* Mobile User Authentication Options */}
                        {token && userData ? (
                            <>
                                <div className='w-full h-px bg-gray-300 my-4'></div>
                                <div className='flex flex-col items-center gap-2 w-full'>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <img className='w-10 h-10 rounded-full border-2 border-blue-500' src={userData.image} alt="" />
                                        <span className='text-gray-700 font-medium'>{userData.name}</span>
                                    </div>
                                    <button onClick={() => { navigate('/my-profile'); setShowMenu(false); }} className='w-full px-4 py-2 rounded-lg hover:bg-gradient-to-r from-blue-100 to-purple-100 transition-all duration-300 text-left'>My Profile</button>
                                    <button onClick={() => { navigate('/my-appointments'); setShowMenu(false); }} className='w-full px-4 py-2 rounded-lg hover:bg-gradient-to-r from-blue-100 to-purple-100 transition-all duration-300 text-left'>My Appointments</button>
                                    <button onClick={() => { logout(); setShowMenu(false); }} className='w-full px-4 py-2 rounded-lg hover:bg-red-100 transition-all duration-300 text-left text-red-600'>Logout</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='w-full h-px bg-gray-300 my-4'></div>
                                <button onClick={() => { navigate('/login'); setShowMenu(false); }} className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-light w-full max-w-xs mx-auto shadow-lg hover:shadow-xl transition-all duration-300'>Create account</button>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbaar;
