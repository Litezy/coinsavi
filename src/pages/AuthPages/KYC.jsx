import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import Loading from '../../components/Loading';
import { FaEdit } from 'react-icons/fa';
import { errorMessage, successMessage } from '../../utils/functions';
import FormButton from '../../components/FormButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const KYC = ({screen}) => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        kyc_status:'unverified'
    })

    // const fetchUser = useCallback(async () => {
    //     setLoading(true)
    //     try {
    //         const response = await GetApi(Apis.auth.profile)
    //         if (response.status === 200) {
    //             setData(response.data)
    //         } else {
    //             errorMessage(error.message)
    //         }

    //     } catch (error) {
    //         errorMessage(error.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }, [])


    // useEffect(() => {
    //     fetchUser()
    // }, [])


    const frontRef = useRef()
    const backRef = useRef()
    const [forms, setForms] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        marital: '',
        address: '',
        city: '',
        country: '',
        dob: new Date(),
        id_type: '',
        zip: '',
        id_number: ''
    })
    const [frontimg, setfrontImg] = useState({
        img: null,
        image: null
    })
    const [backimg, setbackImg] = useState({
        img: null,
        image: null
    })

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    const checkdob = () => {
        console.log(
            forms.dob
        )
    }

    const handleImageFront = (e) => {
        const file = e.target.files[0]
        setfrontImg({
            img: URL.createObjectURL(file),
            image: file
        })
    }
    const handleImageBack = (e) => {
        const file = e.target.files[0]
        setbackImg({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const changeImageback = (e) => {
        setbackImg({
            img: e.target.src,
            image: null
        })
    }
    const changeImagefront = (e) => {
        setfrontImg({
            img: e.target.src,
            image: null
        })
    }


    const handledob =  (date)=>{
        setForms({
            ...forms,
            dob: date
        })
    }
    const submitForm = async (e) => {
        e.preventDefault()
        console.log(forms, frontimg.image, backimg.image)
        if (!forms.firstname) return errorMessage("Firstname field can't be empty")
        if (!forms.lastname) return errorMessage("Lastname field is required")
        if (!forms.gender) return errorMessage("Gender field can't be empty")
        if (!forms.marital) return errorMessage("Marital status is required")
        if (!forms.dob) return errorMessage("Date of birth is required")
        if (!forms.address) return errorMessage("Adress is required")
        if (!forms.city) return errorMessage("Adress status is required")
        if (!forms.zip) return errorMessage("Zip code is required")
        if (!forms.country) return errorMessage("Country  is required")
        if (!forms.id_type) return errorMessage("ID card type is required")
        if (!forms.id_number) return errorMessage("ID card number is required")


        if (frontimg.image === null) return errorMessage('ID front image is required')
        if (backimg.image === null) return errorMessage('ID back image is required')

        const formdata = new FormData()
        formdata.append('frontimg', frontimg.image)
        formdata.append('backimg', backimg.image)
        formdata.append('firstname', forms.firstname)
        formdata.append('lastname', forms.lastname)
        formdata.append('dob', forms.dob)
        formdata.append('marital', forms.marital)
        formdata.append('gender', forms.gender)
        formdata.append('zip', forms.zip)
        formdata.append('address', forms.address)
        formdata.append('city', forms.city)
        formdata.append('country', forms.country)
        formdata.append('id_number', forms.id_number)
        formdata.append('id_type', forms.id_type)

        setLoading(true)
        try {
            const response = await PostApi(Apis.kyc, formdata)
            if (response.status === 200) {
                successMessage(response.msg)
                await fetchUser()
            } else {
                errorMessage(`${response.msg}`)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }


    const [width, setWidth] = useState('0%');
    useEffect(() => {
        if (data.kyc_status === 'verified') {
            setWidth('100%');
        }
        if (data.kyc_status === 'submitted') {
            setWidth('50%');
        }
        if(data.kyc_status === 'unverified'){
            setWidth('05%');
        }
    }, [data.kyc_status]);
  return (
   <div className="">
    <FaArrowLeft onClick={()=> screen(0)} className='cursor-pointer text-xl'/>

    <div className='w-full h-full '>
            
            <div className="w-11/12 mx-auto ">
                <h1 className='mb-2 capitalize text-2xl font-bold'>{data.kyc_status === 'unverified'?'Upload KYC Information' :data.kyc_status === 'submitted' ?'Track Your KYC review progress':'KYC Approved'}</h1>
                <div className={`w-full bg-white rounded-full h-3 `}>
                    <div className={`${data.kyc_status !== 'verified' ? 'bg-primary' : "mainbg"}  h-2.5 rounded-full`} style={{ width }}></div>
                </div>
                <div className="flex w-full items-center justify-between mt-2 text-sm">
                    <p className={`${data.kyc_status === 'unverified' ? 'text-primary font-bold' : "b]"}`}>Not Submitted</p>
                    <p className={`${data.kyc_status === 'submitted' ? 'text-primary font-bold' : ""}`}>Submitted</p>
                    <p className={`${data.kyc_status === 'verified' ? 'text-green-500 font-bold' : ""}`}>Approved</p>
                </div>
            </div>
            {data?.kyc_status === 'unverified' &&
                <>
                    <div className=" w-full">
                        {loading && <Loading />}
                        <div className="mt-5 h-fit shadow-md rounded-md text-sm bg-[white] py-5 px-4">
                            <form onSubmit={submitForm} className="md:flex md:items-baseline gap-5 w-full ">
                                <div className="md:w-1/2">
                                    <div className="flex flex-col w-full  ">
                                        <h1>First Name:</h1>
                                        <input name='firstname' value={forms.firstname} onChange={handleChange} type="text" className='w-full outline-none border-b h-8' />
                                    </div>
                                    <div className="flex flex-col w-full mt-3  ">
                                        <h1>Last Name:</h1>
                                        <input name='lastname' value={forms.lastname} onChange={handleChange} type="text" className='w-full outline-none border-b h-8' />
                                    </div>
                                    <div className="flex flex-col w-full mt-3 ">
                                        <h1 className='mb-2'>Gender:</h1>
                                        <select name="gender" onChange={handleChange} value={forms.gender} id="" className='border-b w-1/2 outline-none' >
                                            <option >--select--</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col w-full mt-5 ">
                                        <h1 className='mb-2'>Marital Status:</h1>
                                        <select name="marital" onChange={handleChange} value={forms.marital} id="" className='border-b w-1/2 outline-none'>
                                            <option >--select--</option>
                                            <option value="single">Single</option>
                                            <option value="married">Married</option>
                                            <option value="divorced">Divorced</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col w-full mt-5  ">
                                        <h1 onClick={checkdob}>Date of Birth</h1>
                                      <DatePicker className='border sticky px-3 py-2 rounded-md '
                                      selected={forms.dob}
                                      onChange={(date)=>handledob(date)}
                                      showYearDropdown
                                      scrollableMonthYearDropdown
                                      dateFormat={`dd/MM/yyyy`}
                                      maxDate={new Date()}
                                      />
                                    </div>
                                    <div className="flex flex-col w-full mt-3  ">
                                        <h1>Address:</h1>
                                        <input name='address' value={forms.address} onChange={handleChange} type="text" className='w-full outline-none border-b h-8 overflow-x-auto' />
                                    </div>
                                    <div className="flex flex-col w-full mt-3  ">
                                        <h1>City:</h1>
                                        <input name='city' value={forms.city} onChange={handleChange} type="text" className='w-full outline-none border-b h-8 overflow-x-auto' />
                                    </div>
                                    <div className="flex flex-col w-full mt-3  ">
                                        <h1>Zip Code:</h1>
                                        <input name='zip' value={forms.zip} onChange={handleChange} type="text" className='w-full outline-none border-b h-8 overflow-x-auto' />
                                    </div>
                                    <div className="flex flex-col w-full mt-3  ">
                                        <h1>Country:</h1>
                                        <input name='country' value={forms.country} onChange={handleChange} type="text" className='w-full outline-none border-b h-8 overflow-x-auto' />
                                    </div>
                                </div>
                                <div className="md:w-1/2  h-full">
                                    <div className="flex flex-col w-full  ">
                                        <h1 className="">Government Issued ID:</h1>
                                        <select name="id_type" onChange={handleChange} value={forms.id_type} className='border-b w-full outline-none mt-3'>
                                            <option >--select--</option>
                                            <option value="driver's license/state ID">Driver's License/State ID</option>
                                            <option value="Passport">Passport/Passport ID</option>
                                            <option value="social security card">Social Security Card</option>
                                            <option value="national id">National ID</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col w-full mt-3  ">
                                        <h1>ID Number:</h1>
                                        <input name='id_number' value={forms.id_number} onChange={handleChange} type="text" className='w-full outline-none border-b h-8 overflow-x-auto' />
                                    </div>
                                    <div className="mt-5 ">
                                        <h1 className='text-center text-lg font-bold'>Upload Front ID Image</h1>

                                        <div className="md:h-60 h-48  w-11/12 mx-auto ">
                                            <label className={`${frontimg.img ? '' : 'border-2 border-black'} mt-5 w-full  h-full border-dashed flex cursor-pointer items-center justify-center `}>
                                                {frontimg.img ? <div className="">
                                                    <div onChange={changeImagefront} className="absolute top-0 right-3 main font-bold ">
                                                        <FaEdit className='text-2xl' />
                                                    </div>
                                                    <img src={frontimg.img} className='w-full h-48' />
                                                </div> : <FaPlus className='text-2xl' />}
                                                <input type="file" onChange={handleImageFront} hidden ref={frontRef} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mt-5 ">
                                        <h1 className='text-center text-lg font-bold'>Upload Back ID Image</h1>

                                        <div className="md:h-60 h-48 w-11/12 mx-auto ">
                                            <label className={`${backimg.img ? '' : 'border-2 border-black border-dashed'} mt-5 w-full h-full  flex cursor-pointer items-center justify-center `}>
                                                {backimg.img ? <div className="">
                                                    <div onChange={changeImageback} className="absolute top-0 right-3 main font-bold ">
                                                        <FaEdit className='text-2xl' />
                                                    </div>
                                                    <img src={backimg.img} className='w-full h-48' />
                                                </div> : <FaPlus className='text-2xl' />}
                                                <input type="file" onChange={handleImageBack} hidden ref={backRef} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="my-4">
                                    <FormButton bg={`bg-primary h-10 text-white text-xl`} title={`Submit Details`}  />
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </>}
            {data.kyc_status === 'verified' &&
                <>
                    <div className="h-screen">
                        <div className="flex mt-5 md:mt-0 items-center justify-center h-3/4 shadow-lg bg-white w-11/12 mx-auto rounded-md">
                            <div className="px-4 flex flex-col">
                                <h1 className='text-center md:text-xl'>Congratulations, You have passed your KYC.</h1>
                                <img src={kycpassed} className='w-96 mx-auto' alt="" />
                            </div>
                        </div>
                    </div>
                </>
            }
            {data.kyc_status === 'submitted' &&
                <>
                    <div className="h-screen mt-8">
                        <div className="flex mt-5 md:mt-0 items-center justify-center h-3/4 shadow-lg bg-white w-11/12 mx-auto rounded-md">
                            <div className="px-4 flex flex-col">
                                <h1 className='md:text-center md:text-xl'>Kindly wait for your KYC submission to be approved.</h1>
                                <p className='md:text-center text-sm'>This usually takes about 3-5 working days.</p>
                                <img src={pendingkyc} className='w-96 mx-auto' alt="" />
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
   </div>
  )
}

export default KYC