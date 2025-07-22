import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import SignUp from "@/pages/Authentication/SignUp/SignUp";
import Login from "@/pages/Authentication/Login/login";
import Home from "@/pages/Home/Home";
import ErrorPage from "@/pages/shared/ErrorPage/ErrorPage";
import PrivateRoute from "@/routes/PrivateRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import AddProduct from "@/pages/Dashboard/Vendor/AddProduct";
import VendorRoute from "@/routes/VendorRoute";
import ViewMyProducts from "@/pages/Dashboard/Vendor/ViewMyProducts";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <ErrorPage />,
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
    {
        path: "/dashboard",
        element: 
        <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "/dashboard/vendor/add-product",
                element: 
                <PrivateRoute>
                    <VendorRoute>
                        <AddProduct />
                    </VendorRoute>
                </PrivateRoute>
            },
            {
                path: "/dashboard/vendor/my-products",
                element: 
                <PrivateRoute>
                    <VendorRoute>
                        <ViewMyProducts />
                    </VendorRoute>
                </PrivateRoute>
            }
        ]
    }
]);