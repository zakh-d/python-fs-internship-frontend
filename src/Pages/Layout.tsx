import { ReactElement, useEffect } from "react";
import Header from "../Components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { customNavigator } from "../Utils/_helper";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import Loader from "../Components/Loader";
import NotificationList from "../Components/Notification/NotificationList";

const Layout = (): ReactElement => {
    const navigate = useNavigate();
    const isLoading = useSelector((state: RootState) => state.page.isLoading);

    useEffect(() => {
        customNavigator.navigate = navigate;
    }, [navigate])
    return (
        <div>
            <Header title="FE Internship"/>
            {isLoading && <Loader/> }
            <NotificationList/>
            <Outlet/>
        </div>
    )
};

export default Layout;