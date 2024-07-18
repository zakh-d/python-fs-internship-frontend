import { ReactElement } from "react";
import LoginForm from "../Components/LoginForm";
import { withoutAuthentication } from "../Utils/hoc/auth_redirect";

const UserAuthorization = ():ReactElement => {
    return (
        <section className="row">
            <h1 className="text-center">User Authorization</h1>
            <LoginForm/>
        </section>
    );
}

export default withoutAuthentication(UserAuthorization);