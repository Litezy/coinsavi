import React, { useState } from 'react'
import FormInput from '../../components/FormInput'
import { CiMail } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { updateForms } from '../../app/reducer';
import { Apis, ClientPostApi, PostApi } from '../../services/Apis';
import { errorMessage, successMessage } from '../../utils/functions';
import Loader from '../../components/Loader';
import emailimg from '../../assets/general/email.png'
import { CookieName, UserRole } from '../../utils/UtilNames';
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';


const EmailVerification = ({ }) => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [screen, setScreen] = useState(1)
    const forms = useSelector((state) => state.profile.forms)

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateForms({ name, value }));
    }

    const verifyEmail = async (e) => {
        e.preventDefault()
        const formData = {
            reset_code: forms.reset_code,
            email: forms.email
        }
        setLoading(true)
        try {
            const response = await ClientPostApi(Apis.non_auth.verify_email, formData)
            if (response.status === 200) {
                setScreen(2)
                successMessage(response.msg)
                dispatch(updateForms({ name: '' }));
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    const ResendEmail = async (e) => {
        e.preventDefault()
        const formData = {
            email: forms.email
        }
        setLoading(true)
        try {
            const response = await ClientPostApi(Apis.non_auth.resend_otp, formData)
            if (response.status === 200) {
                successMessage(response.msg)
            } else {
                errorMessage(response.msg)
                console.log(forms.email)
            }

        } catch (error) {
            errorMessage(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const loginAcc = async (e) => {
        e.preventDefault()
        const formdata = {
            email: forms.email,
            password: forms.password
        }
        setLoading(true)
        try {
            const response = await PostApi(Apis.non_auth.login, formdata)
            if (response.status === 200) {
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
        <div className='w-full h-screen flex items-center justify-center bg-gray'>
            <form onSubmit={verifyEmail} className='flex items-center relative  md:w-2/4 w-[90%] justify-center py-3 text-dark lg:h-[50%] rounded-md  mx-auto bg-white flex-col ' >

                {loading &&

                    <div className="w-full h-full flex items-center justify-center absolute backdrop-brightness-50 rounded-lg">
                        <div className="">
                            <Loader />
                        </div>

                    </div>
                }
                {screen === 1 &&
                    <>
                        <div className="mb-5  flex gap-5 items-center justify-center ">
                            <CiMail className='text-4xl text-primary' />
                            <h1 className='main font-bold text-3xl text-primary'> Email Verification</h1>
                        </div>
                        <div className="flex items-center  gap-10 w-full ">
                            <div className=" lg:w-3/4 mx-auto px-2 lg:px-0">
                                <div className="text-xs md:text-sm"><h1>A verification code has been sent to your email <span className='text-dark font-bold '>{forms.email?.slice(0, 4)}*****{forms.email?.slice(-10)}</span> Paste the code below to verify your email.</h1></div>
                                <div className="mb-5 w-2/4 mx-auto flex flex-col items-center justify-center">
                                    <h1 className='text-xl font-bold mt-3'>verification code:</h1>
                                    <div className="w-32 self-center">
                                        <FormInput formtype='code' onchange={(handleChange)} placeholder={`******`} name={`reset_code`} value={forms.reset_code} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="">Didn't receive code?</div>
                                    <button onClick={ResendEmail} type='button' className='main font-bold'>Resend</button>
                                </div>
                            
                                <div className="flex items-center justify-between w-full mt-5">
                                    <div onClick={()=> navigate('/login')} className=" cursor-pointer px-5 py-2 rounded-full bg-dark text-white font-bold">skip for now</div>
                                        <button className='mainbg px-5 py-2 rounded-full bg-primary text-white font-bold'>Verify Email</button>
                                    </div>
                              
                            </div>
                        </div>
                    </>
                }
                {screen === 2 &&
                    <>

                        <div className="flex items-center h-full  gap-10 w-full ">
                            <div className=" lg:w-3/4 mx-auto px-2 lg:px-0 ">
                                <div className="w-full flex flex-col items-center justify-center">
                                    <img src={emailimg} className='h-48 flex  ' alt="" />
                                    <div className="text-center">Congratulations, your email email has been verified successfully</div>
                                    <div onClick={loginAcc} className=" cursor-pointer text-center w-fit px-4 py-2 my-2 rounded-lg bg-dark text-white ">Continue to dashboard</div>
                                </div>

                            </div>
                        </div>
                    </>
                }

            </form>

        </div>
    )
}

export default EmailVerification