import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='w-full '>
    <div className='w-full h-full  flex flex-col  items-center justify-between overflow-y-auto '>
        <div className=" w-full h-[12dvh] z-50 bg-black  ">
            <Header/>
        </div>
        <div className=" w-full  h-fit bg-gray  ">
            {children}
            </div>
        <div className="h-fit w-full">
            <Footer/>
        </div>

    </div>
</div>
  )
}

export default Layout