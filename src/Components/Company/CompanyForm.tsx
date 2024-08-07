import { ReactElement } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import Input from "../Input";

type PropsType = {
    formFunction: (values: any) => void;
    initialValues?: {
        name: string;
        description: string;
        hidden: boolean;
    }
}

const ComapnyForm = ({formFunction, initialValues}: PropsType): ReactElement => {
    return (
        <FinalForm onSubmit={formFunction}
            validate={(values) => {
                const errors: any = {};
                if (!values.name) {
                    errors.name = 'Required';
                }
                if (!values.description) {
                    errors.description = 'Required';
                }
                return errors;
            }}
            render={({handleSubmit, submitting}) => (
                <form className="col-lg-4" onSubmit={handleSubmit}>
                    <Input name="name" labelText="Name" type="text" value={initialValues?.name}/>
                    <Input name="description" labelText="Description" type="text" value={initialValues?.description}/>
                    <Field 
                        name="hidden"
                        type="checkbox"
                        checked={initialValues?.hidden}
                        render={({input}) => (
                            <div className="form-check">
                                <input className="form-check-input" {...input} type="checkbox" id="hidden_id"/>
                                <label className="form-check-label" htmlFor="hidden_id">Hidden</label>
                            </div>
                        )}
                    />
                    <button className="btn btn-primary" type="submit" disabled={submitting}>Update</button>
                </form>
            )}
        />
    )
}

export default ComapnyForm;