'use client'

import { Plan } from "@/app/components/plan";
import PageLayout from "@/app/page-layouts/page-layout";

const Subscription: React.FC = () => {
    return (
        <PageLayout>
            <div>
                <h4>Choose your plan</h4>
            </div>
            <Plan id={1} title="Premium" amount={5000} isCurrent properties={["one", "two", "three"]} submitText="Choose" onClick={ () => null }/>
        </PageLayout>
    )
};
  
export default Subscription;