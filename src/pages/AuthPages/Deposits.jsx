import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import QRCode from "react-qr-code";
import moment from 'moment';
import { BsWalletFill } from 'react-icons/bs';
import { FaPlus, FaRegCopy } from 'react-icons/fa6';
import { errorMessage, successMessage } from '../../utils/functions';
import { useSearchParams } from 'react-router-dom';

const Deposits = ({}) => {
  const [screen, setScreen] = useState(1)
  const [walletid, setWalletid] = useState(null)
  const [value, setValue] = useState(null)
  const [titles, setTitles] = useState(null)
  const [alldeposits, setAlldeposits] = useState([])
  const [loading, setLoading] = useState(false)
  const [deposit, setDeposit] = useState({
    amount: '',
    txid: ''
  })


  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        successMessage('Address copied to clipboard')
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleChange = (e) => {
    setDeposit({
      ...deposit,
      [e.target.name]: e.target.value
    })
  }

  const selectCrypto = (e) => {
    setWalletid(e.target.value)
    setValue(e.target.selectedOptions[0].id)
    setTitles(e.target.selectedOptions[0].title)
  }
  const validateAmount = () => {
    if (walletid === null || !walletid) return errorMessage('please select a crypto currency')
    if (!deposit.amount) return errorMessage('Please enter an amount')
    if (deposit.amount <= 0) return errorMessage('Please enter a positive number')
    setScreen(2)
  }




  return (
    <DashboardLayout>
      <div className=" w-11/12 mx-auto  ">
        <div className="w-full my-5 px-3 bg-white rounded-lg h-fit py-3 flex gap-3 lg:gap-0 lg:items-center items-start flex-col lg:flex-row justify-between">
          <div className="flex items-center  gap-2 font-bold">
            <BsWalletFill className='text-xl' />
            <div className="text-xl">Manage Deposits</div>
          </div>
          {/* <div className="flex items-center gap-2 w-1/2 lg:w-fit px-2 lg:px-10  py-2 justify-center cursor-pointer rounded-md self-center lg:self-end  border text-primary">
            <FaPlus className='' />
            <div className="">Add Funds</div>
          </div> */}
        </div>
        <div className="flex  rounded-md h-fit pb-4 items-start justify-start ">
          {screen === 1 && <>
            <div className="mt-2  w-full">
              <div className=" bg-white py-5 rounded-lg">
                <h1 className='text-2xl text-center font-bold'>Initate A Deposit</h1>
                <form className='w-11/12 mx-auto mt-4' >
                  <h3 className='mb-5 main font-bold'>Select Crypto Currency</h3>
                  <select id='selected' onChange={selectCrypto} className='w-full outline-none border-b-2'>
                    <option >--select--</option>
                    <option id='0x3B05d310402c17ecd9C8050dFf8034AF61c563F2btc' value="Bitcoin" title='BTC'>Bitcoin</option>
                    <option id='0x9381E721415E61eB86E3AD247AAcF36Cf69CeACFeth' value="Ethereum" title='ETH'>Ethereum</option>
                    <option id='0xcFC7269251A2f2DF3FA583E4ec1fF71262a6Ea63xrp' value="Ripple" title='XRP'>Ripple</option>
                    <option id='0xcFC7269251A2f2DF3FA583E4ec1fF71262a6Ea63doge' value="Tether" title='USDT'>USDT</option>
                  </select>
                  <h3 className='my-5 main font-bold'>Amount to deposit ($)</h3>
                  <input type="number" name={'amount'} value={deposit.amount} min={0} onChange={handleChange} className='w-full outline-none border-b-2' />
                  <div className="w-fit ml-auto">
                    <button type='button' onClick={validateAmount} className=' text-white bg-primary px-10 mt-3 py-2 rounded-md'>Next</button>
                  </div>
                </form>

              </div>
              <div className="mt-5">
                <h1 className='font-bold text-xl'>Latest Deposits</h1>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-primary">
                  <table class="w-full md:text-sm text-[12px] text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-center text-white uppercase bg-gray-50 mainbg ">
                      <tr>
                        <th scope="col" class="md:px-6 px-2 py-3 w-10">
                          Type
                        </th>
                        <th scope="col" class="md:px-6 px-2 py-3 ">
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
                      {alldeposits && alldeposits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5).map((item) => (
                        <tr class="bg-white border-b " key={item.id}>
                          <th scope="row" class={` capitalize ${item.type === 'deposit' ? 'text-green-500 font-bold ' : 'text-red-500 font-bold '} capitalize px-6 py-4 font-medium  whitespace-nowrap `}>
                            {item.type}
                          </th>
                          <td class="text-center ">
                            {moment(item.createdAt).format('DD MMMM YYYY hh:mm A')}
                          </td>
                          <td class="text-center">
                            {formatter.format(item.amount)}
                          </td>
                          <td class="md:px-6 md:py-4 text-left  hidden md:block  ">
                            {item.message}
                          </td>
                          <td class={` capitalize  text-center ${item.status === 'pending' ? 'text-yellow-300 ' : 'px-2  text-green-500 '} ${item.status === 'declined' ? ' text-red-500' : ''}  rounded-md mx-auto`}>
                            {item.status}
                          </td>

                        </tr>
                      ))}


                    </tbody>
                  </table>
                </div>

              </div>
            </div>

          </>}
          {screen === 2 && <>
            <div className=" w-full bg-white rounded-lg">
              <div className="text-center">
                <h1 className='text-2xl font-bold text-primary'>Complete Your Deposit</h1>

                <p className='md:text-lg text-sm text-center   md:ml-0'>Scan the QR code below or copy and paste the official company's <span className='main'>{walletid}</span> wallet address</p>
              </div>
              <div className="flex w-3/4 my-4 justify-between  mx-auto flex-col md:flex-row gap-5 md:gap-0">
                <div className="  h-20 lg:w-48">
                  <h2 className='text-center text-primary font-bold'>Deposit Summary</h2>
                  <div className="flex items-center justify-between">
                    <h3>Currency:</h3>
                    <h3>{walletid}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3>Amount:</h3>
                    <h3>{deposit.amount}</h3>
                  </div>
                </div>
                <div className="lg:w-1/2  flex flex-col items-center">
                {value && <QRCode value={value} />}
                <p className='md:text-xl mt-3 text-black text-center'>{walletid} ({titles}) Address</p>
                <div className=" mx-auto flex items-center border rounded-lg border-primary px-5 relative ">
                  <input type="text" value={value.slice(0,19)} className='w-full text-[1rem] md:text-  h-12 outline-none font-bold ' />
                  <FaRegCopy onClick={copyToClipboard} className='md:text-xl absolute main cursor-pointer right-2 top-2 text-primary ' />
                </div>
              </div>
              </div>

              <div className="flex w-11/12 mx-auto mb-5 items-center justify-between mt-2">
                <button onClick={() => setScreen(1)} className='px-5 py-1 bg-black text-white rounded-full'>change address</button>
                <button onClick={() => setScreen(3)} className='px-5 py-1 bg-primary text-white rounded-full'>continue</button>
              </div>
            </div>
          </>}
          {screen === 3 && <>
            <div className="w-full h-fit py-10 bg-white flex items-center flex-col justify-center">
              <div className="text-center">
                <h1 className='text-2xl font-bold text-pretty text-primary'>Submit Your ID</h1>
                <p>Kindly submit your deposit transaction ID for verification</p>
              </div>
              <div className="flex gap-5 mt-4 flex-col items-center mx-auto w-full">
                <p className='text-2xl mt-3 text-black text-center'>{walletid} ({titles}) </p>
              </div>
              <div className="w-3/6 mx-auto  flex flex-col  justify-center">
                <h2>Transaction ID:</h2>
                <input type="text" name='txid' placeholder='TXID*******' value={deposit.txid} className='w-full border  h-12 outline-none  pl-3 rounded-md ' onChange={handleChange} />
              </div>
              <div className="w-11/12 mx-auto justify-between mt-5 flex items-center">
                <button onClick={() => setScreen(2)} className='px-5 py-1 bg-black text-white rounded-full'>back</button>
                <button className='px-5 py-1  text-white bg-primary rounded-full'>Submit</button>
              </div>

            </div>
          </>}
        </div>
      </div>









    </DashboardLayout>
  )
}

export default Deposits