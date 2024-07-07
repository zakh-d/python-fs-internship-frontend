import { ReactElement } from "react";

const UserRegistration = ():ReactElement => {
    return (
        <section className="row justify-content-center">
            <h1 className="text-center">User Registration</h1>
            <form className="col-lg-4 my-5 py-5 shadow rounded">
                <div>
                    <label className="form-label" htmlFor="first_name">First Name:</label>
                    <input className="form-control" type="text" id="fist_name" name="first_name" required/>
                </div>
                
                <div>
                    <label className="form-label" htmlFor="last_name">Last Name:</label>
                    <input className="form-control" type="text" id="last_name" name="last_name" required/>
                </div>
                
                <div>
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input className="form-control" type="email" id="email" name="email" required/>
                </div>
                
                <div>
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input className="form-control" type="password" id="password" name="password" required/>
                </div>
                
                <div>
                    <label className="form-label" htmlFor="password_confirm">Confirm Password:</label>
                    <input className="form-control" type="password" id="password_confirm" name="password_confirm" required/>
                </div>
                
                <button className="btn btn-primary mt-2">Register</button>
            </form>
        </section>
    );
}

export default UserRegistration;