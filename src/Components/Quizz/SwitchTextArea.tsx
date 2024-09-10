import { useState } from "react";

const SwitchTextArea = ({value, changeHandler, save}: {value: string, changeHandler: (value:string) => void, save: () => void}) => {
    const [editing, setEditing] = useState(false);
    
    if (editing) {
        return (
            <>
                <textarea className="form-control" autoFocus value={value} 
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
            <textarea className="form-control" disabled>{value}</textarea>
            <button className="btn btn-primary" onClick={() => {
                setEditing(true);
            }}>Edit</button>
        </>
    )
}

export default SwitchTextArea;