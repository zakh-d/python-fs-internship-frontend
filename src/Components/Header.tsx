import {ReactElement} from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { selectIsAuthenticated, selectMe } from "../Store/selectors/auth_selector";
import LogoutButton from "./LogoutButton";
import { getAboutPath, getCompanyListPath, getLoginPath, getMyInvitesPath, getMyRequestsPath, getRegisterPath, getUserListPath, getUserProfilePath } from "../Utils/router";

type HeaderProps = {title: string};

const Header = ({title}: HeaderProps): ReactElement => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const me = useSelector(selectMe);
    return (
        <header className="navbar navbar-expand navbar-light shadow mb-4">
            <div className="container-fluid">
                    {me ? <Link className="navbar-brand mb-0 h1" to={getUserProfilePath(me.id)}>{me.username}</Link> :
                    <span className="navbar-brand mb-0 h1">
                        {title}
                    </span>
                    }

                <nav>
                    <ul className="navbar-nav">
                        {isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={getUserListPath()} className="nav-link">All Users</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Compaies
                                </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to={getCompanyListPath()}>All Comapnies</NavLink></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><NavLink className="dropdown-item" to={getMyInvitesPath()}>Invites</NavLink></li>
                                    <li><NavLink className="dropdown-item" to={getMyRequestsPath()}>Requests</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink to={getAboutPath()} className="nav-link">About</NavLink>
                            </li>
                            <li className="nav-item">
                               <LogoutButton /> 
                            </li>
                        </>
                    )}

                    {!isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={getLoginPath()} className="nav-link">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={getRegisterPath()} className="nav-link">Sign Up</NavLink>
                            </li>
                        </>
                    )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;