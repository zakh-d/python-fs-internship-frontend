import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Start from "./Pages/Start";
import PageNotFound from "./Pages/PageNotFound";
import About from "./Pages/About";

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
