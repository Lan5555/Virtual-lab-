'use client'

import PaymentCard from "@/app/components/payment-card";
import Wrap from "@/app/components/wrapper";
import PageLayout from "@/app/page-layouts/page-layout";

const Subscription: React.FC = () => {
    const plans = [{
        header: "Basic Plan",
        price: 5000,
        features: ['Test 1', 'Test 2', 'Test 3'],
        limit: "month",
    }, {
        header: "Premium Plan",
        price: 10000,
        features: ['Test 1', 'Test 2', 'Test 3'],
        limit: "month",
    }, {
        header: "Exclusive Plan",
        price: 50000,
        features: ['Test 1', 'Test 2', 'Test 3'],
        limit: "month",
    }];

    return (
        <PageLayout>
            <div className="">
                <Wrap 
                    content={<h3 className=" text-white text-sm font-bold">Subscription</h3>} color={"green"} classname="ml-2 mb-2">
                </Wrap>
            </div>

            <div className="flex justify-center items-center gap-16  shadow-2xl p-28 rounded-3xl" style={{
                background:'linear-gradient(to right, white,green)'
            }}>
                <h3 className="absolute top-32 left-80 ml-5 ">Choose your plan</h3>
                <small className="absolute top-44 left-80 ml-5 opacity-50 text-xxs">Term&apos;s and conditions applies</small>
                <div className="absolute right-20 top-32 flex gap-4">
                <button className="w-auto h-auto p-2 rounded-md bg-white border-none border-green-500 shadow-2xl cursor-pointer hover:bg-slate-600">Add ons</button>
                <button className="w-auto h-auto p-2 rounded-md bg-green-400 border-none shadow cursor-pointer hover:bg-slate-600">Query transaction</button>
                </div>
                { plans.map((it) => (
                    <div className="w-1/3">
                        <PaymentCard 
                            key={it.header}
                            header={it.header}
                            price={it.price}
                            features={it.features}
                            limit={it.limit}>
                        </PaymentCard>
                    </div>
                ))}
                
            </div>
        </PageLayout>
    )
};
  
export default Subscription;