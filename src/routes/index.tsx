import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import MainLayout from "../layouts/MainLayout";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                element: <HomePage />,
                index: true,
            },
            {
                path: '',
                element: "",
            },

        ],

    },

]);
export default router;