import { ReactElement } from "react";
import LoginForm from "../Components/LoginForm";

const UserAuthorization = ():ReactElement => {
    return (
        <section className="row">
            <h1 className="text-center">User Authorization</h1>
            <LoginForm/>
        </section>
    );
}

export default UserAuthorization;