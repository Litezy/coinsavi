import React from 'react'
import { footerHeaders } from '../../utils/functions'
import { FaArrowTrendUp, FaChevronDown } from 'react-icons/fa6'

const Footer = () => {

  const terms= [
    { id: 1, name: "Terms of Service" ,url:''},
    { id: 2, name: "Privacy Policy" ,url:''},
    { id: 3, name: "Community" ,url:''},
  ]
  return (
    <div className='w-full min-h-[70dvh] h-fit py-3 relative bg-dark '>
      <div className="-top-10 left-1/2 -translate-x-1/2 rounded-lg absolute h-fit w-11/12 py-3 lg:py-5 lg:w-9/12 bg-[#f6f5f0] px-10">
        <div className="w-full flex  flex-col lg:flex-row lg:items-center gap-2 justify-between">
          <div className="flex items-start flex-col ">
            <div className="md:text-2xl text-xl font-bold">Our Awesome Newsletter</div>
            <div className="text-sm">Be the first one to know about about our discount offers and events</div>
          </div>
          <div className="flex items-center justify-between gap-1 h-12 rounded-lg bg-white pl-2 pr-1 lg:w-[40%]">
            <input type="text" className='outline-none h-full w-[90%]' placeholder='email address' />
            <button className="w-fit px-5 py-2 rounded-lg text-white bg-sec font-bold">Submit</button>
          </div>
        </div>
      </div>
      <div className="pt-32 w-full h-full  text-white px-5">
        <div className="flex items-start flex-col gap-5 lg:gap-0 lg:flex-row justify-between w-full">
          <div className="w-[25%]">
            <div className="text-5xl font-bold">Coinvista</div>
          </div>
          <div className="w-[75%]">
            <div className="grid lg:grid-cols-3 grid-cols-2 items-start justify-evenly  w-3/4  mx-auto gap-8 lg:gap-0">
              {footerHeaders.map((item, i) => {
                return (
                  <div className="flex items-start flex-col gap-4" key={i}>
                    <div className="font-bold text-lg">{item.title}</div>
                    {item.links.map((link, l) => (
                      <div className="text-light cursor-pointer hover:underline hover:-translate-y-0.5 hover:transition-all hover:delay-100 hover:ease-in-out ">{link.title}</div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <hr className=' mx-5 mt-16 text-white' />
      <div className="h-fit pt-5 text-white mx-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 w-full lg:grid-cols-3 justify-between">
          <div className="flex items-center gap-4 w-full">
            <div className="flex items-center gap-4 ">
              <div className=" px-2 py-2 rounded-full bg-sec flex items-center justify-center">
                <FaArrowTrendUp className='text-black text-2xl' />
              </div>
              <div className="font-bold text-2xl text-white">Coinvista</div>
            </div>
            <div className="text-light text-sm lg:text-sm md:text-xs">&copy; 2024 Coinvista. All rights reserved.</div>
          </div>
          <div className="flex items-center gap-1 w-full  justify-center">
            <div className="text-sm text-light">English</div>
            <FaChevronDown className='text-sm cursor-pointer'/>
          </div>
          <div className="flex  items-center gap-3 text-sm text-light">
            {terms.map((item,i) =>(
              <div className="cursor-pointer " key={i}>{item.name}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer