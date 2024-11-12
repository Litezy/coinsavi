import React, { useEffect, useRef, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import kycimg from '../../assets/dashbaord/kycimg.png'
import walletimg from '../../assets/dashbaord/crypto.png'
import passwordimg from '../../assets/dashbaord/passwordimg.png'
import EmailandPassModal from '../../components/EmailandPassModal'
import KYC from './KYC'
import ExternalWallets from '../../components/ExternalWallets'
import emailimg from '../../assets/general/email.png'
import EmailVerify from './EmailVerify'


const Settings = () => {
  const [kycScreen, setKycScreen] = useState(0)
  const [emailScreen,setEmailScreen] = useState(false)
  const [wallet,setWallet ]= useState(0)
  const [passcreen, setPassScreen] = useState(false)
  const emaildiv = useRef(null)
 useEffect(()=>{
  if(emaildiv){
    window.addEventListener('click', (e)=>{
      if(emaildiv.current !== null && !emaildiv.current.contains(e.target)){
        setPassScreen(false)
        setEmailScreen(false)
      }
    },true)
  }
 },[])


  return (
    <DashboardLayout modal={passcreen}>
      <div className={`w-11/12 mx-auto rounded-lg  ${kycScreen || wallet === 0 && 'lg:flex items-center justify-center bg-white py-5 lg:py-2 lg:h-[90dvh]'}`}>
        {kycScreen === 0 && wallet === 0 && <div className="px-4 md:px-0 w-11/12 mx-auto md:grid grid-cols-2 gap-5 ">
          <div onClick={() => setKycScreen(1)} className="bg-white h-48 w-full mx-auto rounded-md border shadow-lg cursor-pointer ">
            <div className="w-11/12 mx-auto flex items-center justify-center gap-5 h-full  ">
              <img src={kycimg} alt="" className='w-24' />
              <h1 className='text-sm md:text-lg'>Submit KYC Information</h1>
            </div>
          </div>
          <div onClick={() => setPassScreen(true)} className="bg-white h-48 mt-5 md:mt-0 w-full mx-auto rounded-md border shadow-lg cursor-pointer ">
            <div className="w-11/12 mx-auto flex items-center justify-center gap-5  h-full">
              <img src={passwordimg} alt="" className='w-24' />
              <h1 className='text-sm md:text-lg'>Change Account Password</h1>
            </div>
          </div>
          <div onClick={() => setWallet(1)} className="bg-white h-48 mt-5 md:mt-0 w-full mx-auto rounded-md border shadow-lg cursor-pointer ">
            <div className="w-11/12 mx-auto flex items-center justify-center gap-5  h-full">
              <img src={walletimg} alt="" className='w-24' />
              <h1 className='text-sm md:text-lg'>External Wallets</h1>
            </div>
          </div>
          <div onClick={() => setEmailScreen(1)} className="bg-white h-48 mt-5 md:mt-0 w-full mx-auto rounded-md border shadow-lg cursor-pointer ">
            <div className="w-11/12 mx-auto flex items-center justify-center gap-5  h-full">
              <img src={emailimg} alt="" className='w-24' />
              <h1 className='text-sm md:text-lg'>Verify Email</h1>
            </div>
          </div>
        </div>}

        {passcreen  &&
          <div className="absolute top-5 py-8 px-10 right-0 flex items-center justify-center w-full h-screen bg-black/40 backdrop-blur-sm">
            <EmailandPassModal emaildiv={emaildiv} pass={true} setModal={setPassScreen} />
          </div>
        }

        {wallet === 1 && 
        <div className="w-full ">
          <ExternalWallets setWallet={setWallet}/>
        </div>
        }

        {kycScreen === 1 && 
        <div className="w-full px-3 py-3">
          <KYC screen={setKycScreen}/>
        </div>
        }
        {emailScreen === 1 && 
        <div className="absolute top-5 py-8 px-10 right-0 flex items-center justify-center w-full h-screen bg-black/40 backdrop-blur-sm">
          <EmailVerify emaildiv={emaildiv} setModal={setEmailScreen} />
        </div>
        }
      </div>
    </DashboardLayout>
  )
}

export default Settings