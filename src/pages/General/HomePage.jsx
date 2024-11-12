import React, { useEffect, useRef, useState } from 'react'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { HiMiniBars3BottomRight } from 'react-icons/hi2'
import { homepageHeaders, numbers } from '../../utils/functions'
import Footer from '../../components/general/Footer'
import Layout from '../../components/general/Layout'
import btcimg from '../../assets/general/btc.jpg'
import Counter from '../../components/general/Counter'
import bnbimg from '../../assets/general/binance.png'
import solimg from '../../assets/general/solana.png'
import ethimg from '../../assets/general/ethereum.png'
import avaimg from '../../assets/general/avalanche.png'
import tonimg from '../../assets/general/ton.png'
import maticimg from '../../assets/general/polygon.png'
import useIntersectionObserver from '../../components/general/IntersectionObserver'

const HomePage = () => {

    const images = [
        {
            img: ethimg,
            title: 'Ethereum'
        },
        {
            img: bnbimg,
            title: 'Binance'
        },

        {
            img: solimg,
            title: 'Solana'
        },
        {
            img: avaimg,
            title: 'Avalanche'
        },
        {
            img: tonimg,
            title: 'Ton'
        },
        {
            img: maticimg,
            title: 'Polygon'
        },
    ]


    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const topRef = useRef(null);
    const bottomRef = useRef(null);

    const animateInView = (element) => {
        if (element.classList.contains('left')) {
            element.classList.add('animate-fadeInLeft');
        }
        else if (element.classList.contains('right')) {
            element.classList.add('animate-fadeInRight');
        }
        else if (element.classList.contains('top')) {
            element.classList.add('animate-fadeInTop');
        }
        else if (element.classList.contains('bottom')) {
            element.classList.add('animate-fadeInBottom');
        }
    };

    const observe = useIntersectionObserver(animateInView, { threshold: 0.5 });

    useEffect(() => {
        if (leftRef.current) {
            observe(leftRef.current);
        }
        if (topRef.current) {
            observe(topRef.current);
        }
        if (bottomRef.current) {
            observe(bottomRef.current);
        }
        if (rightRef.current) {
            observe(rightRef.current);
        }
    }, [observe]);


    return (
        <Layout>
            <div className="w-full ">
                <div className="w-10/12 lg:my-20 my-10 mx-auto h-fit ">
                    <div className="flex w-full flex-col lg:flex-row items-center justify-between gap-4">
                        <div ref={leftRef} className="flex items-start flex-col lg:w-1/2 gap-3 left">
                            <div className="font-semibold text-2xl">Welcome to <span className='text-2xl font-bold'>Coinvista</span> </div>
                            <div className="text-3xl font-bold capitalize">Empower Your Financial Future with Cutting-Edge <span className='text-primary font-bold text-4xl'>Cryptocurrency Investments</span></div>
                            <div className="text-[1rem]">At Coinvista, we believe in the transformative power of cryptocurrency. Our platform offers a seamless, secure, and intuitive way to invest in the future of finance. Whether you're a seasoned investor or just starting out, Coinvista provides the tools and insights you need to make informed decisions and maximize your returns</div>
                            <div className="w-fit flex items-center gap-5">
                                <button className='px-5 text-xl py-2 rounded-lg bg-sec font-bold'>Get Started</button>

                            </div>
                        </div>
                        <div ref={rightRef} className="lg:w-1/2 right">
                            <img src={btcimg} className='rounded-lg' alt="" />
                        </div>
                    </div>
                    <div className="w-full h-fit mt-20 ">
                        <div ref={topRef} className="w-full top h-full grid grid-cols-2 gap-5 lg:gap-10 md:grid-cols-3 lg:grid-cols-4 bg-dark rounded-md  py-2 px-3">


                            <div className="w-full flex flex-col  items-center bg-white  py-2 justify-center px-2 rounded-lg">
                                <div className={`flex items-center`}>
                                    <Counter duration={2000} end={1000} />k+
                                </div>
                                <div className=" uppercase text-slate-500 font-light ">Investors</div>
                            </div>
                            <div className=" flex flex-col  items-center bg-white py-2  justify-center px-2 rounded-lg">
                                <div className={`flex items-center`}>
                                    <Counter duration={2000} end={1.2} />m+
                                </div>
                                <div className=" uppercase text-slate-500 font-light ">Annual ROI</div>
                            </div>


                            <div className="w-full flex flex-col  items-center bg-white py-2 h-full justify-center px-2 rounded-lg">
                                <div className={`flex items-center`}>
                                    <Counter duration={2000} end={100} />+
                                </div>
                                <div className=" uppercase text-slate-500 font-light ">Countries</div>
                            </div>
                            <div className="flex flex-col  items-center bg-white py-2 justify-center px-2 rounded-lg">
                                <div className={`flex items-center`}>
                                    <Counter duration={2000} end={142} />m+
                                </div>
                                <div className=" uppercase text-slate-500 font-light ">Capital Raised</div>
                            </div>


                        </div>
                    </div>
                </div>
                <div ref={bottomRef} className="w-full bottom h-fit py-8  bg-dark ">
                    <div className="w-10/12  h-fit mx-auto flex gap-3 items-center justify-center flex-col ">
                        <div className="text-2xl font-bold text-white">Supported Blockchains</div>
                        <div className="items-center h-full gap-5 justify-evenly grid grid-cols-2 md:grid-cols-3 lg:grid-flow-col ">
                            {images.map((img, i) => {
                                return (
                                    <div className="flex items-center w-[100%] cursor-pointer  gap-1 border px-4 py-2 border-[#1f2534] rounded-md" key={i}>
                                        <img src={img.img} className='w-10 h-10' alt={img.title} />
                                        <div className="text-white">{img.title}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="h-20 w-full bg-white"></div>
            </div>
        </Layout>
    )
}
{/* <a href="https://www.flaticon.com/free-icons/blockchain" title="blockchain icons">Blockchain icons created by NeXore88 - Flaticon</a> */ }
export default HomePage