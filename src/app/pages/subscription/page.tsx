'use client'

import PaymentCard from "@/app/components/payment-card";
import Wrap from "@/app/components/wrapper";
import PageLayout from "@/app/page-layouts/page-layout";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Subscription: React.FC = () => {
    const [mediaquery, setMediaQuery] = useState('desktop');
    const updateMediaQuery = () => {
        if (window.matchMedia('(max-width: 600px)').matches) {
          setMediaQuery('mobile');
        } else if (window.matchMedia('(min-width: 548px) and (max-width:1140px)').matches) {
          setMediaQuery('tablet');
        } else {
          setMediaQuery('desktop');
        }
      };
    
      useEffect(() => {
        updateMediaQuery();
        window.addEventListener('resize', updateMediaQuery);
        return () => window.removeEventListener('resize', updateMediaQuery);
      }, []);
      
    const plans = [{
        header: "Basic Plan",
        price: 5000,
        features: ['Early access', '30 days plan', 'limited access to lab features'],
        limit: "month",
    }, {
        header: "Premium Plan",
        price: 10000,
        features: ['Enjoy perks', '30 days plan', 'Manual creation of lab space'],
        limit: "month",
    }, {
        header: "Exclusive Plan",
        price: 50000,
        features: ['Exciting features available', '30 days plan', 'Full access to lab features'],
        limit: "month",
    }];

    return (
        <PageLayout>
            <div className="">
                <Wrap 
                    content={<h3 className=" text-white text-sm font-bold">Subscription</h3>} color={"black"} classname="ml-2 mb-2">
                </Wrap>
            </div>

            { mediaquery == "desktop" || mediaquery == "tablet" ? (<div className="flex justify-center items-center gap-16  shadow-2xl p-28 rounded-3xl" style={{
                background:'linear-gradient(to right, white,blueviolet)'
            }}>
                <h3 className={
                    mediaquery == "desktop" ? "absolute top-32 left-80 ml-5"
                    : mediaquery == "tablet" ? "hidden" : 'absolute top-32 left-14'
                }>Choose your plan</h3>
                <small className={
                    mediaquery == "desktop" ? "absolute top-44 left-80 ml-5 opacity-50 text-xxs"
                    :mediaquery == "tablet" ? "hidden" : 'absolute top-44 left-14 opacity-50 text-xxs'
                }>Term&apos;s and conditions applies</small>
                <div className="absolute right-20 top-32 flex gap-4">
                <button className="w-auto h-auto p-2 rounded-md bg-white border-none border-green-500 shadow-2xl cursor-pointer hover:bg-slate-600">Add ons</button>
                <button className="w-auto h-auto p-2 rounded-md bg-black text-white border-none shadow cursor-pointer hover:bg-slate-600">Query transaction</button>
                </div>
                { plans.map((it, index) => (
                    <div key={index} className="w-1/3">
                        <PaymentCard 
                            key={it.header}
                            header={it.header}
                            price={it.price}
                            features={it.features}
                            limit={it.limit}>
                            
                        </PaymentCard>
                    </div>
                ))}
                
            </div>):
            <div className="flex justify-center items-center mt-16">
            <div className="flex justify-center items-center gap-5 flex-col">
                <div className="w-96 h-32 shadow-2xl rounded flex gap-4 justify-evenly items-center p-1 ml-1 r-b-b l-b-b hover:shadow">
                <FontAwesomeIcon icon={faInfoCircle} className="animate-pulse text-green-400"></FontAwesomeIcon>
                <h3>Basic Plan</h3>
                <div className="">
                    <h3>5000/<small>month</small></h3>
                </div>
                <button className="p-2 rounded bg-black border-none">Purchace</button>
                </div>
                
                <div className="w-96 h-32 shadow-2xl rounded flex gap-4 justify-evenly items-center p-1 ml-1 l-b-r r-b-r hover:shadow">
                <FontAwesomeIcon icon={faInfoCircle} className="animate-pulse text-green-400"></FontAwesomeIcon>
                <h3>Basic Plan</h3>
                <div className="">
                    <h3>10000/<small>month</small></h3>
                </div>
                <button className="p-2 rounded bg-green-500 border-none">Purchace</button>
                </div>
                <div className="w-96 h-32 shadow-2xl rounded flex gap-4 justify-evenly items-center p-1 ml-1 l-b-g r-b-g hover:shadow">
                <FontAwesomeIcon icon={faInfoCircle} className="animate-pulse text-green-400"></FontAwesomeIcon>
                <h3>Basic Plan</h3>
                <div className="">
                    <h3>50000/<small>month</small></h3>
                </div>
                <button className="p-2 rounded bg-green-500 border-none">Purchace</button>
                </div>
                </div>
                </div>
                }
        </PageLayout>
    )
};
  
export default Subscription;