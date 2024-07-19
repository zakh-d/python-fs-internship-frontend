import {ReactElement} from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsAuthenticated, selectMe } from "../Store/selectors/auth_selector";
import useAppDispatch from "../Store/hooks/dispatch";
import { eraseAuthInfo } from "../Store/authSlice";

type HeaderProps = {title: string};

const Header = ({title}: HeaderProps): ReactElement => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const me = useSelector(selectMe);
    return (
        <header className="navbar navbar-expand navbar-light shadow mb-4">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">
                    {isAuthenticated ? me?.first_name + " " + me?.last_name : title}
                </span>

                <nav>
                    <ul className="navbar-nav">
                        {isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/users" className="nav-link">All Users</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/companies" className="nav-link">All companies</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <a href="#" onClick={(e ) => {
                                    e.preventDefault();
                                    dispatch(eraseAuthInfo());
                                    localStorage.removeItem("token");
                                }} className="nav-link">Logout</a>
                            </li>
                        </>
                    )}

                    {!isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">Sign Up</NavLink>
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