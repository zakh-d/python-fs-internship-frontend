import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Start from "./Pages/Start";
import PageNotFound from "./Pages/PageNotFound";
import React from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Start/>
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
