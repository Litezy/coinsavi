import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { formatter } from '../../utils/functions';
import { FaPlus, FaWallet } from 'react-icons/fa6';
import { PiHandWithdrawFill } from 'react-icons/pi';
import { TbTransfer } from "react-icons/tb";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import btc from '../../assets/dashbaord/btc.png'
import eth from '../../assets/dashbaord/eth.png'
import usdt from '../../assets/dashbaord/usdt.png'
import { MdCheckCircle } from "react-icons/md";


const Wallet = () => {
    const [active, setActive] = useState(false)
    const Icon = active ? GoEye : GoEyeClosed

    const wallets = [
        {
            title: 'Bitcoin',
            img: btc,
            symbol: 'btc',
            address: 'tsdhhfzxjdgd83747nhdhhagd97bsgvkjhfhf'
        },
        {
            title: 'Ethereum',
            img: eth,
            symbol: 'eth',
            address: '0xjfhgddhhfzxjdgd83747nhdhhagd97bsgvkjhfhf'
        },
        {
            title: 'Usdt',
            img: usdt,
            symbol: 'usdt',
            address: 'tethersdhhfzxjdgd83747nhdhhagd97bsgvkjhfhf'
        },
    ]
    return (
        <DashboardLayout>
            <div className="w-[95%] mx-auto my-2">
                <div className="w-full my-5 px-3 bg-white rounded-lg h-fit py-3 flex gap-3 lg:gap-0 lg:items-center items-start flex-col lg:flex-row justify-between">
                    <div className="flex items-center  gap-2 font-bold">
                        <FaWallet />
                        <div className="text-xl">Money Management</div>
                    </div>
                    <div className="flex items-center gap-2 w-1/2 lg:w-fit px-2 lg:px-10  py-2 justify-center cursor-pointer bg-sec rounded-md self-center lg:self-end  border text-white">
                        <FaPlus className='' />
                        <div className="">Add Wallet</div>
                    </div>
                </div>
                <div className="h-fit w-full bg-white rounded-lg py-3 px-5 ">
                    <div className="font-bold text-2xl">Wallet</div>
                    <div className="my-3 w-full lg:h-40 rounded-lg bg-primary px-5 py-3 text-white">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="">Total Wallet Balance</div>
                                <Icon onClick={() => setActive(prev => !prev)} className=' cursor-pointer' />
                            </div>
                            <div className="font-bold  text-4xl">{formatter.format(27000)}.<span className='text-lg text-[#c8e1e0]'>64</span></div>
                        </div>
                        <div className="flex w-full justify-between flex-col lg:gap-0 gap-4 lg:flex-row  mt-3 lg:items-center">
                            <div className="flex items-start gap-5">
                                <div className="flex flex-col gap- items-center border-r border-r-light pr-2">
                                    <div className="">Profit/Loss</div>
                                    <div className="font-bold">11%</div>
                                </div>
                                <div className="flex flex-col gap- items-center ">
                                    <div className="">Monthly ROI</div>
                                    <div className="font-bold">4%</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full lg:w-fit gap-5">
                                <div className="flex items-center gap-2 w-1/2 lg:w-fit px-2 lg:px-10  py-2 justify-center cursor-pointer rounded-md bg-white text-black">
                                    <FaPlus className='' />
                                    <div className="">Deposit</div>
                                </div>
                                <div className="flex items-center gap-2 w-1/2 px-2 lg:w-fit lg:px-10 py-2 justify-center cursor-pointer rounded-md bg-white text-black">
                                    <TbTransfer className='' />
                                    <div className="">Transfer</div>
                                </div>
                                <div className="flex items-center gap-2 w-1/2 lg:w-fit px-2 lg:px-10 py-2 cursor-pointer justify-center rounded-md  bg-white font-bold text-black">
                                    <PiHandWithdrawFill />
                                    <div className="">Withdraw</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-3 h-fit w-full bg-white py-3 px-3 rounded-lg">
                    <div className="text-2xl font-bold">My Crypto Wallets</div>
                    <div className="my-3 w-full">
                        {wallets.map((item, i) => {
                            return (
                                <div className="w-full mb-5 flex  items-center lg:gap-5" key={i}>
                                    <div className="" >
                                        <img src={item.img} className='w-16 h-16 rounded-full object-cover' alt="" />
                                    </div>
                                    <div className="flex items-start flex-col">
                                        <div className="flex items-center gap-1">
                                            <div className="">{item.title}</div>
                                            <div className="">({item.symbol})</div>
                                        </div>
                                        <div className="">{item.address}</div>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Wallet