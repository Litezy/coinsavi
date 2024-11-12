import React, { useEffect, useRef, useState } from 'react'
import { RiCloseLargeFill } from 'react-icons/ri'
import FormButton from './FormButton'
import { BsWalletFill } from 'react-icons/bs'
import { FaArrowLeft, FaPlus } from 'react-icons/fa6'
import { walletsAdd } from '../utils/functions'
import { IoIosCloseCircle } from "react-icons/io";
import Loading from './Loading'

const ExternalWallets = ({ setWallet }) => {
    const [walletsarr, setWalletsArr] = useState([])
    const [selectedWallet, setSelectedWallet] = useState({})
    const [address,setAddress] = useState({
        add:''
    })
    const selectedWal = useRef(null)
    const openWal = useRef(null)
    const [openWallets, setOpenWallets] = useState(false)
    const [openselected, setOpenselected] = useState(false)
    const [loading, setLoading] = useState(false)


     const handleChange =(e)=>{
        setAddress({
            ...address,
            [e.target.name]:e.target.value
        })
     }

    useEffect(() => {
        if (openWal) {
            window.addEventListener('click', e => {
                if (openWal.current !== null && !openWal.current.contains(e.target)) {
                    setOpenWallets(false)
                }
            }, true)
        }
        if (selectedWal) {
            window.addEventListener('click', e => {
                if (selectedWal.current !== null && !selectedWal.current.contains(e.target)) {
                    setOpenselected(false)
                }
            }, true)
        }
    }, [])

    const submitAddress = (e) => {
        e.preventDefault()
        const newData = {
            title:selectedWallet.title,
            img: selectedWallet.img,
            address:address.add
        }
        setWalletsArr((prevWallets) => [...prevWallets, newData]);
        setAddress({
            add:''
        })
        setOpenWallets(false)
        setOpenselected(false)
        // console.log(newData)
        setLoading(true)
        setTimeout(() => {
            setLoading(false) 
        }, 3000)
    }


    const deleteWallet =(index) =>{
        setWalletsArr((prevWallets) =>{
            return prevWallets.filter((wallet,index1) => index1 !== index)
        })
    }
    return (
        <div className={`w-full ${openWallets && 'relative h-[90dvh]'} `}>

            {loading &&
                <div className="w-full bg-white h-screen flex flex-col items-center justify-center rounded-lg">
                    <Loading />
                    <div className="text-center italic">...saving address</div>
                </div>
            }
           {!loading && !openWallets && <FaArrowLeft onClick={() => setWallet(0)} className='cursor-pointer text-xl' />}
            {openWallets &&
                <div className="w-full h-full absolute lg:bg-black/40 rounded-lg flex items-center justify-center">
                    <div ref={openWal} className="lg:w-3/4 mx-auto w-full bg-white h-fit py-3 rounded-lg ">
                        <div className="flex w-full justify-between items-center px-3">
                            <div className="text-xl font-bold">Add External Address</div>
                            <RiCloseLargeFill onClick={() => setOpenWallets(false)} className='text-2xl cursor-pointer' />
                        </div>
                        <hr className='my-5 bg-gray' />
                        <div className="w-11/12 mx-auto ">
                            <div className="text-primary font-bold mb-1">Select wallet</div>
                            <div className="overflow-y-auto max-h-72 py-3 relative">
                                {walletsAdd.map((item, i) => (
                                    <div onClick={() => { setSelectedWallet(item), setOpenselected(true), setOpenWallets(false) }} className="w-full h-fit cursor-pointer flex items-center gap-3 border-b py-2 mb-4 " key={i}>
                                        <img src={item.img} className='h-14 w-14 bg-cover rounded-full' alt="" />
                                        <div className="">{item.title}</div>
                                    </div>
                                ))}

                            </div>
                            <div className=" lg:mt-16 mt-5">
                                <FormButton bg={`bg-primary`} h={`h-10`} text={`text-white`} title={`Save Changes`} />
                            </div>
                        </div>
                    </div>
                </div>
            }

            {openselected &&
                <div className="lg:w-3/4 w-full left-1/2 -translate-x-1/2 rounded-lg absolute top-1/2 right-0 bg-black/40 h-72  py-5 px-5">
                    <form onSubmit={submitAddress} ref={selectedWal} className=" lg:w-5/6 w-[100%]  mx-auto px-3 py-4 flex items-center flex-col justify-center bg-white rounded-lg h-full cursor-pointer">

                        <div className="w-full justify-between flex items-center gap-3 py-2 mb-4">
                            <div className="flex items-center flex-col lg:flex-row gap-2 lg:w-2/4 w-[20%]">
                                <img src={selectedWallet.img} className='h-14 w-14 bg-cover rounded-full' alt="" />
                                <div className="">{selectedWallet.title}</div>  </div>

                            <div className="flex flex-col items-end lg:w-3/4 w-[80%] ">
                                <div className="text-primary font-semibold">paste address</div>
                                <input name='add' value={address.add} onChange={handleChange} type="text" className='text-sm border w-[100%] h-10 rounded-lg bg-gray outline-none pl-2' placeholder='enter address' />
                            </div>

                        </div>

                        <FormButton title={`Save Address`} text={`bg-primary text-white h-10`} />
                    </form>
                </div>
            }
            {!loading &&
                <>
                    <div className="w-full my-5 px-3 bg-white rounded-lg h-fit py-3 flex gap-3 lg:gap-0 lg:items-center items-start flex-col lg:flex-row justify-between">
                        <div className="flex items-center  gap-2 font-bold">
                            <BsWalletFill className='text-xl' />
                            <div className="text-xl">Manage Crypto Wallets</div>
                        </div>
                        <div onClick={() => setOpenWallets(true)} className="flex items-center gap-2 w-1/2 lg:w-fit px-2 lg:px-10  py-2 justify-center cursor-pointer rounded-md self-center lg:self-end  border text-primary">
                            <FaPlus className='' />
                            <div className="">Add External Wallet</div>
                        </div>
                    </div>

                    <div className="w-full flex items-start px-5 bg-white h-fit py-5 rounded-lg flex-col gap-5 my-5">
                        <div className="text-xl font-bold text-primary">My External Wallets</div>
                        <div class="shadow-md rounded-lg mt-4 bg-primary w-full overflow-x-auto">
                            <table class=" w-full overflow-x-auto md:text-sm text-[12px] text-left rtl:text-right text-gray-500 ">
                                <thead class="text-xs text-center text-white uppercase bg-gray-50 mainbg ">
                                    <tr>
                                        <th scope="col" class="md:px-6 px-2 py-3 w-10">
                                            S/N
                                        </th>
                                        <th scope="col" class="px-6">
                                            Image
                                        </th>
                                        <th scope="col" class="px-6 text-start">
                                            Name
                                        </th>
                                        <th scope="col" class="px-10  text-start">
                                            Address
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {walletsarr.length > 0 && walletsarr.map((item, i) => (
                                        <tr class="bg-white border-b-primary border-b md:text-sm dark:bg-white " key={item.id}>
                                            <th scope="row" class={` text-center`}>
                                                {i + 1}
                                            </th>
                                            <td class=" flex items-center justify-center ">
                                                <img src={item.img} className='h-14 w-14 bg-cover rounded-full' alt="" />
                                            </td>
                                            <td class="px-6 text-start ">
                                                {item.title}
                                            </td>
                                            <td class="w-2/4  px-10 text-start ">
                                                {item.address}
                                            </td>
                                            <td class="">
                                                <IoIosCloseCircle onClick={()=>deleteWallet(i)} className='text-3xl cursor-pointer text-red-600'/>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {walletsarr.length === 0 &&
                            <div className="w-full text-center text-xl font-bold">No wallets added</div>
                        }
                    </div>
                </>
            }

        </div>
    )
}

export default ExternalWallets

