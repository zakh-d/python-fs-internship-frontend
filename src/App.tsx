import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Start from "./Pages/Start";
import About from "./Pages/About";
import { companies } from "./Store/DummyData";
import AllUsers from "./Pages/AllUsers";
import UserProfile from "./Pages/UserProfile";
import { companyLoader, userLoader } from "./Utils/loaders";
import AllCompanies from "./Pages/AllCompanies";
import CompanyProfile from "./Pages/CompanyProfile";
import Layout from "./Pages/Layout";
import UserAuthorization from "./Pages/UserAuthorization";
import UserRegistration from "./Pages/UserRegistration";
import { useEffect } from "react";
import { getCurrentUser } from "./Store/thunks/auth_thunk";
import useAppDispatch from "./Store/hooks/dispatch";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        // errorElement: <PageNotFound/>,
        children: [
            {
                path: "",
                element: <Start/>
            },
            {
                path: "about",
                element: <About/>
            },
            {
                path: "users",
                element: <AllUsers/>,
            },
            {
                path: "users/:userId",
                element: <UserProfile/>,
            },
            {
                path: "companies", 
                element: <AllCompanies allCompanies={companies}/>
            },
            {
                path: "companies/:companyId",
                element: <CompanyProfile/>,
                loader: companyLoader
            },
            {
                path: "login",
                element: <UserAuthorization/>
            },
            {
                path: "register",
                element: <UserRegistration/>
            }
        ]
    },
]);

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCurrentUser())
    }, [localStorage.getItem("token")])
    return (
        <RouterProvider router={router}/>
    )
}

export default App
