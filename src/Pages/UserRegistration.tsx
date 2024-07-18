import { ReactElement } from "react";
import RegistrationForm from "../Components/RegistrationForm";
import { withoutAuthentication } from "../Utils/hoc/auth_redirect";

const UserRegistration = ():ReactElement => {
    return (
        <section className="row">
            <h1 className="text-center">User Registration</h1>
            <RegistrationForm/>
        </section>
    );
}

export default withoutAuthentication(UserRegistration);