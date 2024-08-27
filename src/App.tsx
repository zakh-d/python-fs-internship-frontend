import { useEffect } from "react";
import { getCurrentUser } from "./Store/thunks/auth_thunk";
import useAppDispatch from "./Store/hooks/dispatch";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import router from "./Utils/router";
import {Chart as ChartJS, CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";


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


    useEffect(() => {
        dispatch(getCurrentUser())
    }, [])
    return (
        <>
            <RouterProvider router={router}/>
            <ToastContainer 
                position="bottom-left"/>
        </>
    )
}

export default App
