import { ReactElement } from "react";
import { Form as FinalForm } from "react-final-form";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../Api/users-api";
import SignUpSchema from "../Types/SignUpSchema";


const sendSignUpRequest = async (values: SignUpSchema) => {
    try {
        const data = userApi.signUp(values);

        return true;
    } catch (error) {
        console.error(error);
    }
    return false;
}


const RegistrationForm = () : ReactElement => {
    const navigate = useNavigate();
    return (
        <FinalForm
            onSubmit={async (values: SignUpSchema) => {
                if (await sendSignUpRequest(values)){
                    navigate("/login");
                }
            }}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit} className="offset-lg-4 col-lg-4 offset-md-2 col-md-8 my-5 pt-3 pb-2 shadow rounded"> 
                    
                    <Input labelText="Username:" name="username" type="text"/>
                    <Input labelText="First Name:" name="first_name" type="text"/>
                    <Input labelText="Last Name:" name="last_name" type="text"/>
                    <Input labelText="Email:" name="email" type="email"/>
                    <Input labelText="Password:" name="password" type="password"/>
                    <Input labelText="Confirm Password:" name="password_confirm" type="password"/>
                    
                    <div className="d-flex justify-content-between mb-2">
                        <button type="submit" className="btn flex-fill btn-secondary mt-2 mr-1">Register</button>
                        <div className="m-1"></div>
                        <button type="button" className="btn flex-fill btn-outline-secondary mt-2 ml-1">Auth0</button>
                    </div>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>    
            )}/>
    )
};

export default RegistrationForm;