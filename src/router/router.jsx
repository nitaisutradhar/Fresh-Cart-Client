import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import SignUp from "@/pages/Authentication/SignUp/SignUp";
import Login from "@/pages/Authentication/Login/login";
import Home from "@/pages/Home/Home";
import Loading from "@/components/Loading";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <Loading />,
        children: [
            {
                index: true,
                path: "/",
                Component: Home,
            },
            {
                path: "/signup",
                Component: SignUp,
            },
            {
                path: "/login",
                Component: Login,
            }
        ],
    },
]);