import React, { useEffect, useRef, useState } from 'react'
import { FaArrowTrendUp } from "react-icons/fa6";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import { FaWallet } from "react-icons/fa";
import { BsWalletFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { BiSolidWalletAlt } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import ceoimg from '../assets/dashbaord/ceo.jpg'
import { useNavigate } from 'react-router-dom';
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";
import { RiCloseLargeLine } from "react-icons/ri";
import { Apis, GetApi, PostApi, profileImg } from '../services/Apis';
import Cookies from 'js-cookie'
import { CookieName } from '../utils/UtilNames';
import { errorMessage, successMessage } from '../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchProfile } from '../app/reducer';
import { FaRegUser } from "react-icons/fa";



const DashboardLayout = ({ children, modal, refresh }) => {

    const Headers = [
        {
            title: 'Home',
            url: '/dashboard/overview',
            icon: <IoHome />
        },
        {
            title: 'Wallets',
            url: '/dashboard/wallet',
            icon: <FaWallet />
        },
        {
            title: 'Investments',
            url: '/dashboard/investments',
            icon: <FaCircleDollarToSlot />
        },
        {
            title: 'Deposits',
            url: '/dashboard/deposits',
            icon: <BsWalletFill />
        },
        {
            title: 'Withdrawals',
            url: '/dashboard/withdraw',
            icon: <BiSolidWalletAlt />
        },
        {
            title: 'Transaction History',
            url: '/dashboard/transhistory',
            icon: <FaHistory />
        },
        {
            title: 'Profile',
            url: '/dashboard/profile',
            icon: <FaUser />
        },
        {
            title: 'Settings',
            url: '/dashboard/settings',
            icon: <IoMdSettings />
        },
    ]

    const [notificationsArr, setNotificationsArr] = useState([
        {
            title: 'New Transaction',
            desc: 'You have a new transaction of $30 from a friend',
            status: 'read'
        },
        {
            title: 'Withdrawal transaction',
            desc: 'You have a withdrawal transaction of $30 from a friend',
            status: 'read'
        },
        {
            title: 'Plan purchase',
            desc: 'You have a new transaction of $30 from a friend',
            status: 'unread'
        },
        {
            title: 'New Transaction',
            desc: 'You have a new transaction of $30 from a friend',
            status: 'read'
        },
        {
            title: 'Withdrawal transaction',
            desc: 'You have a withdrawal transaction of $30 from a friend',
            status: 'read'
        },
        {
            title: 'Plan purchase',
            desc: 'You have a new transaction of $30 from a friend',
            status: 'unread'
        },
    ])

    const [active, setActive] = useState()
    const navigate = useNavigate()
    const [notify, setNotify] = useState(false)
    const refNotify = useRef(null)
    const sideRef = useRef(null)
    const dispatch = useDispatch()
    const [sideview, setSideview] = useState(false)
    const [receiveNotifications, setReceiveNotifications] = useState(false)
    const [logout, setLogout] = useState(false)
    const logoutRef = useRef(null)
    const Icon = receiveNotifications ? BsToggleOn : BsToggleOff
    const SideViewIcon = sideview ? RiCloseLargeLine : HiMiniBars3BottomRight
    useEffect(() => {
        if (refNotify) {
            window.addEventListener('click', e => {
                if (refNotify.current !== null && !refNotify.current.contains(e.target)) {
                    setNotify(false)
                }
            }, true)
        }
        if (sideRef) {
            window.addEventListener('click', e => {
                if (sideRef.current !== null && !sideRef.current.contains(e.target)) {
                    setSideview(false)
                }
            }, true)
        }
        if (logoutRef) {
            window.addEventListener('click', e => {
                if (logoutRef.current !== null && !logoutRef.current.contains(e.target)) {
                    setLogout(false)
                }
            }, true)
        }
    }, [])
    useEffect(() => {
        // Initialize active state based on the current URL pathname
        const pathname = location.pathname;
        const index = Headers.findIndex(item => item.url === pathname);
        if (index !== -1) {
            setActive(index);
        }
    }, [location.pathname]);

    const setHeader = (index, item) => {
        setActive(index)
        navigate(item.url)
    }

    const getProfile = async () => {
        try {
            const response = await GetApi(Apis.auth.profile)
            if (response.status == 200) {
                const data = response.data
                dispatch(dispatchProfile(data))
            }
        } catch (error) {
            errorMessage(error.message)
        }
    }
    useEffect(() => {
        getProfile()
    }, [refresh])

    const markRead = (items, index) => {
        const newItems = [...items]
        // Check if the index is valid
        if (index >= 0 && index < newItems.length) {
            newItems[index] = {
                ...newItems[index],
                status: newItems[index].status === "read" ? "unread" : "read"
            };
        }

        setNotificationsArr(newItems);
    }


    const Logout = async () => {
        try {
            const response = await PostApi(Apis.auth.logout)
            console.log(response)
            if (response.status === 200) {
                successMessage(response.msg)
                Cookies.remove(CookieName)
                navigate('/login')
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            return errorMessage(error.message)
        }
    }

    const profile = useSelector((state) => state.profile.profile);
    const fullname = `${profile?.firstname}  ` + `${profile?.lastname}`
    //  console.log(profile)
    return (
        <div className={`w-full ${notify || sideview || logout || modal && 'overflow-y-hidden h-screen'} relative`}>

            {notify &&
                <div className="w-full h-screen z-50 bg-black/40 backdrop-blur-sm absolute top-14 left-0">
                    <div ref={refNotify} className="w-[30%] h-[90dvh] oveerflow-y-auto rounded-md ml-auto  px-3 py-3 bg-white top-1 absolute right-0">
                        <div className="font-bold text-xl">Receive Notifications</div>
                        <div className={`flex w-full items-center justify-between font-semibold `}>
                            <div className={`${receiveNotifications ? 'text-primary font-bold ' : ''} text-xl`}>{receiveNotifications ? 'Active' : 'Inactive'}
                            </div>
                            <Icon onClick={() => setReceiveNotifications(prev => !prev)} className={`text-4xl cursor-pointer ${receiveNotifications ? 'text-primary ' : ''}`} />
                        </div>
                        <div className="my-3 flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                                <button className='px-5 py-1 rounded-md border-primary border text-center bg-light text-primary font-bold '>All</button>
                                <button className='px-3 py-1 rounded-md font-bold'>Unread</button>
                            </div>
                            <button className='font-bold text-lg text-primary'>Mark all as read</button>
                        </div>
                        <div className="my-5 w-full  ">
                            {notificationsArr.map((item, i) => (
                                <div onClick={() => markRead(notificationsArr, i)} className={`flex items-center mb-5 gap-5 border-b cursor-pointer pb-1 border-primary`} key={i}>
                                    {item.status === 'read' &&
                                        <div className="w-2 h-2  rounded-full bg-red-600"></div>
                                    }
                                    <div className={`px-3 py-2 rounded-full bg-primary text-white`}>{item.title.slice(0, 1)}</div>
                                    <div className={`${item.status !== 'read' && ''} text-sm`}>{item.desc}</div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            }


            {sideview &&
                <div className="w-full h-screen z-50 bg-black/40 backdrop-blur-sm absolute top-12 left-0">
                    <div ref={sideRef} className="w-[60%] h-[91dvh] overflow-y-auto rounded-e-md ml-auto  px-3 py-3 bg-white top-1 absolute left-0">
                        <div className="  flex-col h-[85dvh] flex items-start justify-between">
                            <div className=" w-full flex items-start justify-between  flex-col gap-2">
                                {Headers.map((item, i) => {
                                    return (
                                        <div key={i} onClick={() => setHeader(i, item)} className={`flex  items-center  cursor-pointer  w-full py-2 pl-8 ${active === i ? 'bg-light   text-primary font-bold rounded-lg  bord' : ''}`}>
                                            <div className={`flex items-center gap-2 ${active === i ? 'bg-light text-primary font-bold rounded-lg   ' : ''}`} >
                                                <div className="">{item.icon}</div>
                                                <div className="">{item.title}</div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                            <div className="flex items-center gap-2 pl-7 cursor-pointer border-t-2 pt-2  border-t-gray w-full">
                                <div className="font-bold"><CiLogout /></div>
                                <div className="">Logout</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="w-full mx-auto   flex items-start">
                <div className={`lg:w-[20%] z-50 w-0 bg-white border-r-primary hidden lg:block border-r-2 h-screen py-4 px-4 fixed`}>
                    <div className={`w-full flex items-center justify-between `}>
                        <div className="flex items-center gap-2">
                            <div className="px-2 py-2 rounded-full bg-sec flex items-center justify-center">
                                <FaArrowTrendUp className='text-black ' />
                            </div>
                            <div className="">CoinVista</div>
                        </div>
                        <div className="">
                            <HiMiniBars3BottomRight className='cursor-pointer text-black text-2xl ' />
                        </div>
                    </div>
                    <div className=" mt-5 flex-col h-[85dvh] flex items-start justify-between">
                        <div className=" w-full flex items-start justify-between  flex-col gap-2">
                            {Headers.map((item, i) => {
                                return (
                                    <div key={i} onClick={() => setHeader(i, item)} className={`flex  items-center  cursor-pointer  w-full py-2 pl-8 ${active === i ? 'bg-light   text-primary font-bold rounded-lg  bord' : ''}`}>
                                        <div className={`flex items-center gap-2 ${active === i ? 'bg-light text-primary font-bold rounded-lg   ' : ''}`} >
                                            <div className="">{item.icon}</div>
                                            <div className="">{item.title}</div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                        <div onClick={() => setLogout(true)} className="flex items-center gap-2 pl-7 cursor-pointer border-t-2 pt-2  border-t-gray w-full">
                            <div className="font-bold"><CiLogout /></div>
                            <div className="">Logout</div>
                        </div>
                    </div>

                </div>
                <div className="lg:w-[80%] w-full lg:ml-auto bg-gray relative  ">
                    <div className="lg:w-[80%]  w-full bg-white flex z-50 items-center justify-between fixed  h-fit px-5 py-2">
                        <div className="lg:flex hidden items-center gap-2 bg-gray h-10 rounded-lg pl-2 w-[35%]">
                            <IoSearchOutline className='font-bold text-lg' />
                            <input type="text" placeholder='search anything' className='outline-none pl-2 w-full h-full bg-transparent' />
                        </div>
                        <div className="">
                            <SideViewIcon onClick={() => setSideview(prev => !prev)} className='cursor-pointer lg:hidden text-black text-3xl ' />
                        </div>
                        <div className="flex items-center gap-2 ">
                            <div className="relative cursor-pointer">
                                <IoNotifications onClick={() => setNotify(prev => !prev)} className='lg:text-3xl text-2xl ' />
                                <div className="absolute w-fit px-1  text-xs rounded-full bg-red-500 top-0 right-0 text-white">2</div>
                            </div>
                            <div className="text-[1rem] text-primary font-bold">{fullname}</div>
                            {profile?.image ? <img onClick={() => navigate(`/dashboard/profile`)} src={`${profileImg}/profiles/${profile?.image}`} className='cursor-pointer w-10 h-10 object-cover rounded-full' alt="ceo coinvista" /> :
                                <div onClick={() => navigate(`/dashboard/profile`)} className="w-10 cursor-pointer border-gray border rounded-full h-10 flex items-center justify-center">
                                    <FaRegUser className='text-2xl' />
                                </div>
                            }
                        </div>
                    </div>

                    <div className={` w-full mt-16 lg:mt-20 mb-5 ${notify ? 'h-fit max-h-[80dvh]' : 'h-full'}`}>
                        {logout &&
                            <div className="w-full h-[100dvh] z-50 bg-black/40 backdrop-blur-sm absolute top-12 left-0">
                                <div ref={logoutRef} className="w-[60%] mx-auto h-[25dvh] rounded-lg  px-3 py-3 bg-white top-1/3 absolute left-1/2 -translate-x-1/2">
                                    <div className="flex items-center gap-2 h-full justify-center flex-col">
                                        <div className="">Confirm Logout</div>
                                        <div className="flex items-center justify-between w-3/4 mx-auto text-white">
                                            <button onClick={() => setLogout(false)} className='w-fit px-6 py-2 rounded-lg bg-red-600 '>Cancel</button>
                                            <button onClick={Logout} className='w-fit px-6 py-2 rounded-lg bg-primary'>Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {children}</div>

                </div>
            </div>
        </div>
    )
}

export default DashboardLayout