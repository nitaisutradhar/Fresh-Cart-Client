import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import SignUp from "@/pages/Authentication/SignUp/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <h1>Page not found</h1>,
        children: [
            {
                index: true,
                path: "/signup",
                Component: SignUp,
            }
        ],
    },
]);