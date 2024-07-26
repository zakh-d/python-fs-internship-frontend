import { ReactElement, MouseEvent } from "react";
import useAppDispatch from "../Store/hooks/dispatch";
import { eraseAuthInfo } from "../Store/authSlice";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = (): ReactElement => {

    const dispatch = useAppDispatch();
    const {isAuthenticated, logout} = useAuth0();

    const handleLogout = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(eraseAuthInfo());
        localStorage.removeItem("token");
        
        if (isAuthenticated) {
            // authinicated with Auth0
            logout({logoutParams: {returnTo: window.location.origin}});
        }
    }

    return <a href="#" onClick={handleLogout} className="nav-link">Logout</a>
}

export default LogoutButton;