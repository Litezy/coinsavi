import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import moment from 'moment';
import Loading from '../../components/Loading';
import { errorMessage, formatter } from '../../utils/functions';
import { BiSolidWalletAlt } from 'react-icons/bi';



const Withdrawals = () => {
  const [screen, setScreen] = useState(1)
  const [walletid, setWalletid] = useState(null)
  const [balance, setbalance] = useState([])
  const [allwithdraws, setAllWithdraws] = useState([])
  const [loading, setLoading] = useState(false)
  const [withdraw, setWithdraw] = useState({
    amount: '',
    txid: '',
    address: ''
  })




  const handleChange = (e) => {
    setWithdraw({
      ...withdraw,
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
    if (!withdraw.address) return errorMessage('please provide your wallet address')
    if (!withdraw.amount) return errorMessage('Please enter an amount')
    if (withdraw.amount <= 0) return errorMessage('Please enter a positive number')
    setScreen(2)
  }

  const Clear = () => {
    setScreen(1)
    setWithdraw({
      ...withdraw,
      amount: '',
      txid: '',
      address: ''
    })
  }

  return (
    <DashboardLayout >
      <div className="w-11/12 mx-auto pb-4 ">
        <div className="w-full my-2 px-3 bg-white rounded-lg h-fit py-3 flex gap-3 lg:gap-0 lg:items-center items-start flex-col lg:flex-row justify-between">
          <div className="flex items-center  gap-2 font-bold">
            <BiSolidWalletAlt className='text-xl' />
            <div className="text-xl">Manage Withdrawals</div>
          </div>
        </div>
        <div className="flex  mx-auto rounded-md h-fit pb-4 items-start justify-start ">
          {screen === 1 && <>
            <div className="mt-5  w-full">
              <div className=" bg-white py-5 rounded-lg">
                <h1 className='text-2xl text-center text-primary font-bold'>Initate A Withdrawal</h1>
                <form className='w-11/12 mx-auto mt-4' >
                  <h3 className='mb-5 main font-bold'>Select Crypto Currency</h3>
                  <select id='selected' onChange={selectCrypto} className='w-full outline-none border-b-2'>
                    <option >--select--</option>
                    <option value="Bitcoin" title='BTC'>Bitcoin</option>
                    <option value="Ethereum" title='ETH'>Ethereum</option>
                    <option value="Ripple" title='XRP'>Ripple</option>
                    <option value="Tether" title='USDT'>Dogecoin</option>
                  </select>
                  <h3 className='my-5 main font-bold'>External Wallet Address</h3>
                  <input type="text" name={'address'} value={withdraw.address} min={0} onChange={handleChange} className='w-full outline-none border-b-2' />
                  <h3 className='my-5 main font-bold'>Amount to withdraw ($)</h3>
                  <input type="number" name={'amount'} value={withdraw.amount} min={0} onChange={handleChange} className='w-full outline-none border-b-2' />
                  <div className="w-fit ml-auto">
                    <button type='button' onClick={validateAmount} className='bg-primary text-white px-10 mt-3 py-2 rounded-md'>Next</button>
                  </div>
                </form>

              </div>
              <div className="mt-5 w-full">
                <h1 className='font-bold text-xl ml-2 text-primary'>Latest Withdrawals</h1>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-primary">
                  <table class="w-full md:text-sm text-[12px] text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-center text-white uppercase bg-gray-50 mainbg ">
                      <tr>
                        <th scope="col" class="md:px-6 py-3 w-10">
                          Type
                        </th>
                        <th scope="col" class="md:px-6 px-2 py-3 ">
                          Date
                        </th>
                        <th scope="col" class="md:px-6 px-2 py-3 ">
                          Amount
                        </th>
                        <th scope="col" class="md:px-6 px-2 py-3 hidden md:block">
                          Description
                        </th>
                        <th scope="col" class="md:px-6 px-2 py-3">
                          Status
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      {allwithdraws.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10).map((item) => (
                        <tr class="bg-white border-b  " key={item.id}>
                          <th scope="row" class={`${item.type === 'withdrawal' ? 'text-red-500' : ''} ${item.type !== 'withdrawal' ? 'text-teal-500' : ''}  capitalize px-6 py-4 font-medium  whitespace-nowrap `}>
                            {item.type}
                          </th>
                          <td class="text-center text-xs">
                            {moment(item.createdAt).format('DD MMMM YYYY hh:mm A')}
                          </td>
                          <td class="text-center">
                            {formatter.format(item.amount)}
                          </td>
                          <td class="md:px-6 md:py-4 hidden md:block text-left">
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
            <div className=" w-11/12 mx-auto bg-white rounded-lg py-5 relative overflow-hidden">
              {loading && <Loading />}
              <div className="text-center h-fit flex  flex-col items-center justify-center ">
                <h1 className='text-2xl font-bold text-primary'>Review Your Request</h1>
                <div className=" font-bold text-xl my-3">Account Balance: {formatter.format(100)}</div>
                <div className="mt-10">
                  <h1 className='font-bold main underline text-lg'>Summary</h1>
                  <div className="flex flex-col items-center gap-5 w-full ">
                    <div className="flex items-center justify-start w-3/4 mx-auto gap-2">
                      <h1 className='font-bold text-primary'>Crypto Wallet: </h1>
                      <p>{walletid}</p>
                    </div>
                    <div className="flex items-center justify-start w-3/4 mx-auto gap-2">
                      <h1 className='font-bold text-primary'>Address: </h1>
                      <p className='text-xs md:text-sm'>{withdraw.address}</p>
                    </div>
                    <div className="flex items-center justify-start w-3/4 mx-auto gap-2">
                      <h1 className='font-bold text-primary'>Amount: </h1>
                      <p>{formatter.format(withdraw.amount)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-3/4 mx-auto items-center justify-between mt-5">
                <button onClick={() => setScreen(1)} className='px-5 py-1 bg-white text-primary border rounded-full'>Back</button>
                <button onClick={Clear} className='px-5 py-1 mainbg text-white bg-primary rounded-full'>Submit</button>
              </div>
            </div>
          </>}
        </div>
      </div>





    </DashboardLayout>
  )
}

export default Withdrawals