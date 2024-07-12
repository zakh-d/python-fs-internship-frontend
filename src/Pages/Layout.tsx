import { ReactElement } from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";

const Layout = (): ReactElement => {
    return (
        <div>
            <Header title="FE Internship"/>
            <Outlet/>
        </div>
    )
};

export default Layout;