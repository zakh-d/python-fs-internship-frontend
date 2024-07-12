import { ReactElement } from "react";

type PropsType = {
    labelText: string;
    name: string;
    type: "text" | "email" | "password";
    required: boolean;
}

const Input = ({labelText, name, type, required}: PropsType): ReactElement => {
    
    return (
        <div>
            <label className="form-label" htmlFor={name + "_id"}>{labelText}</label>
            <input className="form-control"  name={name} type={type} id={name + "_id"} required={required}/>
        </div>
     )
}

export default Input;