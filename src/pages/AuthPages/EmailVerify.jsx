import React, { useEffect, useState } from 'react'
import { MdOutlineMarkEmailRead } from 'react-icons/md'
import { RiCloseLargeFill } from 'react-icons/ri'
import FormInput from '../../components/FormInput'
import { useSelector } from 'react-redux'
import FormButton from '../../components/FormButton'
import { Apis, ClientPostApi, GetApi } from '../../services/Apis'
import { errorMessage, successMessage } from '../../utils/functions'
import Loader from '../../components/Loader'
import envelope from '../../assets/dashbaord/envelope.png'

const EmailVerify = ({ emaildiv, setModal }) => {
    const [code, setCode] = useState(false)
    const [forms, setForms] = useState({
        reset_code: '',
    })
    const [countdown, setCoundown] = useState(0)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState({})

    const getProfile = async () => {
        try {
            const response = await GetApi(Apis.auth.profile)
            if (response.status == 200) {
                const data = response.data
                setProfile(data)
            }
        } catch (error) {
            errorMessage(error.message)
        }
    }
    useEffect(() => {
        getProfile()
    }, [loading])


    const handleChange =(e)=>{
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        let timer;
        if (btnDisabled) {
            timer = setInterval(() => {
                setCoundown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        setBtnDisabled(false)
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000)
        }

        return () => clearInterval(timer)
    }, [btnDisabled])

    const RequestOtp = async (e) => {
        e.preventDefault()
        const formData = {
            email: profile?.email
        }
        setLoading(true)
        try {
            const response = await ClientPostApi(Apis.non_auth.resend_otp, formData)
            if (response.status === 200) {
                successMessage(response.msg)
                setCode(true)
                setBtnDisabled(true)
                setCoundown(60)
            } else {
                errorMessage(response.msg)
            }

        } catch (error) {
            errorMessage(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div ref={emaildiv} className="md:w-2/4 w-full bg-white h-fit py-3 rounded-lg relative">

            {loading &&
                <div className="absolute rounded-md w-full h-full flex items-center justify-center backdrop-blur-sm">
                    <Loader />
                </div>
            }
            {profile?.email_verified === 'false' ?

                <>
                    <div className="flex w-full justify-between items-center px-3">
                        <div className="text-xl font-bold">verify email</div>
                        <RiCloseLargeFill onClick={() => setModal(false)} className='text-2xl cursor-pointer' />
                    </div>
                    <hr className='my-5 bg-gray' />
                    <div className="w-11/12 mx-auto">
                        <MdOutlineMarkEmailRead className='text-center w-full text-6xl mb-10 text-primary' />

                        <div className="w-full flex items-start flex-col gap-3">
                            <div className="flex items-start flex-col w-full">
                                <div className="text-primary font-bold text-[1rem]">{!code ? 'Your Email' : 'Enter code'}</div>
                                {!code ? <FormInput value={profile?.email} /> :
                                    <FormInput
                                        formtype='code'
                                        name={'reset_code'}
                                        value={forms.reset_code || ''}
                                        onChange={handleChange}
                                        placeholder={'*****'}
                                    />}
                                <div className="text-xs text-primary">If you wish to change your email, kindly head to 'change email' section</div>
                            </div>
                            {!btnDisabled && <button onClick={RequestOtp} className="w-fit py-1 px-5 self-center rounded-dark text-white rounded-full bg-dark">request code</button>}


                            {btnDisabled && <div className="w-fit text-xs ml-auto flex items-center gap-1 flex-col">
                                <div className="">request again in:</div>
                                <div className="text-primary">{countdown} s</div>
                            </div>}
                        </div>
                        <div className=" mt-24 w-full relative">
                            {!code && <div className="absolute w-full h-10 bg-gray/80"></div>}
                            <FormButton bg={`bg-primary`} h={`h-10`} text={`text-white`} title={`verify email`} />

                        </div>
                    </div>
                </> :
                <>
                    <div className=" h-full w-11/12 mx-auto py-10">
                        <div className="flex items-center justify-center gap-5 flex-col">
                            <img src={envelope} className='h-48' alt="emailimg" />
                            <div className="text-center text-xl">Congratulations your email is verified</div>
                            <button onClick={() => setModal(false)} className="w-fit px-5 self-start py-1 rounded-full bg-dark text-white">back</button>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default EmailVerify