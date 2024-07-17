import { ReactElement } from "react";
import { Field } from "react-final-form";

type PropsType = {
    labelText: string;
    name: string;
    type: "text" | "email" | "password" | "number" | "checkbox";
}

const Input = ({labelText, name, type}: PropsType): ReactElement => {
    return (
        <Field 
            name={name}
            type={type}
            render={({input, meta}) => (
                <div>
                    <label className="form-label" htmlFor={input.name + '_id'}>{labelText}</label>
                    <input className="form-control"  {...input} id={input.name + '_id'} type={type}/>
                </div>
            )}
        />
     )
}

export default Input;