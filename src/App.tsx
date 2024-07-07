import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Start from "./Pages/Start";
import PageNotFound from "./Pages/PageNotFound";
import About from "./Pages/About";
import UserList from "./Pages/UserList";
import { users } from "./Store/DummyData";

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
        element: <UserList users={users}/>,
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
