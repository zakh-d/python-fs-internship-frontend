import { ReactElement } from "react";
import { Form as FinalForm } from "react-final-form";
import Input from "./Input";
import { authApi } from "../Api/auth-api";
import { Link, useNavigate } from "react-router-dom";


const authenticate = async (values: {username: string, password: string}) => {
    try {
        const data = await authApi.login(values.username, values.password);
        
        if (data.access_token) {
            localStorage.setItem("token", data.access_token);
            return true;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}


const LoginForm = () : ReactElement => {
    const navigate = useNavigate();
    return (
        <FinalForm
            onSubmit={async (values: {username: string, password: string}) => {
                if (await authenticate(values)) {
                    navigate("/");
                }
            }}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit} className="offset-lg-4 col-lg-4 offset-md-2 col-md-8 my-5 pt-3 pb-2 shadow rounded"> 
                    <Input labelText="Username:" name="username" type="text" />
                    <Input labelText="Password:" name="password" type="password"/>
                    <div className="d-flex justify-content-between mb-2">
                        <button type="submit" className="btn flex-fill btn-secondary mt-2 mr-1">Login</button>
                        <div className="m-1"></div>
                        <button type="button" className="btn flex-fill btn-outline-secondary mt-2 ml-1">Auth0</button>
                    </div>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </form>    
            )}/>
    )
};

export default LoginForm