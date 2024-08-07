import { ReactElement, useEffect } from "react";
import Header from "../Components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { customNavigator } from "../Utils/_helper";

const Layout = (): ReactElement => {
    const navigate = useNavigate();

    useEffect(() => {
        customNavigator.navigate = navigate;
    }, [navigate])
    return (
        <div>
            <Header title="FE Internship"/>
            <Outlet/>
        </div>
    )
};

export default Layout;