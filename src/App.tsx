import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Start from "./Pages/Start";
import PageNotFound from "./Pages/PageNotFound";
import About from "./Pages/About";
import { companies, users } from "./Store/DummyData";
import AllUsers from "./Pages/AllUsers";
import UserProfile from "./Pages/UserProfile";
import { companyLoader, userLoader } from "./Utils/loaders";
import AllCompanies from "./Pages/AllCompanies";
import CompanyProfile from "./Pages/CompanyProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Start/>
    },
    {
        path: "/about",
        element: <About/>
    },
    {
        path: "/users",
        element: <AllUsers allUsers={users}/>,
    },
    {
        path: "/users/:userId",
        element: <UserProfile/>,
        loader: userLoader
    },
    {
        path: "/companies", 
        element: <AllCompanies allCompanies={companies}/>
    },
    {
        path: "/companies/:companyId",
        element: <CompanyProfile/>,
        loader: companyLoader
    },
    {
        path: "*",
        element: <PageNotFound/>
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
