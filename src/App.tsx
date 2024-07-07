import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Start from "./Pages/Start";
import PageNotFound from "./Pages/PageNotFound";
import About from "./Pages/About";
import { users } from "./Store/DummyData";
import AllUsers from "./Pages/AllUsers";

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
