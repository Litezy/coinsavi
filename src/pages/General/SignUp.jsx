import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../../components/FormInput'
import Loading from '../../components/Loading'
import { errorMessage } from '../../utils/functions'
import { FaArrowTrendUp, FaChevronDown } from "react-icons/fa6";
import Countries from '../../Countries.json'
import { Apis, ClientPostApi } from '../../services/Apis'
import EmailVerification from './EmailVerification'
import { useDispatch } from 'react-redux'
import { dispatchForms } from '../../app/reducer'

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [check, setCheck] = useState(false)
    const [openCodes, setOpenCodes] = useState(false)
    const [openCountries, setOpenCountries] = useState(false)
    const [filteredCountries, setFilteredCountries] = useState([])
    const [screen, setScreen] = useState(1)
    const [loading, setLoading] = useState(false)
    const codeRef = useRef(null)
    const [forms, setForms] = useState({
        email: '',
        password: '',
        confirm_password: '',
        phone: '',
        code: `${Countries[234].dial_code}` || '',
        country: `${Countries[234].name}` || '',
        username: '',
        firstname: '',
        reset_code:'',
        lastname: '',
        country_img: `https://flagcdn.com/${Countries[234].code.toLocaleLowerCase()}.svg` || ''
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
        if (!forms.firstname) return errorMessage(`First name is required`)
        if (!forms.lastname) return errorMessage(`Last name is required`)
        if (!forms.username) return errorMessage(`Username is required`)
        if (!forms.code) return errorMessage(`Phone dial code is required`)
        if (!forms.phone) return errorMessage(`Phone number is required`)
        if (!forms.country) return errorMessage(`Country is required`)
        if (!forms.email) return errorMessage('Email address is required')
        if (!isValidEmail(forms.email)) return errorMessage('Please input a valid email')
        if (!forms.password) return errorMessage('Password is required')
        if (forms.password !== forms.confirm_password) return errorMessage('Password(s) not matching')
        if (!check) return errorMessage('Agree to our terms and conditions')

        const formData = {
            email: forms.email,
            password: forms.password,
            phone: forms.code + forms.phone,
            country: forms.country,
            username: forms.username,
            firstname: forms.firstname,
            lastname: forms.lastname,
            confirm_password:forms.confirm_password

        }
        setLoading(true)
      try {
        const response = await ClientPostApi(Apis.non_auth.create_acc,formData)
        if(response.status === 200){
            dispatch(dispatchForms(forms))
         navigate('/email-verification')
        }else{
         errorMessage(response.msg)
         setScreen(1)
        }
      } catch (error) {
        errorMessage(error.message)
      }finally{
        setLoading(false)
      }
    }

    const selectOneCountry = (country) => {
        setForms({
            ...forms,
            country_img: `https://flagcdn.com/${country.code.toLocaleLowerCase()}.svg`,
            code: country.dial_code,
            country: country.name
        })
        setOpenCodes(false)
    }

    const filterCountry = (e) => {
        const value = e.target.value.trim().toLowerCase();
        setForms({ ...forms, country: value })

        if (value) {
            const filtered = Countries.filter((item) =>
                item.name.toLowerCase().startsWith(value)
            )
            setFilteredCountries(filtered)
        } else {
            setFilteredCountries(Countries)
        }
    }

    useEffect(() => {
        if (codeRef) {
            window.addEventListener('click', e => {
                if (codeRef.current !== null && !codeRef.current.contains(e.target)) {
                    setOpenCodes(false)
                }
            }, true)
        }
    }, [])

    return (
        <div className={`text-dark font-bold w-full h-screen ${loading ? 'bg-white/90' : 'bg-gray'} flex items-center justify-center`}>
            {loading && <Loading /> }
                {screen ===1 && <form onSubmit={Submit} className="md:w-[60%] lg:w-[40%] scroll w-11/12 h-[90dvh] overflow-y-auto bg-white rounded-lg flex flex-col gap-2 text-dark py-10 px-5">

                    <div className={` flex items-center justify-center w-full `}>
                        <div className="flex items-center gap-1 justify-between ">
                            <div className="px-2 py-2 rounded-full bg-sec flex items-center justify-center">
                                <FaArrowTrendUp className='text-black text-2xl' />

                            </div>
                            <div className="font-bold text-xl ">Coinvista</div>

                        </div>
                    </div>
                    <div className="mt-2 mb-1">
                        <div className=" w-full text-center mx-auto text-3xl md:text-xl ">Welcome</div>
                        <div className="text-center text-sm text-zinc-600">Sign up for an account</div>
                    </div>
                    <div className="w-full flex items-center justify-between gap-5">
                        <div className="text-black w-1/2">
                            <FormInput formtype='text' name={'firstname'} value={forms.firstname} onchange={handleChange} placeholder={'First Name'} />
                        </div>
                        <div className="w-1/2">
                            <FormInput placeholder={'Last Name'} name={'lastname'} onchange={handleChange} value={forms.lastname} formtype='text' />
                        </div>
                    </div>
                    <FormInput formtype='text' name={`username`} value={forms.username} onchange={handleChange} placeholder={`Username`} />
                    <div className="flex items-center gap-4 mt-4 w-full">
                        <div className="md:w-[35%] px-3 flex items-center relative gap-2 h-12 rounded-lg border-gray border">
                            <img src={forms.country_img ? forms.country_img : `https://flagcdn.com/${Countries[234].code.toLocaleLowerCase()}.svg`} className='w-10 h-10 rounded-full object-cover' alt={`country image`} onChange={(e) => setForms({ ...forms, country_img: e.target.src })} />
                            <input name='code' value={forms.code ? forms.code : Countries[234].dial_code} type="text" className='h-full w-[90%] outline-none' readOnly />
                            <FaChevronDown className='cursor-pointer text-2xl' onClick={() => setOpenCodes(prev => !prev)} />
                            {openCodes &&
                                <div ref={codeRef} className="w-11/12 absolute bottom-0 top-full left-1/2 -translate-x-1/2 rounded-md h-48 py-2 overflow-y-auto px-2 bg-gray">
                                    {Array.isArray(Countries) && Countries.map((item, i) => (
                                        <div onClick={() => selectOneCountry(item)} className="flex items-center w-11/12 mx-auto cursor-pointer gap-2 py-2 border-b border-white" key={i}>
                                            <img src={`https://flagcdn.com/${item.code.toLocaleLowerCase()}.svg`} className='w-10 h-10 rounded-full object-cover' alt={`${item.name}`} />
                                            <div className="">{item.dial_code}</div>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>

                        <div className="w-3/4 md:w-[75%]">
                            <FormInput formtype='phone' placeholder={`Phone no.`} name={'phone'} value={forms.phone} onchange={handleChange} />
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between gap-5">
                        <FormInput formtype='email' name={'email'} value={forms.email} onchange={handleChange} placeholder={`Email Address`} />
                        <div className="w-full relative">
                            <input name='country' value={forms.country ? forms.country : Countries[234].name} type="text" className={`h-12 ${forms.country.length > 27 && 'text-xs'} rounded-lg pl-2 w-full outline-none border-gray border capitalize`} onKeyUp={filterCountry} />
                        </div>
                    </div>
                    <FormInput formtype='password' name={'password'} value={forms.password} onchange={handleChange} placeholder={`Password`} />
                    <FormInput formtype='password' name={`confirm_password`} value={forms.confirm_password} onchange={handleChange} placeholder={`Confirm Password`} />

                    <div className="flex items-center gap-3">
                        <input type="checkbox"
                            id='check'
                            className=' accent-primary cursor-pointer  relative  lg:w-4 rounded-full  focus:outline-none lg:h-4'
                            checked={check}
                            onChange={() => setCheck(prev => !prev)}
                        />
                        <div className="md:text-[.9rem] text-[.8rem]">By checking the box, you agree to our <span className='font-bold text-primary underline cursor-pointer'>Terms of Use</span> & <span className='font-bold text-primary underline cursor-pointer'>Privacy Policy</span></div>
                    </div>
                    <div className="w-full rounded-xl bg-black my-5 ">
                        <button className='w-full py-3 text-white text-lg'>Sign Up</button>
                    </div>
                    <div className="flex items-start flex-col w-11/12 mx-auto">
                        <div onClick={() => navigate(`/login`)} className="">Already have an account? <span className='font-bold text-primary underline cursor-pointer '>Login</span></div>
                        <div className="">Back to <span onClick={() => navigate(`/`)} className='cursor-pointer font-bold text-primary '>Home</span></div>
                    </div>
                </form>
            }


            {screen === 2 && 
            <EmailVerification forms={forms} setForms={setForms}/>
            }
        </div>
    )
}

export default SignUp
