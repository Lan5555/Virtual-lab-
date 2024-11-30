'use client'

import { Feedback } from "@/app/components/feedback";
import { UsersCard } from "@/app/components/users-card";
import PageLayout from "@/app/page-layouts/page-layout";

const Settings: React.FC = () => {
    const userFields = [
        { label: "User ID", key: "id"},
        { label: "First name", key: "first_name"},
        { label: "Surname", key: "surname"},
        { label: "Grade", key: "grade"},
        { label: "View", key: "view", render: "view"},
    ];
    const users = [
        {
            id: "XD123",
            first_name: "Adam",
            surname: "Okoli",
            grade: 2,
            view: "",
        },
        {
            id: "XD124",
            first_name: "Musa",
            surname: "Auwal",
            grade: 5,
            view: "",
        },
        {
            id: "XD125",
            first_name: "John",
            surname: "Doe",
            grade: 2,
            view: "",
        },
    ];
    const userFeedback = [
        {
            name: "Sam",
            comment: "Amazing concept",
        },
        {
            name: "Jude Anam",
            comment: "Very nice",
        },
        {
            name: "Obey Anosike",
            comment: "Very good work, keep it up",
        }
    ];
    return (
        <PageLayout>
            <div className="">
                <h4>Settings</h4>
            </div>

            <div className="flex flex-col">
                <div>
                    <h6>Create Lab</h6>
                </div>
                <div className="flex flex-row flex-wrap">
                    <div className="basis-2/3">
                        <UsersCard fields={userFields} items={users} onSelected={(e) => alert(e)} />
                    </div>
                    <div className="basis-1/3">
                        <Feedback items={userFeedback} />
                    </div>
                </div>
                <div>
                    <h6>About</h6>
                </div>
            </div>
        </PageLayout>
    )
};
  
export default Settings;