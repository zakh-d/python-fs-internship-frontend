import { useEffect } from "react";
import { getCurrentUser } from "./Store/thunks/auth_thunk";
import useAppDispatch from "./Store/hooks/dispatch";
import Toast from "./Components/Toast";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import router from "./Utils/router";

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
            <Toast/>
        </>
    )
}

export default App
