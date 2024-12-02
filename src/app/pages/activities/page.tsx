'use client'

import ActivityCard from "@/app/components/activity-card";
import TablePane from "@/app/components/table";
import Wrap from "@/app/components/wrapper";
import PageLayout from "@/app/page-layouts/page-layout";
import { faTachometer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Activities: React.FC = () => {
    const fields = [
        {
            label: "id",
            key: "id",
            render: "id",

        },{
            label: "name",
            key: "name",
            render: "name",
        },{
            label: "action",
            key: "action",
        }];
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
                <Wrap color={"black"} content={
                    <h4 className="text-white">Activities</h4>
                }>
                </Wrap>
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
                        render={(data, key, render) => {
                            if (render === 'name') {
                                return <div className="text-blue-700">{data[key]}</div>
                            } else if (render === 'id') {
                                return <div className="text-red-700">{data[key]}</div>
                            }
                        }}
                    >
                    </TablePane>
                </div>
            </div>
        </PageLayout>
    )
};
  
export default Activities;