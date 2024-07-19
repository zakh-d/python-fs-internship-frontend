import { ReactElement } from "react";
import { Field } from "react-final-form";

export type InputPropsType = {
    labelText: string;
    name: string;
    type: "text" | "email" | "password" | "number" | "checkbox";
    disabled?: boolean;
}

const Input = ({labelText, name, type, disabled}: InputPropsType): ReactElement => {
    return (
        <Field 
            name={name}
            type={type}
            render={({input, meta}) => (
                <div>
                    <label className="form-label" htmlFor={input.name + '_id'}>{labelText}</label>
                    <input className="form-control" {...input} id={input.name + '_id'} type={type} disabled={disabled}/>
                </div>
            )}
        />
     )
}

export default Input;