import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../../components/FormInput'
import Loading from '../../components/Loading'
import { errorMessage, successMessage } from '../../utils/functions'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { CookieName, UserRole } from '../../utils/UtilNames'
import Cookies from 'js-cookie'
import { Apis, PostApi } from '../../services/Apis'
import { decodeToken } from 'react-jwt'

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    const Submit = async (e) => {
        e.preventDefault()
        if (!forms.email) return errorMessage('Email address is required')
        if (!isValidEmail(forms.email)) return errorMessage('Please input a valid email')
        if (!forms.password) return errorMessage('Password is required')
        const formdata = {
            email: forms.email,
            password: forms.password
          }
          setLoading(true)
          try {
            const response = await PostApi(Apis.non_auth.login,formdata) 
            if (response.status === 200) {
               console.log(response)
              Cookies.set(CookieName, response.token,)
              successMessage(response.msg)
              const decoded = decodeToken(response.token)
              const findUserRole = UserRole.find((ele) => ele.role === decoded.role)
              if (findUserRole) {
                navigate(findUserRole.url)
              }
            }
            else {
              errorMessage(response.msg)
            }
          }
          catch (error) {
            return errorMessage(error.message)
          }
          finally {
            setLoading(false)
          }

    }
    return (
        //    <Layout>
        <div className={`text-dark  font-bold w-full h-screen ${loading ? 'bg-white/90' : 'bg-gray'} flex  items-center justify-center`}>
            {loading ? <Loading /> :
                <form onSubmit={Submit} className="md:w-[60%] lg:w-[40%] w-11/12 h-fit  py-10 bg-white rounded-lg flex flex-col  text-dark px-5">

                    <div className={` flex items-center justify-center w-full `}>
                        <div className="flex items-center gap-1 justify-between ">
                            <div className="px-2 py-2 rounded-full bg-sec flex items-center justify-center">
                                <FaArrowTrendUp className='text-black text-2xl' />
                                
                            </div>
                            <div className="font-bold text-xl ">Coinvista</div>
                            
                        </div>
                    </div>
                    <div className="mt-3 w-full text-center mx-auto text-3xl md:text-xl ">Welcome back</div>
                    <div className="text-center text-sm text-zinc-600">Log in to your <span>Coinvista</span> account</div>
                    <div className="flex items-start gap-4 flex-col mt-4 w-[90%] mx-auto">
                        <div className="flex text-black items-start gap-1 flex-col w-full ">
                            <div className="">Email:</div>
                            <FormInput formtype='email' name={'email'} value={forms.email} onchange={handleChange} placeholder={'your email address'} />
                        </div>
                        <div className="flex  items-start gap-1 flex-col w-full">
                            <div className="">Password:</div>
                            <FormInput placeholder={'enter your password'} name={'password'} onchange={handleChange} value={forms.password} formtype='password' />
                            <div className="w-fit ml-auto text-primary text-sm font-bold cursor-pointer">forgot password?</div>
                        </div>
                    </div>
                    <div className="w-11/12 rounded-xl bg-black mt-10 mb-5 mx-auto">
                        <button className='w-full py-3 text-white text-lg'>Login</button>
                    </div>
                    <div className="flex items-start flex-col w-11/12 mx-auto">
                        <div onClick={() => navigate(`/signup`)} className="">Don't have account? <span className='font-bold text-primary underline  cursor-pointer '>Sign Up</span></div>
                        <div className="">Back to <span onClick={() => navigate(`/`)} className=' underline cursor-pointer font-bold text-primary '>Home</span></div>
                    </div>
                </form>}
        </div>
        //    </Layout>
    )
}

export default Login