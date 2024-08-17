import { useState } from "react";

const SwitchTextArea = ({value, changeHandler}: {value: string, changeHandler: (value:string) => void}) => {
    const [editing, setEditing] = useState(false);
    
    if (editing) {
        return (
            <textarea className="form-control" autoFocus value={value} onBlur={() => setEditing(false)}
                onChange={(e) => {
                    changeHandler(e.target.value); 
                }}
            />
        )
    }

    return (
        <div className="form-control" style={{backgroundColor: '#e9ecef'}} onDoubleClick={() => {
            console.log("Double click")
            setEditing(true)
        }} >{value}</div>
    )
}

export default SwitchTextArea;