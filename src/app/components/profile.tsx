import { faAngleLeft, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface props {
    data: {
        email: string;
        first_name: string;
        last_name: string;
        phone: string;
        country: string;
    };
    view: boolean;
    handleChange: (data: {
        email: string;
        first_name: string;
        last_name: string;
        phone: string;
        country: string;
    }) => void;
    handleSetView: (val: boolean) => void;
    submit: () => void
}

export const Profile:React.FC<props> = ({ data, view, handleChange, handleSetView, submit}) => {
        const [mode, setMode] = useState(false);
        const [preview, setPreview] = useState('/misc/oct.jpg');
        const [selectedImage, setSelectedImage] = useState(null);

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
        <div className="rounded fixed right-6 h-4/5 w-72 p-5 shadow-2xl top-16 z-20 bg-white overflow-auto eliminate-bar animate-slidex">
            <div className="flex mt-3 justify-center items-center">
                <FontAwesomeIcon icon={faAngleLeft} className="relative -left-16 cursor-pointer" onClick={()=> {
                    handleSetView(!view);
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
                <form onSubmit={(event) => {
                    event.preventDefault();
                    submit();
                }} className="flex justify-center flex-col gap-3 mt-10">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <input className="rounded w-100 p-2 border-none shadow" placeholder="Email" type="email" id="email" defaultValue={data.email} readOnly></input>
                    
                    <label htmlFor="First Name" className="font-bold">
                        First Name
                    </label>
                    {mode ? (<input className="rounded  p-2 border-none shadow" placeholder="First Name" type="first_name" id="first_name" defaultValue={data.first_name} onInput={ (e: any) => handleChange({ ...data, first_name: e.target.value})}></input>)
                    : ( <input className="rounded w-100 p-2 border-none shadow" placeholder="First Name" type="first_name" id="first_name" defaultValue={data.first_name} readOnly></input>)}
                    <label htmlFor="Last Name" className="font-bold">
                        Last Name
                    </label>
                    {mode ? (<input className="rounded  p-2 border-none shadow" placeholder="Last Name" type="last_name" id="last_name" defaultValue={data.last_name} onInput={ (e: any) => handleChange({ ...data, last_name: e.target.value})}></input>)
                    : ( <input className="rounded w-100 p-2 border-none shadow" placeholder="Last Name" type="last_name" id="last_name" defaultValue={data.last_name} readOnly></input>)}
                    <label htmlFor="country" className="font-bold">
                        Phone Number
                    </label>
                    {mode ? (<input className="rounded  p-2 border-none shadow" placeholder="Phone number" type="telephone" id="phone" defaultValue={data.phone}onInput={ (e: any) => handleChange({ ...data, phone: e.target.value})}></input>) :
                        (<input className="rounded w-100 p-2 border-none shadow" placeholder="Phone number" type="telephone" id="phone" defaultValue={data.phone} readOnly></input>)}
                    <label htmlFor="country" className="font-bold">
                        Country
                    </label>
                    {/* Add */}
                    {mode ? (<select className="p-2 border-none shadow" id="country" defaultValue={data.country} onChange={ (e: any) => handleChange({ ...data, country: e.target.value})}>
                        {['Nigeria', 'Ghana', 'South Africa', 'Kenya', 'USA'].map((element, index) => 
                    <option key={index} value={element}>{element}</option>
                    )}
                    </select>) : (<div className="shadow rounded">
                        <p className="ml-2 font-bold">{data.country}</p>  
                    </div>)} 
                    {/* Do something here */}
                    {mode && <button className="rounded border-none p-2 bg-black text-white mt-10" type="submit">Save changes</button>}
                </form>
            </div>
    )
}