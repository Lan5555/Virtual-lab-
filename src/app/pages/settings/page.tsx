/* eslint-disable @next/next/no-img-element */
'use client'
import { AboutCard } from "@/app/components/about-card";
import Badge from "@/app/components/badge";
import { Feedback } from "@/app/components/feedback";
import { Profile } from "@/app/components/profile";
import Toast from "@/app/components/toast";
import { UsersCard } from "@/app/components/users-card";
import Wrap from "@/app/components/wrapper";
import { useDelay } from "@/app/hooks/delay";
import { useFirebase } from "@/app/hooks/firebase";
import PageLayout from "@/app/page-layouts/page-layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import { useRouter } from "next/navigation";
import { title } from "process";
import { useEffect, useState } from "react";
import 'tippy.js/dist/tippy.css';

const Settings: React.FC = () => {
    const router = useRouter();
    const { getFeedbacks, getUser, updateProfile } = useFirebase();
    const {isShow, showDelay} = useDelay();

    const [userFeedbac, setUserFeedback] = useState([])
    const [success, showSuccess] = useState(false);
    const [about, setAbout] = useState({ title: "", text: "" })
    const [profile, setProfile] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        country: "",
    });
    const [view, setView] = useState(false);

    // dummy feedback
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

    const user = getUser();

    useEffect(() => {
        setProfile({ ...user });
        showSuccess(isShow);
    },[user, isShow])

    // update profile
    const updateUserProfile = async () => {
        const res = await updateProfile({ 
            first_name: profile.first_name, 
            last_name: profile.last_name, 
            phone: profile.phone, 
            country: profile.country,
        });
        if (res.success) {
            // toast
            showDelay();
        }
    }

    // set data
    const setData = async () => {
        const [feedbackRes] = await Promise.all([
            getFeedbacks(),
        ])
        if (feedbackRes.success) {
            setUserFeedback(feedbackRes.data)
        }
    }
    setData();

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
                <div className="flex gap-3 rounded w-80 h-12 shadow justify-evenly items-center ml-1">
                    <Tippy content={menu} placement="bottom" interactive={true}>
                    <div className="rounded shadow bg-slate-600 w-auto h-7 flex justify-center items-center p-1">
                    <h6 className="text-white cursor-pointer">Create Lab</h6>
                    </div>
                    </Tippy>
                    <div className="rounded shadow-2xl w-auto h-7 flex justify-center items-center p-1 cursor-pointer">
                    <h6 className="text-black cursor-pointer">Workspace</h6>
                    </div>
                    <div className="rounded shadow-2xl w-auto h-7 flex justify-center items-center p-1 cursor-pointer" onClick={()=>{
                        setView(prev => !prev);
                    }}>
                    <h6 className="text-black cursor-pointer">Profile</h6>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap">
                    {/* <div className="basis-2/3">
                        <UsersCard fields={userFields} items={users} onSelected={(e) => alert(e)} />
                    </div> */}
                    <div className="basis-1/2">
                        <AboutCard about={about} onSave={setAbout} />
                    </div>
                    <div className="basis-1/2">
                        <Feedback items={userFeedback} />
                    </div>
                </div>
                
                {view && <Profile data={profile} view={view} handleChange={ setProfile } handleSetView={setView} submit={updateUserProfile} />}
                {success && <Toast type="success" text="Successful"></Toast>}
            </div>
        </PageLayout>
    )
};
  
export default Settings;