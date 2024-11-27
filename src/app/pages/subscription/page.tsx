'use client'

import PaymentCard from "@/app/components/payment-card";
import PageLayout from "@/app/page-layouts/page-layout";
import styles from '@/app/css/subscription.module.css';
import { Plan } from "@/app/components/plan";

const Subscription: React.FC = () => {
    return (
        <PageLayout children={
            <div className="flex justify-center items-center h-screen">
            <PaymentCard 
            header="Basic Plan"
            Price={5000}
            features={['Test 1', 'Test 2', 'Test 3']}
            limit="month"
            ></PaymentCard>
            </div>
        }>
       
        </PageLayout>
        
     );
};
  
export default Subscription;