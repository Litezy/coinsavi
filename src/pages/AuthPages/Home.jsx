import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { PiHandWithdrawFill } from "react-icons/pi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { formatter } from '../../utils/functions';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const  navigate = useNavigate()
  const alltrnx = [
    {
      type: 'deposit',
      amount: '200',
      date: '22 Feb 2024',
      status: 'completed',
      get desc() {
        return `Your deposit of $${this.amount} is marked as completed, kindly check your balance.`;
      },
      id: 2
    },
    {
      type: 'withdrawal',
      amount: '100',
      date: '20 Feb 2024',
      status: 'pending',
      get desc() {
        return `Your deposit of $${this.amount} is marked as ${this.status}, kindly wait for approval.`;
      },
      id: 3
    },
    {
      type: 'deposit',
      amount: '200',
      date: '20 March 2024',
      status: 'declined',
      get desc() {
        return `Your deposit of $${this.amount} is marked as ${this.status}, kindly check notifications or email to find out more about your failed transaction.`;
      },
      id: 4
    },
    {
      type: 'Plan Purchase',
      amount: '500',
      date: '11 July 2024',
      status: 'completed',
      get desc() {
        return `Your plan purchase of $${this.amount} is marked as ${this.status}, kindly check your balance.`;
      },
      id: 5
    }
  ];
  
  return (
    <DashboardLayout>
      <div className="w-[95%] mx-auto my-2">
        <div className="w-full my-5 px-3 bg-white rounded-lg h-fit py-3 flex gap-3 lg:gap-0 lg:items-center items-start flex-col lg:flex-row justify-between">
          <div className="flex items-center  gap-2 font-bold">
            <FaChevronLeft />
            <div className="">Dashboard Overview</div>
          </div>
          <div className="flex items-center justify-between w-full lg:w-fit gap-5">
            <div onClick={()=> navigate('/dashboard/deposits')} className="flex items-center gap-2 w-1/2 lg:w-fit px-10 py-2 justify-center cursor-pointer rounded-md bg-primary text-white">
              <FaPlus  className='' />
              <div className="">Deposit</div>
            </div>
            <div onClick={()=> navigate('/dashboard/withdraw')} className="flex items-center gap-2 w-1/2 lg:w-fit px-10 py-2 cursor-pointer justify-center rounded-md bg-red-600 text-white">
              <PiHandWithdrawFill />
              <div className="">Withdraw</div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white h-fit py-5  mb-5 rounded-lg px-3 ">
          <div className="flex items-center gap-10 w-full  flex-col lg:flex-row cursor-pointer ">
            <div className="h-48 w-full lg:w-1/2 shadow-lg px-3 py-5 flex items-start flex-col lg:flex-row justify-center ">
              <div className="flex flex-col items-start h-full w-full justify-between gap-5 ">
                <div className="flex items-center gap-5 font-bold">
                  <div className="text-xl">Total Wallet balance</div>
                  <FaChevronRight />
                </div>
                <div className="font-bold text-primary text-4xl">{formatter.format(27000)}.<span className='text-lg'>64</span></div>
                <div className="text-xl font-bold">+11%</div>
              </div>
            </div>

            <div className="h-48 lg:w-1/2 w-full shadow-lg px-3 py-5 flex items-start flex-col gap-5 justify-center ">
              <div className="flex items-center font-bold  justify-between w-full cursor-pointer">
                <div className="text-xl">Latest deposit:</div>
                <div className="text-primary">{formatter.format(200)}</div>
              </div>
              <div className="flex items-center font-bold  justify-between w-full ">
                <div className="text-xl">Invetment Type:</div>
                <div className="">Bronze</div>
              </div>
              <div className="flex items-center font-bold  justify-between w-full ">
                <div className="text-xl">Investment Exp:</div>
                <div className="">22 July 2024</div>
              </div>
            </div>
          </div>
        </div>
 <div className="my-3 font-bold text-2xl">Latest Transactions</div>
        <div class="shadow-md sm:rounded-lg mt-4 bg-primary">
          <table class=" w-full md:text-sm text-[12px] text-left rtl:text-right text-gray-500 ">
            <thead class="text-xs text-center text-white uppercase bg-gray-50 mainbg ">
              <tr>
              <th scope="col" class="md:px-6 px-2 py-3 w-10">
                  Type
                </th>
                <th scope="col" class="md:px-6 px-2 py-3">
                  Date
                </th>
                <th scope="col" class="md:px-6 px-2 py-3 w-8">
                  Amount
                </th>
                <th scope="col" class="md:px-6 px-2 py-3  hidden md:block">
                  Description
                </th>
                <th scope="col" class="md:px-6 px-2 py-3">
                  Status
                </th>

              </tr>
            </thead>
            <tbody>
              {alltrnx.map((item) => (
                <tr class="bg-white border-b-primary border-b md:text-sm dark:bg-white " key={item.id}>
                  <th scope="row" class={`${item.type === 'withdrawal' ? 'text-red-500' : item.type === 'deposit' ? 'text-green-500' : item.type !== 'withdrawal' || item.type !== 'deposit' ? 'text-teal-600' : ''} capitalize px-6 py-4  whitespace-nowrap w-2 font-bold `}>
                    {item.type}
                  </th>
                  <td class=" text-center ">
                    {item.date}
                  </td>
                  <td class="md:px-6 px-2 md:py-4">
                    {formatter.format(item.amount)}
                  </td>
                  <td class="md:px-6 md:py-4  hidden md:block  text-left">
                    {item.desc}
                  </td>
                  <td class={` capitalize  text-center text-sm ${item.status === 'pending' ? 'text-yellow-300 ' : '  text-green-500 '} ${item.status === 'declined' ? ' text-red-500' : ''}  `}>
                    {item.status}
                  </td>

                </tr>
              ))}


            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home