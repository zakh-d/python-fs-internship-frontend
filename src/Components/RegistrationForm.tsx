import { ReactElement } from "react";
import { Form as FinalForm } from "react-final-form";
import Input, { InputPropsType } from "./Input";
import { Link } from "react-router-dom";
import SignUpSchema from "../Types/SignUpSchema";
import useAppDispatch from "../Store/hooks/dispatch";
import { signUp } from "../Store/thunks/users_thunk";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { useAuth0 } from "@auth0/auth0-react";
import { validateEmail } from "../Utils/validate_email";
import { getLoginPath } from "../Utils/router";

const RegistrationForm = () : ReactElement => {
    const dispatch = useAppDispatch();
    const signUpStatus = useSelector((state: RootState) => state.users.userCreation.status);
    const errors = useSelector((state: RootState) => state.users.userCreation.errors);
    const {loginWithRedirect} = useAuth0();

    const fields: InputPropsType[] = [
        {
            labelText: 'Username:',
            name: 'username',
            type: 'text'
        },
        {
            labelText: 'First Name:',
            name: 'first_name',
            type: 'text'
        },
        {
            labelText: 'Last Name:',
            name: 'last_name',
            type: 'text'
        },
        {
            labelText: 'Email:',
            name: 'email',
            type: 'email'
        },
        {
            labelText: 'Password:',
            name: 'password',
            type: 'password'
        },
        {
            labelText: 'Confirm Password:',
            name: 'password_confirm',
            type: 'password',
        }
    ]

    const inputFields = fields.map((field) => <Input {...field} disabled={signUpStatus === 'fetching'}/>);

    return (
        <FinalForm
            onSubmit={async (values: SignUpSchema) => {
                dispatch(signUp(values));
            }}
            validate={(values) => {
                type FormErrorsType = {
                    username?: string;
                    email?: string;
                    password?: string;
                    password_confirm?: string;
                }
                const errors: FormErrorsType = {};

                if (!values.username) {
                    errors.username = 'Required';
                }

                if (!values.email) {
                    errors.email = 'Required';
                }

                if (!values.password) {
                    errors.password = 'Required';
                }

                if (!validateEmail(values.email)) {
                    errors.email = 'Invalid email';
                }

                if (values.password !== values.password_confirm) {
                    errors.password_confirm = 'Passwords do not match';
                }


                return errors;
            }
            }
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit} className="offset-lg-4 col-lg-4 offset-md-2 col-md-8 my-5 pt-3 pb-2 shadow rounded"> 
                    
                    {inputFields}
                    
                    <div className="d-flex justify-content-between mb-2">
                        <button type="submit" className="btn flex-fill btn-secondary mt-2 mr-1" disabled={signUpStatus === 'fetching'}>Register</button>
                        <div className="m-1"></div>
                        <button type="button" className="btn flex-fill btn-outline-secondary mt-2 ml-1" disabled={signUpStatus === 'fetching'}
                                onClick={() => loginWithRedirect({ authorizationParams: {
                                    screen_hint: 'signup',
                                }})}>Auth0</button>
                    </div>
                    {
                        signUpStatus === 'failed' &&
                        <div className="alert alert-danger">
                            <ul>
                                {errors.map((error, index) => <li key={index}>{error}</li>)}
                            </ul>
                        </div>
                    }
                    <p>
                        Already have an account? <Link to={getLoginPath()}>Login</Link>
                    </p>
                </form>    
            )}/>
    )
};

export default RegistrationForm;