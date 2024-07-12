import { ReactElement } from "react";
import Input from "../Components/Input";

const UserAuthorization = ():ReactElement => {
    return (
        <section className="row justify-content-center">
            <h1 className="text-center">User Authorization</h1>
            <form className="col-lg-4 my-5 py-5 shadow rounded">
                
                <Input labelText="Email:" name="email" type="email" required={true}/>
                <Input labelText="Password:" name="password" type="password" required={true}/>
                
                <button className="btn btn-primary mt-2">Login</button>
            </form>
        </section>
    );
}

export default UserAuthorization;