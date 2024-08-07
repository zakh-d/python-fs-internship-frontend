import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Start from "./Pages/Start";
import About from "./Pages/About";
import AllUsers from "./Pages/AllUsers";
import UserProfile from "./Pages/UserProfile";
import AllCompanies from "./Pages/AllCompanies";
import CompanyProfile from "./Pages/CompanyProfile";
import Layout from "./Pages/Layout";
import UserAuthorization from "./Pages/UserAuthorization";
import UserRegistration from "./Pages/UserRegistration";
import { useEffect } from "react";
import { getCurrentUser } from "./Store/thunks/auth_thunk";
import useAppDispatch from "./Store/hooks/dispatch";
import Toast from "./Components/Toast";

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
                element: <UserProfile editing={false}/>,
            },
            {
                path: "users/:userId/edit",
                element: <UserProfile editing={true}/>,
            },
            {
                path: "users/:userId/edit/password",
                element: <UserProfile editing={true} changePassword={true}/>,
            },
            {
                path: "companies", 
                element: <AllCompanies showingAllCompanies={true}/>
            },
            {
                path: "companies/my",
                element: <AllCompanies showingAllCompanies={false}/>
            },
            {
                path: "companies/:companyId",
                element: <CompanyProfile openedTab="info"/>
            },
            {
                path: "companies/:companyId/members",
                element: <CompanyProfile openedTab="members"/>
            }, 
            {
                path: "companies/:companyId/edit",
                element: <CompanyProfile openedTab="edit"/>
            },
            {
                path: "companies/:companyId/invites",
                element: <CompanyProfile openedTab="invites"/>
            },
            {
                path: "companies/:companyId/requests",
                element: <CompanyProfile openedTab="requests"/>
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
    }, [])
    return (
        <>
            <RouterProvider router={router}/>
            <Toast/>
        </>
    )
}

export default App
