import React from 'react'
import { RiCloseLargeFill } from 'react-icons/ri'
import { RiLockPasswordFill } from "react-icons/ri";
import FormInput from './FormInput';
import FormButton from './FormButton';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

const EmailandPassModal = ({email,pass,emaildiv,setModal}) => {
  return (
    <div ref={emaildiv} className="md:w-2/4 w-full bg-white h-fit py-3 rounded-lg ">
              <div className="flex w-full justify-between items-center px-3">
                <div className="text-xl font-bold">Change {email ?'Email':'Password'}</div>
                <RiCloseLargeFill onClick={() => setModal(false)} className='text-2xl cursor-pointer' />
              </div>
              <hr className='my-5 bg-gray' />
              <div className="w-11/12 mx-auto">
               {email && <MdOutlineMarkEmailRead className='text-center w-full text-6xl mb-10 text-primary' />}
               {pass && <RiLockPasswordFill className='text-center w-full text-6xl mb-10 text-primary' />}
                <div className="w-full flex items-start flex-col gap-3">
                  <div className="flex items-start flex-col w-full">
                    <div className="text-primary font-bold text-[1rem]">Current {email ?' Email':'Password'}</div>
                    <FormInput placeholder={`currentemail@gmail.com`} />
                  </div>
                  <div className="flex items-start flex-col w-full">
                    <div className="text-primary font-bold text-[1rem]">New {email ?' Email':'Password'}</div>
                    <FormInput placeholder={`New email`} />
                    {email && <div className="text-sm">An email will be sent to this new email for verification.</div>}
                  </div>
                </div>
                <div className=" mt-24">
                 {email && <FormButton bg={`bg-primary`} h={`h-10`} text={`text-white`} title={`Save Changes`}/>}
                 {pass && <FormButton bg={`bg-primary`} h={`h-10`} text={`text-white`} title={`Save Password`}/>}
                </div>
              </div>
            </div>
  )
}

export default EmailandPassModal