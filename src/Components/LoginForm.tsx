import { ReactElement } from "react";
import { Form as FinalForm } from "react-final-form";
import Input from "./Input";

import { Link } from "react-router-dom";
import useAppDispatch from "../Store/hooks/dispatch";
import { loginUser } from "../Store/thunks/auth_thunk";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
// import { useAuth0 } from "@auth0/auth0-react";
// import { loginStarted } from "../Store/authSlice";
import { validateEmail } from "../Utils/validate_email";
import { getRegisterPath } from "../Utils/router";

type LoginData = {
    email: string;
    password: string;
}

const LoginForm = () : ReactElement => {
    const dispatch = useAppDispatch();
    const loginStatus = useSelector((state: RootState) => state.auth.loginStatus);
    // const {loginWithRedirect, isAuthenticated, getAccessTokenSilently } = useAuth0();

    // if (isAuthenticated) {
    //     useEffect(() => {
    //     dispatch(getAuth0Token(getAccessTokenSilently()));
    //     }
    // }, [isAuthenticated]);

    return (

        <FinalForm
            onSubmit={async (values: LoginData) => {
                dispatch(loginUser(values.email, values.password));    
            }}
            validate={(values: LoginData) => {
                const errors: {email?: string, password?: string} = {};
                if (!values.email) {
                    errors.email = "Required";
                }
                if (!validateEmail(values.email)) {
                    errors.email = "Invalid email";
                }
                if (!values.password) {
                    errors.password = "Required";
                }
                return errors;
            }}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit} className="offset-lg-4 col-lg-4 offset-md-2 col-md-8 my-5 pt-3 pb-2 shadow rounded">
                    <Input labelText="Email:" name="email" type="email" disabled={loginStatus === 'fetching'}/>
                    <Input labelText="Password:" name="password" type="password" disabled={loginStatus === 'fetching'}/>
                    {loginStatus === 'failed' && 
                    <div className="alert alert-danger mt-2">Invalid Credentials</div>
                    } 
                    <div className="d-flex justify-content-between mb-2">
                        <button type="submit" 
                                className="btn flex-fill btn-secondary mt-2 mr-1" 
                                disabled={loginStatus==='fetching'}>Login</button>
                        <div className="m-1"></div>
                        {/* <button type="button" 
                                className="btn flex-fill btn-outline-secondary mt-2 ml-1" 
                                disabled={loginStatus==='fetching'}
                                onClick={() => {
                                    dispatch(loginStarted());
                                    loginWithRedirect();
                                }}
                        >Auth0</button> */}
                    </div> 
                    <p>
                        Don't have an account? <Link to={getRegisterPath()}>Register</Link>
                    </p>
                </form>    
            )}/>
    )
};

export default LoginForm