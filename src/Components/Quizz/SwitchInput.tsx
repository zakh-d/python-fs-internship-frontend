import { useState } from "react";

const SwitchInput = ({value, changeHandler, save, type}: {value: string, changeHandler: (value:string) => void, save: () => void, type?: string}) => {
    const [editing, setEditing] = useState(false);
    
    if (editing) {
        return (
            <>
            <input className="form-control" autoFocus value={value}
                type={type || "text"}
                onChange={(e) => {
                    changeHandler(e.target.value); 
                }}
            />
            <button className="btn btn-success" onClick={() => {
                setEditing(false);
                save();
            }}>Save</button>
            </>
        )
    }

    return (
           <>
           <input className="form-control" disabled value={value}/>
           <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit</button>
            </>
    )
}

export default SwitchInput;