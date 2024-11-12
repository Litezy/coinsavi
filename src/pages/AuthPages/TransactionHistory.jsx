import React, { useEffect, useRef, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { alltransactions, formatter } from '../../utils/functions'
import { GoArrowRight } from "react-icons/go";
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownLeft } from "react-icons/go";
import { IoCloudDownload } from 'react-icons/io5';


const TransactionHistory = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const modalDiv = useRef(null)
  const recordsPerPage = 5;
  let lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const records = alltransactions.slice(firstIndex, lastIndex)
  const npage = Math.ceil(alltransactions.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1);

  if (records.length === 0) {
    firstIndex = 0
  }
  if (firstIndex === 0) {
    firstIndex = 1
  }

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const changeCurrentPage = (id, e) => {
    e.preventDefault()
    setCurrentPage(id)
  }
  const [modal, setModal] = useState(false)
  const [selected, setSelected] = useState({})

  const selectItem = (index) => {
    setModal(true)
    setSelected(index)
  }


  useEffect(()=>{
    if (modalDiv) {
      window.addEventListener('click', e => {
          if (modalDiv.current !== null && !modalDiv.current.contains(e.target)) {
              setModal(false)
          }
      }, true)
  }
  },[])
  return (
    <DashboardLayout modal={modal}>
      <div className={` lg:w-11/12  px-2 mx-auto `}>
        {modal &&
          <div className="absolute top-0 py-8 px-10 right-0 flex items-center justify-center w-full h-screen bg-black/40 backdrop-blur-sm">
            <div ref={modalDiv} className="lg:w-3/4 bg-white h-fit py-3 rounded-lg px-3">
            <div className="my-3 text-center font-bold">More Details</div>
            <div className="flex w-full items-center flex-col gap-2 ">
              <div className="justify-between flex items-center w-full">
                <div className="font-bold">Transaction Type:</div>
                <div className={`${selected.type === 'deposit' ?'text-green-500': selected.type === 'withdrawal' ?'text-red-500':'text-zinc-600'} font-bold capitalize`}>{selected.type}</div>
              </div>
              <div className="justify-between flex items-center w-full">
                <div className="font-bold">Transaction Amount:</div>
                <div className={`${selected.type === 'deposit' ?'text-green-500': selected.type === 'withdrawal' ?'text-red-500':'text-zinc-600'}  capitalize font-bold`}>{formatter.format(selected.amount)}</div>
              </div>
              <div className="justify-between flex items-center w-full">
                <div className="font-bold">Transaction Description:</div>
                <div className=" text-sm text-right capitalize">{selected.desc}</div>
              </div>
              <div className="justify-between flex items-center w-full">
                <div className="font-bold">Transaction Date:</div>
                <div className="  capitalize">{selected.date}</div>
              </div>
              <div className="justify-between flex items-center w-full">
                <div className="font-bold"> Wallet Address:</div>
                <div className="  capitalize">0xdhkfiry6352kfot80033947736</div>
              </div>
            </div>
            </div>
          </div>
        }
        <div className="bg-white w-full rounded-lg h-fit  py-5 px-5">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">Transaction History</div>
            <div className="flex items-center gap-1 w-fit px-3 py-2 rounded-md border-2 text-primary hover:text-white hover:bg-primary border-primary ">
              <IoCloudDownload />
              <button>Download</button>
            </div>
          </div>

          <div className="flex items-start flex-col gap-5">
            {records.map((item, i) => {

              return (
                <>
                  <hr className='w-full mt-3 border-black' />
                  <div onClick={() => selectItem(item)} className="w-full flex items-center cursor-pointer justify-between" key={i}>
                    <div className="flex items-center gap-2">
                      <div className="w-fit px-4 py-4 rounded-full bg-gray">
                       {item.type !== 'deposit' && item.type !== 'withdrawal' && <GoArrowRight className='text-blue-500' />}
                       {item.type === 'withdrawal' && <GoArrowUpRight className='text-red-500 font-bold text-xl'/>}
                       {item.type === 'deposit' && <GoArrowDownLeft className='text-green-500 font-bold text-xl'/>}
                      </div>
                      <div className="flex flex-col ">
                        <div className="capitalize font-bold">{item.type}</div>
                        <div className="flex items-center gap-1">
                          <div className="">{item.date}</div>
                          <div className="w-1 h-1 bg-primary rounded-full"></div>
                          <div className="">Sun</div>
                        </div>
                      </div>
                    </div>

                    <div className={` font-bold ${item.type === 'deposit' ? 'text-green-500' : item.type === 'withdrawal' ? 'text-red-500' : 'text-primary'}`}>{formatter.format(item.amount.toLocaleString())}</div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
        <div className="w-fit ml-auto my-3 bg-white px-5 py-3 rounded-lg">
          <div class="w-full flex flex-col items-center  ">
            <span class="text-sm ">
              Showing <span class="font-bold  text-black">{firstIndex}</span> to
              <span class="font-bold text-black "> {lastIndex > alltransactions.length ? alltransactions.length : lastIndex}</span> of
              <span class="font-bold text-black "> {alltransactions.length} </span>
              Transactions
            </span>

            <div class=" flex items-center gap-4 mt-2 xs:mt-0">
              <button onClick={prevPage} class="flex items-center justify-center px-4 h-10 text-base font-medium bg-primary rounded-lg text-white "> Prev</button>

              {numbers.map((n, i) => (
                <div className={``} key={i}>
                  <a onClick={(e) => changeCurrentPage(n, e)} href="#" className={`flex items-center justify-center px-2 py-1 leading-tight rounded-full  
                      ${currentPage === n ? 'bg-primary  text-white' : 'bg-light'}`}>{n}</a>
                </div>
              ))}
              <button onClick={nextPage} class="flex items-center justify-center px-4 h-10 text-base font-medium bg-primary rounded-lg text-white   ">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default TransactionHistory