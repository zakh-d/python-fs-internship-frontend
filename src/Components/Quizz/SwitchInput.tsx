import { useState } from "react";

const SwitchInput = ({value, changeHandler, save}: {value: string, changeHandler: (value:string) => void, save: () => void}) => {
    const [editing, setEditing] = useState(false);
    
    if (editing) {
        return (
            <input className="form-control" autoFocus type="text" value={value} onBlur={() => {
                setEditing(false);
                save();
            }}
                onChange={(e) => {
                    changeHandler(e.target.value); 
                }}
            />
        )
    }

    return (
    
           <div className="form-control" style={{backgroundColor: '#e9ecef'}} onDoubleClick={() => setEditing(true)}>{value}</div>

    )
}

export default SwitchInput;