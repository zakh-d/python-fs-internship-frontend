import { ReactElement } from "react";
import { Field } from "react-final-form";

export type InputPropsType = {
    labelText: string;
    name: string;
    type: "text" | "email" | "password" | "number" | "checkbox";
    disabled?: boolean;
    value?: string;
}

const Input = ({labelText, name, type, disabled, value}: InputPropsType): ReactElement => {
    return (
        <Field 
            name={name}
            type={type}
            initialValue={value}
            render={({input, meta}) => (
                <div>
                    <label className="form-label" htmlFor={input.name + '_id'}>{labelText} <code>   </code>
                    { meta.error && meta.touched && <span className="text-danger">{meta.error}</span> }
                    </label>
                    <input className="form-control" {...input} id={input.name + '_id'} type={type} value={input.value} disabled={disabled}/>
                    
                </div>
            )}
        />
     )
}

export default Input;