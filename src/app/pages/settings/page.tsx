'use client'
import { AboutCard } from "@/app/components/about-card";
import Badge from "@/app/components/badge";
import { Feedback } from "@/app/components/feedback";
import { UsersCard } from "@/app/components/users-card";
import Wrap from "@/app/components/wrapper";
import { useFirebase } from "@/app/hooks/firebase";
import PageLayout from "@/app/page-layouts/page-layout";
import Tippy from "@tippyjs/react";
import { useRouter } from "next/navigation";
import { title } from "process";
import { useState } from "react";
import 'tippy.js/dist/tippy.css';

const Settings: React.FC = () => {
    const { getFeedbacks, sendFeedback } = useFirebase();

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
    const [about, setAbout] = useState({ title: "", text: "" })
    const [userFeedbac, setUserFeedback] = useState([])

    
    const setData = async () => {
        const [feedbackRes] = await Promise.all([
            getFeedbacks(),
        ])
        if (feedbackRes.success) {
            setUserFeedback(feedbackRes.data)
        }
    }
    setData();
    const router = useRouter();
    const menu = (
        <div className="flex flex-col">
            <ul className="list-none relative -left-5">
                <li onClick={()=> {
                    router.push('/pages/create-lab-space');
                }}>Create Lab Space</li>
            </ul>
        </div>
    );
    return (
        <PageLayout>
            <div className="">
                <h1 className="font-bold mb-2">Settings</h1>
            </div>

            <div className="flex flex-col">
                <div className="flex gap-3 rounded w-80 h-12 shadow justify-evenly items-center ml-2">
                    <Tippy content={menu} placement="bottom" interactive={true}>
                    <div className="rounded shadow bg-slate-600 w-auto h-7 flex justify-center items-center p-1">
                    <Badge text="New" color="red"></Badge>
                    <h6 className="text-white cursor-pointer">Create Lab</h6>
                    </div>
                    </Tippy>
                    <div className="rounded shadow-2xl w-auto h-7 flex justify-center items-center p-1">
                    <h6 className="text-black cursor-pointer">Workspace</h6>
                    </div>
                    <div className="rounded shadow-2xl w-auto h-7 flex justify-center items-center p-1">
                    <h6 className="text-black cursor-pointer">Calculate points</h6>
                    </div>
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
                    <AboutCard about={about} onSave={setAbout} />
                </div>
            </div>
        </PageLayout>
    )
};
  
export default Settings;