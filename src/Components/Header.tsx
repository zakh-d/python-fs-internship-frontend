import {ReactElement} from "react";
import { NavLink } from "react-router-dom";

type HeaderProps = {title: string};

const Header = ({title}: HeaderProps): ReactElement => {
    return (
        <header className="navbar navbar-expand navbar-light shadow mb-4">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">{title}</span>

                <nav>
                    <ul className="navbar-nav">
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
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;