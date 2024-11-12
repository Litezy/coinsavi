import React, { useEffect, useState } from 'react'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { homepageHeaders } from '../../utils/functions'
import { FaBarsStaggered } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const [active, setActive] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        const pathname = location.pathname
        const index = homepageHeaders.findIndex(item => item.url === pathname);
        if (index !== -1) {
            setActive(index);
        }
    },[location.pathname])

    const selectHeader = (item,i) => {
        setActive(i)
        navigate(item.url)
    }
  return (
    <div className='w-full border '>
    <div className="w-full lg:px-20 px-5 bg-[#f6f5f0]  fixed border border-white top-0 left-1/2 -translate-x-1/2  mx-auto h-20 py-5 z-50 flex items-center justify-between">
        <div className={` flex items-center justify-between `}>
            <div className="flex items-center gap-4">
                <div className="lg:px-4 lg:py-4 px-2 py-2 rounded-full bg-sec flex items-center justify-center">
                    <FaArrowTrendUp className='text-black text-2xl' />
                </div>
                <div className="font-bold text-2xl ">Coinvista</div>
            </div>
        </div>

        <div className="max-w-3/4 hidden items-center justify-between gap-10 lg:flex">
            {homepageHeaders.map((item, i) => {
                return (
                    <div onClick={() => selectHeader(item,i)} className={`${active === i ? '  font-bold' : ''}  cursor-pointer `} key={i}>{item.title}</div>
                )
            })}
        </div>
        <div className="block lg:hidden">
            <FaBarsStaggered className="text-2xl cursor-pointer " />
        </div>
        <div className="lg:flex items-center gap-5 hidden ">
            <div onClick={()=> navigate('/login')} className="w-fit px-10 py-2 rounded-md cursor-pointer hover:bg-white bg-dark text-white hover:text-primary hover:border">Login</div>
            <div onClick={()=> navigate(`/signup`)} className="w-fit px-10 py-2 rounded-md cursor-pointer hover:bg-dark hover:text-white bg-white border text-primary">Sign Up</div>
        </div>
        
    </div>
    
</div>
  )
}

export default Header