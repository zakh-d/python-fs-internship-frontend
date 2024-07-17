import { ReactElement } from "react";
import { Form as FinalForm } from "react-final-form";
import Input from "./Input";
import { Link } from "react-router-dom";
import { userApi } from "../Api/users-api";


const sendSignUpRequest = async (values: {
    username: string,
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        password_confirm: string
    }) => {
    try {
        const data = userApi.signUp(
            values.username,
            values.first_name,
            values.last_name,
            values.email,
            values.password,
            values.password_confirm
        );
    } catch (error) {
        console.error(error);
    }
}


const RegistrationForm = () : ReactElement => {
    return (
        <FinalForm
            onSubmit={sendSignUpRequest}
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