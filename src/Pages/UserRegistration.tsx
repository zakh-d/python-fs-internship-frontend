import { ReactElement } from "react";
import Input from "../Components/Input";

const UserRegistration = ():ReactElement => {
    return (
        <section className="row justify-content-center">
            <h1 className="text-center">User Registration</h1>
            <form className="col-lg-4 my-5 py-5 shadow rounded">
                
                <Input labelText="First Name:" name="first_name" type="text" required={true}/>
                <Input labelText="Last Name:" name="last_name" type="text" required={true}/>
                <Input labelText="Email:" name="email" type="email" required={true}/>
                <Input labelText="Password:" name="password" type="password" required={true}/>
                <Input labelText="Confirm Password:" name="password_confirm" type="password" required={true}/>
                
                <button className="btn btn-primary mt-2">Register</button>
            </form>
        </section>
    );
}

export default UserRegistration;