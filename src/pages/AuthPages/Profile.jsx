import React, { useEffect, useRef, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { FaUser, FaUserLarge } from 'react-icons/fa6'
import ceoimg from '../../assets/dashbaord/ceo.jpg'
import { FaEdit } from "react-icons/fa";
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import EmailandPassModal from '../../components/EmailandPassModal';
import { useSelector } from 'react-redux';
import moment from 'moment'
import { Apis, PostApi, profileImg } from '../../services/Apis';
import { errorMessage, successMessage } from '../../utils/functions';
import Loading from '../../components/Loading';

const Profile = () => {

  const [edit, setEdit] = useState(false)
  const [modal, setModal] = useState(false)
  const [reload,setReload]= useState(false)
  const [loading,setLoading] = useState(false)
  const [userimg, setUserImg] = useState({
    img: '',
    image: ''
  })
  const imageRef = useRef(null)
  const emaildiv = useRef(null)
  useEffect(()=>{
    if(emaildiv){
      window.addEventListener('click',e =>{
        if(emaildiv.current !== null && !emaildiv.current.contains(e.target)){
          setModal(false)
        }
      },true)
    }
  },[])

  const profile = useSelector((state) => state.profile.profile);

  const handleProfile = (e) => {
    const file = e.target.files[0]
    if (file.size >= 1000000) {
      imageRef.current.value = null
      return errorMessage('file too large')
    }
    if (!file.type.startsWith(`image/`)) {
      imageRef.current.value = null
      return errorMessage('Invalid file format detected, try with a different photo')
    }
    setUserImg({
      img: URL.createObjectURL(file),
      image: file
    })

  }

  const changeImage = () => {
    if (imageRef.current) {
      imageRef.current.value = ''
    }
    setUserImg({
      img: '',
      image: ''
    })
  }


  const ChangProfileImg = async(e)=>{
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('image', userimg.image)
    formdata.append('email', profile?.email)
    formdata.append('username', profile?.username)
    setLoading(true)
    try {
     const response = await PostApi(Apis.auth.change_img,formdata) 
     if(response.status === 200){
      successMessage(response.msg)
      setEdit(false)
      setReload(prev => !prev)
     }else{
      errorMessage(response.msg)
     }
     
    } catch (error) {
      errorMessage(error.message)
    }finally{
      setLoading(false)
    }
    
  }


  return (
    <DashboardLayout modal={modal} refresh={reload}>
      <div className="w-11/12 mx-auto ">
      {loading && <Loading/>}

        {modal &&
          <div className="absolute top-5 md:top-10 py-8 px-10 right-0 flex items-center justify-center w-full h-screen bg-black/40 backdrop-blur-sm">
            <EmailandPassModal emaildiv={emaildiv} email={true} setModal={setModal}/>

          </div>
        }
        <div className="w-full  px-3 bg-white rounded-lg h-fit py-3 flex gap-3 lg:gap-0 lg:items-center items-start flex-col lg:flex-row justify-between">
          <div className="flex items-center  gap-2 font-bold">
            <FaUser />
            <div className="text-xl">Personal Account</div>
          </div>
          <div onClick={() => setEdit(prev => !prev)} className={`flex items-center gap-2 w-1/2 lg:w-fit px-2 lg:px-10  py-3 justify-center cursor-pointer rounded-md  self-center lg:self-end ${edit ? 'bg-primary text-white' : 'bg-light '} `}>
            {!edit && <FaEdit className='' />}
            <div className="">{edit ? 'Save Changes' : 'Edit Account'}</div>
          </div>
        </div>

        <form className={`w-full flex items-start ${profile?.kyc_status === 'unverified' ? 'lg:h-[83dvh]':'lg:h-[81dvh]'} h-fit my-4   flex-col md:flex-row  gap-5  mt-5 `}>
          <div className="bg-white lg:w-[35%] w-full h-full rounded-lg py-3 px-3">
            <div className="text-xl font-bold">Account Info</div>
            <div className={`my-2 flex items-start w-full  ${edit ? 'justify-between' : 'gap-2'}`}>




             {!edit ? <div className="">
                <img src={profile?.image ? `${profileImg}/profiles/${profile?.image}` : ceoimg } 
                className='w-16 h-16 object-cover rounded-full' alt="coinvista ceo" />
              </div>:
              <label className='relative'>
              {userimg.img ? <img src={userimg.img} className='h-20 w-20 rounded-full object-cover' /> :
                <div className="w-16 h-16 border  rounded-full mx-auto mt-5 flex items-center justify-center cursor-pointer">
                  <input ref={imageRef} type="file" className='hidden' onChange={handleProfile} />
                  <FaUserLarge className="text-2xl" />
                  <FaEdit onClick={changeImage} className='absolute text-dark top-0 right-0 cursor-pointer text-2xl' />
                </div>}

              {userimg.img && <FaEdit onClick={changeImage} className='absolute text-dark -top-5 right-0 cursor-pointer text-2xl' />}
            </label>
              
            
            }





              {!edit && <div className="flex items-start flex-col">
                <div className="font-bold text-lg text-primary">{profile?.firstname}  {profile?.lastname}</div>
                <div className="text-sm">Joined {moment(profile?.createdAt).format('DD MMMM, YYYY')}</div>
              </div>}
              {edit &&
                <div onClick={ChangProfileImg} className="cursor-pointer w-fit px-3 py-2 rounded-lg bg-primary text-white">change photo</div>
              }
            </div>
            <div className="mt-5 w-full  flex items-start gap-4 flex-col">
              <div className="flex items-start w-full flex-col ">
                {!edit && <div className="text-primary font-bold text-[1rem]">Email</div>}
                {edit &&
                  <div className="flex w-full items-center justify-between mb-1">
                    <div className="text-primary font-bold text-[1rem]">Email</div>
                    <div onClick={() => setModal(prev => !prev)} className="flex items-center gap-1 cursor-pointer w-fit px-2 py-1 rounded-lg bg-primary text-white">
                      <FaEdit />
                      <div className="">change email</div>
                    </div>
                  </div>
                }
                <FormInput formtype='email' value={profile?.email} placeholder={`email address`} />
              </div>
              <div className="flex items-start w-full flex-col ">
                <div className="text-primary font-bold text-[1rem]">Phone No.</div>
                <FormInput formtype='email' placeholder={`+234813472644`} value={ profile?.phone} />
              </div>
              <div className="flex items-start w-full flex-col ">
                <div className="text-primary font-bold text-[1rem]">Username</div>
                <FormInput formtype='email' placeholder={`your username`} value={profile?.username} />
              </div>
              <div className="w-full">
                <FormButton bg={`bg-red-200`} h={`h-14`} text={`text-red-500`} title={`Delete Account`} />
              </div>
            </div>
          </div>
          <div className="bg-white lg:w-[65%] h-full rounded-lg py-3 px-3">
            <div className="text-xl font-bold">Personal Information</div>
            <div className="flex mt-3 w-full items-start gap-3 flex-col">
              <div className="flex w-full flex-col lg:flex-row items-start justify-between gap-5">
                <div className="flex items-start  flex-col w-full lg:w-1/2">
                  <div className="text-primary font-bold text-[1rem]">First Name</div>
                  <FormInput placeholder={`First name`}  value={profile?.firstname}/>
                </div>
                <div className="flex items-start flex-col w-full lg:w-1/2">
                  <div className="text-primary font-bold text-[1rem]">Last Name</div>
                  <FormInput placeholder={`Last name`} value={profile?.lastname} />
                </div>
              </div>
              {profile?.kyc_status === 'unverified' && 
              <div className=" text-xs text-red-500 font-bold">Please complete your KYC to complete your profile.</div>
              }
              <div className="flex w-full items-start justify-between gap-5">
                <div className="flex items-start flex-col w-1/2">
                  <div className="text-primary font-bold text-[1rem]">Sex</div>
                  <div className="w-20">
                  <FormInput formtype='sex' placeholder={`M`} />
                  </div>
                </div>
                <div className="flex items-start flex-col w-1/2">
                  <div className="text-primary font-bold text-[1rem]">Birthdate</div>
                  <FormInput placeholder={`choose date`} />
                </div>
              </div>
              <div className="flex items-start flex-col w-full">
                <div className="text-primary font-bold text-[1rem]">Country</div>
                <FormInput />
              </div>
              <div className="flex items-start flex-col w-full">
                <div className="text-primary font-bold text-[1rem]">City</div>
                <FormInput />
              </div>
              <div className="flex items-start flex-col w-full">
                <div className="text-primary font-bold text-[1rem]">Address</div>
                <FormInput />
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout >
  )
}

export default Profile