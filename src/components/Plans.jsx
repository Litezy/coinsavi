import React from 'react'
import { formatter } from '../utils/functions';

const Plans = ({ plan, handlePlanSelect, submitPlan }) => {


    return (
        <div className="md:w-full w-11/12 mx-auto h-fit hover:-translate-y-3 transition-all delay-100 ease-linear max-w-sm border-2 p-4 bg-white border-primary capitalize border-gray-200 rounded-lg shadow-lg cursor-pointer sm:p-8 ">
            <ul role="list" className="space-y-3 my-2">
                <h5 className="mb-4 text-xl  text-primary font-bold">{plan.title}</h5>
                <div className="flex items-baseline text-gray-900 ">
                    <span className="text-4xl font-extrabold tracking-tight">{formatter.format(plan.amount)}</span>
                </div>
                <li class="flex items-center justify-between">
                    <span class="text-base font-normal leading-tight ">duration</span>
                    <span class="text-base font-normal leading-tight ">{plan.duration}</span>
                </li>
                <li class="flex items-center justify-between">
                    <span class="text-base font-normal leading-tight ">max deposit</span>
                    <span class="text-base font-normal leading-tight ">{formatter.format(plan.max_deposit)}</span>
                </li>
                <li class="flex items-center justify-between">
                    <span class="text-base font-normal leading-tight ">min withdrawal</span>
                    <span class="text-base font-normal leading-tight ">{formatter.format(plan.min_with)}</span>
                </li>
                <li class="w-full  flex items-center justify-between">
                    <span class="text-base font-normal leading-tight ">ROI</span>
                    <span class="text-base font-normal leading-tight ">{plan.roi}</span>
                </li>
                <li class="w-full  flex items-center justify-between">
                    <span class="text-base font-normal leading-tight ">Returns Capital</span>
                    <span class="text-base font-normal leading-tight  ">{plan.returns_cap}</span>
                </li>
            </ul>
            <button type="button" onMouseOver={() => handlePlanSelect(plan)} onClick={submitPlan} className="text-white bg-primary hover:border-2 hover:border-primary hover:bg-white hover:text-primary focus:ring-4 focus:outline-none b] font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
                Choose plan
            </button>
        </div>
    );

};

export default Plans