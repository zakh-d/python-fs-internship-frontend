import { ReactElement, useEffect } from "react";
import { Form as FinalForm } from "react-final-form";
import Input from "./Input";

import { Link } from "react-router-dom";
import useAppDispatch from "../Store/hooks/dispatch";
import { getAuth0Token, loginUser } from "../Store/thunks/auth_thunk";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { useAuth0 } from "@auth0/auth0-react";
import { loginStarted } from "../Store/authSlice";


const LoginForm = () : ReactElement => {
    const dispatch = useAppDispatch();
    const loginStatus = useSelector((state: RootState) => state.auth.loginStatus);
    const {loginWithRedirect, isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getAuth0Token(getAccessTokenSilently()));
        }
    }, [isAuthenticated]);

    return (

        <FinalForm
            onSubmit={async (values: {username: string, password: string}) => {
                dispatch(loginUser(values.username, values.password));    
            }}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit} className="offset-lg-4 col-lg-4 offset-md-2 col-md-8 my-5 pt-3 pb-2 shadow rounded">
                    <Input labelText="Username:" name="username" type="text" disabled={loginStatus === 'fetching'}/>
                    <Input labelText="Password:" name="password" type="password" disabled={loginStatus === 'fetching'}/>
                    {loginStatus === 'failed' && 
                    <div className="alert alert-danger mt-2">Invalid Credentials</div>
                    } 
                    <div className="d-flex justify-content-between mb-2">
                        <button type="submit" 
                                className="btn flex-fill btn-secondary mt-2 mr-1" 
                                disabled={loginStatus==='fetching'}>Login</button>
                        <div className="m-1"></div>
                        <button type="button" 
                                className="btn flex-fill btn-outline-secondary mt-2 ml-1" 
                                disabled={loginStatus==='fetching'}
                                onClick={() => {
                                    dispatch(loginStarted());
                                    loginWithRedirect();
                                }}
                        >Auth0</button>
                    </div> 
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </form>    
            )}/>
    )
};

export default LoginForm