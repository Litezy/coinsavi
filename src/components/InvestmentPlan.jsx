import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import sadguy from '../assets/dashbaord/sadguy.png'





const InvestmentPlan = ({ setScreen }) => {

  const [active, setActive] = useState(false)
  const [data, setData] = useState([])
  

  return (
    <div className='md:px-4 px-2'>
      <h1 className={`${data.length === 0 ? '' : ''} main md:text-2xl pt-4 font-bold text-left`}>Investments History</h1>
      <div class="">
        {data && data.length === 0 &&
          <div className=' py-2 flex flex-col items-center justify-center'>
            <div className=" w-full h-fit items-center justify-center">
              <div className="h-fit py-5 w-full mx-auto flex items-center justify-center">
                <img src={sadguy} className='md:w-96 w-60' alt="" />
              </div>
              <div className="text-left flex md:items-center text-lg  flex-col justify-center px-3 md:px-0">
                <p> Oh, seems you don't have any active investment with us. <br className='hidden  md:block' /> but not to worry, check out our flexible plans <button onClick={() => setScreen(2)} className='text-primary  text-xl font-bold'>here!</button></p>
                <p> </p>
              </div>
            </div>
          </div>}
        {data.length > 0 && <div className='overflow-x-auto scroll2 h-fit '>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500  ">
            <thead class="text-xs text-center text-white uppercase bg-gray-50 mainbg ">
              <tr>
                <th scope="col" class="md:px-6 px-3 py-1">
                  Package Name
                </th>
                <th scope="col" class="md:px-6  py-1">
                  Amount
                </th>
                <th scope="col" class=" md:px-6 px-3 py-3">
                  Start Date
                </th>
                <th scope="col" class="md:px-6 px-6 py-1">
                  End Date
                </th>
                <th scope="col" class="md:px-6 px-6 py-1">
                  Time Left
                </th>
                <th scope="col" class="md:px-6 px-3 py-1">
                  Expected Returns
                </th>
                <th scope="col" class="md:px-6 px-3 py-1">
                  Status
                </th>

              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const startDate = moment(item.createdAt);
                const endDate = startDate.clone().add(item.duration, 'days');
                const expectedReturns = formatter.format(item.amount * (item.roi / 100 + 1));
                return (
                  <tr className="bg-white border-b " key={item.id}>
                    <th scope="row" className="text-left capitalize md:px-6 py-4 font-medium whitespace-nowrap ">
                      {item.title}
                    </th>
                    <td className="md:px-6 py-4">
                      {formatter.format(item.amount)}
                    </td>
                    <td className="w-[20%] py-4 text-center text-sm">
                      {item.start_date}
                    </td>
                    <td className="md:w-[20%] py-4 text-center text-sm">
                      {endDate.format('DD/MM/YYYY')}
                    </td>
                    <td className="md:px-6 py-4 md:w-[30%]  text-center">
                      {/* <CountdownTimer startDate={startDate} endDate={endDate} /> */}
                    </td>
                    <td className="capitalize text-center rounded-md mx-auto">
                      {expectedReturns}
                    </td>
                    <td className="capitalize text-center rounded-md mx-auto">
                      {timer === 'complete' ?'complete': 'Active'}
                    </td>
                  </tr>
                );
              })}


            </tbody>

          </table>
        </div>}
        <div onClick={() => setScreen(2)} className="w-fit ml-auto mt-10 mb-2 mainbg text-white cursor-pointer border px-2 rounded-full">Add more plans</div>
      </div>
    </div>
  );
};

export default InvestmentPlan;
