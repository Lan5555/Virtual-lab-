import { CSSProperties, useState } from "react";
import Icon from "./icons";

interface props {
    about: {title: string, text: string}
    onSave: (val: {title: string, text: string}) => void,
}

export const AboutCard:React.FC<props> = ({ about, onSave }) => {
    const [state, setState] = useState({ title: "", text: "" })
    const [edit, setEdit] = useState(false);

    const textAreaStyle:CSSProperties = {
        fontSize: '12pt',
        borderRadius: '0.5rem',
        width: "100%",
        marginTop: 0,
        color:'white'
    }

    const editStyle: CSSProperties = {
        position: "absolute",
        backgroundColor: "white",
        width: "20rem",
        border: "none",
        padding: "1rem",
        
    }

    return (
        <div className="shadow-2xl p-2">
            <h5 className="ml-5">About</h5>
            
            <div style={{ width: "60%" }}>
                {
                    edit ? <div className="flex justify-end">
                        <div className="flex flex-col gap-2 shadow-2xl rounded" style={editStyle}>
                            <div className="flex justify-end">
                            <Icon iconName='close' size1='12pt' color="lightblue" onPressed={() => setEdit(false)}/>
                            </div>
                            <input className=" basis-1 p-2 shadow border-none" type="text" name="title" placeholder="Title" id="" value={state.title} onInput={(e: any) => setState({ ...state, title: e.target.value})} />
                            <textarea className="basis-3 p-2 shadow border-none" name="about" placeholder="Message" value={state.text} onInput={(e: any) => setState({ ...state, text: e.target.value})}  cols={30} rows={10}/>
                            <button className=" basis-1 rounded border-none p-2 shadow" type="submit" style={{ backgroundColor: "lightblue"}} 
                                onClick={() => {
                                    onSave(state);
                                    setEdit(false);
                                }}
                            >Save</button>
                        </div>
                    </div> : <></>
                }
                <div className="flex justify-between mb-0">
                    <h6>{about.title}</h6>
                    <Icon iconName='edit' size1='12pt' color="orange" onPressed={() => setEdit(true)}/>
                </div>
                <textarea className="border-none shadow bg-slate-50 p-1 hover:shadow-2xl outline-none" placeholder="Message will be displayed here"   name="about" style={textAreaStyle} defaultValue={about.text} readOnly cols={30} rows={10 }/>
            </div>
        </div>
    )
}