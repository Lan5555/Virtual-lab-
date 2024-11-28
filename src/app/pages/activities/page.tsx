'use client'

import ActivityCard from "@/app/components/activity-card";
import TablePane from "@/app/components/table";
import PageLayout from "@/app/page-layouts/page-layout";
import { faTachometer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Activities: React.FC = () => {
    const fields = ["id", "name", "action"];
    const items = [
        {
            id: 1,
            name: "Steve",
            action: "logged in",
        },{
            id: 2,
            name: "Kennedy",
            action: "Performed pulley practical",
        }
    ];

    const score = { 
        title: "Activity Score",
        items: [{
            icon: "",
            text: "Chemistry",
            subtext: "subtext 1",
            value: 1,
        },{
            icon: "",
            text: "Physics",
            subtext: "subtext 2",
            value: 3,
        }]
    };
    return (
        <PageLayout>
            <div className="">
                <h4>Activities</h4>
            </div>
            <div className="flex -mx-2">
                <div className="w-1/3">
                   <ActivityCard title={score.title} items={score.items}/>
                </div>
                <div className="w-2/3">
                    <TablePane 
                        fields={fields} 
                        items={items} 
                        onSelect={() => null }
                    >
                        <div className="text-blue-700" slot="name"></div>
                        <div className="text-red-700" slot="id"></div>
                    </TablePane>
                </div>
            </div>
        </PageLayout>
    )
};
  
export default Activities;