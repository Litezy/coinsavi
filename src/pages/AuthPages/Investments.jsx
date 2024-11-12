import React, { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { FaChevronLeft, FaCircleDollarToSlot, FaPlus } from 'react-icons/fa6';
import Plans from '../../components/Plans';
import Loading from '../../components/Loading';
import InvestmentPlan from '../../components/InvestmentPlan';
import sadguy from '../../assets/dashbaord/sadguy.png'
import { formatter } from '../../utils/functions';

const Investments = () => {

  const [screen, setScreen] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState({})
  const [userplans, setUserPlans] = useState({} || [])
  const [loading, setLoading] = useState(false)

  const handleSelect = (plan) => {
    setSelectedPlan(plan)
  }


  const submitPlan = () => {
    setScreen(3)
  }
  const [plans, setPlans] = useState([
    {
      id: 'bronze',
      title: 'Bronze Plan',
      amount: 500,
      duration: '30 days',
      max_deposit: 1500,
      min_with: 1000,
      duration: '30 days',
      roi: '10%',
      returns_cap: 'No',
    },
    {
      id: 'silver',
      title: 'Silver Plan',
      amount: 1500,
      duration: '60 days',
      max_deposit: 2500,
      min_with: 1200,
      duration: '60 days',
      roi: '13%',
      returns_cap: 'No',
    },
    {
      id: 'gold',
      title: 'Gold Plan',
      amount: 2500,
      max_deposit: 3500,
      min_with: 1500,
      duration: '90 days',
      roi: '15%',
      returns_cap: 'No',
    },
    {
      id: 'platinum',
      title: 'Platinum Plan',
      amount: 3500,
      duration: '6 months',
      max_deposit: 4500,
      min_with: 3000,
      duration: '180 days',
      roi: '17%',
      returns_cap: 'Yes',
    },
    {
      id: 'diamond',
      title: 'Diamond Plan',
      amount: 5000,
      duration: '1 year',
      max_deposit: 10000,
      min_with: 4000,
      duration: '365 days',
      roi: '20%',
      returns_cap: 'Yes',
    }
  ]);
  return (
    <DashboardLayout>


      <div className="w-11/12 mx-auto ">
        {screen === 1 &&
          <>
            <div className="w-full my-5 px-3 bg-white rounded-lg h-fit py-3 flex gap-3 lg:gap-0 lg:items-center items-start flex-col lg:flex-row justify-between">
              <div className="flex items-center  gap-2 font-bold">
                <FaCircleDollarToSlot />
                <div className="text-xl">Investments History</div>
              </div>
              <div className="w-1/2 lg:w-fit px-2 lg:px-10  py-2 justify-center cursor-pointer rounded-md self-center lg:self-end  border hover:bg-primary hover:text-white text-primary">
                <div className="">Purchase Plan</div>
              </div>
            </div>
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
              </div>
          </>
        }
        {screen === 2 &&
          <>
            <div className="bg-white w-full py-3 rounded-lg">
              <div onClick={() => setScreen(1)} className="w-fit mr-auto ml-3 cursor-pointer">
                <FaChevronLeft className='text-2xl ' />
              </div>
              <h1 className='main md:text-2xl text-center text-lg  py-5 font-bold '>Select the Perfect Plan to Elevate Your Financial Journey!</h1>

              <div className="md:grid md:grid-cols-3 flex flex-col gap-8 w-11/12 mx-auto md:gap-6 pb-5">
                {plans.map(plan => <Plans key={plan.id} plan={plan} handlePlanSelect={handleSelect} submitPlan={submitPlan} />)}
              </div>
            </div>
          </>}

        {screen === 3 &&
          <>
            <div className=" bg-white my-5 px-5 rounded-lg pb-4">
              {loading && <Loading />}
              <div onClick={() => setScreen(2)} className="w-fit pt-2 mr-auto  mt-2 cursor-pointer">
                <FaChevronLeft className='text-2xl ' />
              </div>
              <div className=" w-f">
                <h1 className='text-2xl mt-5 font-bold text-primary text-center underline'>Order Summary</h1>
                <div className="lg:w-3/4 mx-auto bg-primary rounded-lg h-[20rem] flex items-start mt-5 ">
                  <div className=" w-full flex h-full items-center flex-col gap-5 mainbg justify-center rounded-xl text-white">
                    <div className="w-6/12 flex items-center justify-between">
                      <p>Title</p>
                      <p>{selectedPlan.title}</p>
                    </div>
                    <div className="w-6/12  flex items-center justify-between">
                      <p>Amount</p>
                      <p>{formatter.format(selectedPlan.amount)}</p>
                    </div>
                    <div className="w-6/12  flex items-center justify-between">
                      <p>Duration</p>
                      <p>{selectedPlan.duration}</p>
                    </div>
                    <div className="w-6/12  flex items-center justify-between">
                      <p>Max. Deposit</p>
                      <p>{formatter.format(selectedPlan.max_deposit)}</p>
                    </div>
                    <div className="w-6/12  flex items-center justify-between">
                      <p>Min. Withdrawal</p>
                      <p>{formatter.format(selectedPlan.min_with)}</p>
                    </div>
                    <div className="w-6/12  flex items-center justify-between">
                      <p>ROI</p>
                      <p>{selectedPlan.roi}</p>
                    </div>
                    <div className="w-6/12  flex items-center justify-between">
                      <p>Returns Capital</p>
                      <p>{selectedPlan.returns_cap}</p>
                    </div>

                  </div>

                </div>
                <div className="w-fit  mt-4 ml-auto ">
                  <button className='px-8 py-2 rounded-full mainbg bg-primary text-white'>Confirm Purchase</button>
                </div>
              </div>
            </div>
          </>
        }
      </div>



    </DashboardLayout>
  )
}

export default Investments