import { ReactElement } from "react";
import RegistrationForm from "../Components/RegistrationForm";
import { withoutAuthentication } from "../Utils/hoc/auth_redirect";
import { RootState } from "../Store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserRegistration = ():ReactElement => {
    const signUpStatus = useSelector((state: RootState) => state.users.userCreation.status);

    if (signUpStatus === 'success') {
        return <Navigate to={'/login'}/>
    }

    return (
        <section className="row">
            <h1 className="text-center">User Registration</h1>
            <RegistrationForm/>
        </section>
    );
}

export default withoutAuthentication(UserRegistration);