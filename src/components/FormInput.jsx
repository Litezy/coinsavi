import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { VscEyeClosed ,VscEye} from "react-icons/vsc";

const FormInput = ({ formtype = 'text', placeholder,name,value,onchange,onKeyUp,onclick }) => {
    const [open,setOpen] = useState(false)
    const Icon = open ? VscEyeClosed: VscEye
    return (
        <div className='w-full'>
            {formtype === 'text' && 
            <input onClick={onclick} 
            value={value} 
            name={name}  
            onChange={onchange} 
            onKeyUp={onKeyUp} 
            type="text" 
            className='w-full border-gray border-2 h-12 rounded-lg outline-none pl-2' placeholder={placeholder} />}

            {formtype === 'code' && 
            <input 
            value={value} 
            name={name}  
            onChange={onchange} 
            onClick={onclick}
            type="text" 
            className='w-full border-gray border-2 text-center h-10 rounded-lg outline-none px-5' placeholder={placeholder} />}

            {formtype === 'sex' && 
            <input onClick={onclick} 
            value={value}  
            type="text" 
            className='w-full border-gray border-2 h-8 flex items-center justify-center rounded-lg outline-none pl-2' placeholder={placeholder} />}


            {formtype === 'email' && 
            <input 
            type="email" 
            value={value} 
            name={name} 
            onChange={onchange} 
            className='w-full tracking-wide border-gray border-2 h-12 font-normal rounded-lg outline-none pl-2' placeholder={placeholder} />}


            {formtype === 'phone' && 
            <input 
            onChange={onchange} 
            value={value} 
            name={name}  
            type="number" 
            className='w-full border-gray border-2 h-12 rounded-lg outline-none pl-2' 
            placeholder={placeholder} />}

            {formtype === 'country' &&
                <div className="border-gray border-2 h-12  rounded-lg pr-3 flex items-center justify-between">
                    <input 
                    type="number" 
                    onChange={onchange}  
                    className='w-full h-full outline-none pl-2 bg-transparent' 
                    placeholder={placeholder} 
                    value={value} 
                    name={name}  />
                    <FaChevronDown className='cursor-pointer' />
                </div>
            }

         
         {formtype === 'password' &&
         <div className="w-full border-gray border-2 bg-white text-black items-center h-12 rounded-lg flex">
            <input 
            type={`${open ?'text':'password'}`} 
            value={value} 
            name={name} 
            onChange={onchange}  
            className='outline-none h-full text-dark  font-normal tracking-normal px-2  bg-transparent w-[90%]' placeholder={placeholder} />
            <Icon className='cursor-pointer text-2xl text-dark ' onClick={()=> setOpen(!open)}/>
         </div>
         }
            
        </div>
    )
}

export default FormInput