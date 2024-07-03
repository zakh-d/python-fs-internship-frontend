import {ReactElement} from "react";

type HeaderProps = {title: string};

const Header = ({title}: HeaderProps): ReactElement => {
    return (
        <header className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">{title}</span>
            </div>
        </header>
    )
}

export default Header;