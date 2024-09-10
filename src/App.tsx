import { useEffect } from "react";
import { getCurrentUser } from "./Store/thunks/auth_thunk";
import useAppDispatch from "./Store/hooks/dispatch";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import router from "./Utils/router";
import {Chart as ChartJS, CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import NotificationList from "./Components/Notification/NotificationList";
import { selectIsAuthenticated } from "./Store/selectors/auth_selector";
import { useSelector } from "react-redux";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function App() {
    const dispatch = useAppDispatch()
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        dispatch(getCurrentUser())
    }, [])
    return (
        <>
            <RouterProvider router={router}/>
            {isAuthenticated && <NotificationList/>}
            <ToastContainer 
                position="bottom-left"/>
        </>
    )
}

export default App
