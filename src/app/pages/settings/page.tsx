/* eslint-disable @next/next/no-img-element */
'use client'
import { AboutCard } from "@/app/components/about-card";
import Badge from "@/app/components/badge";
import { Feedback } from "@/app/components/feedback";
import { UsersCard } from "@/app/components/users-card";
import Wrap from "@/app/components/wrapper";
import { useFirebase } from "@/app/hooks/firebase";
import PageLayout from "@/app/page-layouts/page-layout";
import { faAngleLeft, faCamera, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    const [mode, setMode] = useState(false);
    const [uploadMode, setUploadMode] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState('/misc/oct.jpg');
    const [view, setView] = useState(false);
    const handleFileChange = (e:any) => {
        const file = e.target.files[0];
        if(file){
            setPreview(URL.createObjectURL(file));
        }
    }
    const handleIconClick = () => {
        document.getElementById("fileInput")?.click();
    }
    return (
        <PageLayout>
            <div className="">
                <h1 className="font-bold mb-2">Settings</h1>
            </div>

            <div className="flex flex-col">
                <div className="flex gap-3 rounded w-80 h-12 shadow justify-evenly items-center ml-2">
                    <Tippy content={menu} placement="bottom" interactive={true}>
                    <div className="rounded shadow bg-slate-600 w-auto h-7 flex justify-center items-center p-1">
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
                {view && <div className="rounded fixed right-6 h-4/5 w-72 p-5 shadow-2xl top-16 z-20 bg-white overflow-auto eliminate-bar">
                <div className="flex mt-3 justify-center items-center">
                    <FontAwesomeIcon icon={faAngleLeft} className="relative -left-16" onClick={()=> {
                        setView(prev => !prev);
                    }}></FontAwesomeIcon>
                    <h2>Edit Profile</h2>
                    <input type="file" accept="image/" onChange={handleFileChange} className="hidden" id="fileInput"></input>
                </div>
                <div className="flex justify-center">
                    <div className="rounded-full shadow w-36 h-36 p-[1px]" style={{
                        border:'1px solid black'
                    }}>
                        {/* Create an image component to update dp in firebase */}
                    {preview ? (<img src={preview} className="object-cover w-36 h-36 rounded-full" alt=""></img>) : (<p>No image selected</p>)}
                    <FontAwesomeIcon icon={faCamera} className="relative -top-7 left-28 cursor-pointer" style={{
                        height:'20px'
                    }} onClick={()=> {
                        handleIconClick();
                        // Do something here with firebase
                    }}></FontAwesomeIcon>
                    </div>
                </div>
                <div className="flex justify-end">
                    <p className="absolute right-20 mt-7">{mode ? "Edit mode" : "View mode"}</p>
                    <div className="w-10 h-5 absolute right-5 mt-5 shadow p-1" onClick={()=> setMode(prev => !prev)}>
                        <div className={!mode ? `w-5 h-5 bg-blue-500 rounded` : `w-5 h-5 bg-blue-500 rounded ml-5`} onClick={()=>{
                            setMode(prev => !prev);
                        }} style={{
                            transition:'0.3s ease-in-out'
                        }}>
                        </div>
                    </div>
                </div>
                    <form className="flex justify-center flex-col gap-3 mt-10">
                        <label htmlFor="email" className="font-bold">
                            Email
                        </label>
                        {mode ? (<input className="rounded  p-2 border-none shadow" placeholder="Email" type="email" id="email" ></input>)
                        :
                        (<input className="rounded w-100 p-2 border-none shadow" placeholder="Email" type="email" id="email" readOnly></input>)}
                        
                        <label htmlFor="password" className="font-bold">
                            Password
                        </label>
                        {mode ? (<input className="rounded  p-2 border-none shadow" placeholder="Email" type="email" id="password"></input>)
                        : ( <input className="rounded w-100 p-2 border-none shadow" placeholder="Email" type="email" id="password" readOnly></input>)}
                        <label htmlFor="number" className="font-bold">
                            Phone Number
                        </label>
                        {mode ? (<input className="rounded  p-2 border-none shadow" placeholder="Email" type="email" id="number"></input>) :
                         (<input className="rounded w-100 p-2 border-none shadow" placeholder="Email" type="email" id="number" readOnly></input>)}
                        <label htmlFor="country" className="font-bold">
                            Country
                        </label>
                        {/* Add */}
                        {mode ? (<select className="p-2 border-none shadow" id="country">
                         {['Nigeria', 'Ghana', 'South Africa', 'Kenya', 'USA'].map((element, index) => 
                        <option key={index} value={element}>{element}</option>
                        )}
                        </select>) : (<div className="shadow rounded">
                            <p className="ml-2 font-bold">Nigeria</p>  
                        </div>)} 
                        {/* Do something here */}
                        {mode && <button className="rounded border-none p-2 bg-black text-white mt-10" type="submit" onClick={()=>{
                            // do something
                        }}>Save changes</button>}
                    </form>
                </div>}
            </div>
        </PageLayout>
    )
};
  
export default Settings;