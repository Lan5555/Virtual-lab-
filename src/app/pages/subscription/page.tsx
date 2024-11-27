'use client'

import PaymentCard from "@/app/components/payment-card";
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
                <h3>Choose your plan</h3>
            </div>

            <div className="flex justify-center items-center">

                { plans.map((it) => (
                    <PaymentCard 
                        key={it.header}
                        header={it.header}
                        price={it.price}
                        features={it.features}
                        limit={it.limit}>
                    </PaymentCard>
                ))}
                
            </div>
        </PageLayout>
    )
};
  
export default Subscription;