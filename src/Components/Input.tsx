import { ReactElement, useState } from "react";

type PropsType = {
    labelText: string;
    name: string;
    type: "text" | "email" | "password";
    required: boolean;
}

const Input = ({labelText, name, type, required}: PropsType): ReactElement => {
    const [randomHtmlId, _] = useState(name + Math.random().toString(36).substring(7));
    
    return (
        <div>
            <label className="form-label" htmlFor={randomHtmlId}>{labelText}</label>
            <input className="form-control"  name={name} type={type} id={randomHtmlId} required={required}/>
        </div>
     )
}

export default Input;