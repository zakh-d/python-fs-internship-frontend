import { ReactElement, useEffect } from "react";
import LoginForm from "../Components/LoginForm";
import { withoutAuthentication } from "../Utils/hoc/auth_redirect";
import useAppDispatch from "../Store/hooks/dispatch";
import { signUpReset } from "../Store/userSlice";
import { RootState } from "../Store/store";
import { useSelector } from "react-redux";

const UserAuthorization = ():ReactElement => {
    const dispatch = useAppDispatch();
    const signUpStatus = useSelector((state: RootState) => state.users.userCreation.status);

    useEffect(() => {
        dispatch(signUpReset());
    }, [signUpStatus]);
    return (
        <section className="row">
            <h1 className="text-center">User Authorization</h1>
            <LoginForm/>
        </section>
    );
}

export default withoutAuthentication(UserAuthorization);