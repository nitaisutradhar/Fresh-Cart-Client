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
import UpdateProduct from "@/pages/Dashboard/Vendor/UpdateProduct";
import AddAdvertisement from "@/pages/Dashboard/Vendor/AddAdvertisement";
import MyAdvertisements from "@/pages/Dashboard/Vendor/MyAdvertisements";
import WelcomeDashboard from "@/pages/Dashboard/WelcomeDashboard";
import AllProducts from "@/pages/All Products/AllProducts";
import AdminRoute from "@/routes/AdminRoute";
import AllUsers from "@/pages/Dashboard/Admin/AllUsers";
import AllProductsAdmin from "@/pages/Dashboard/Admin/AllProductsAdmin";
import AllAdvertisements from "@/pages/Dashboard/Admin/AllAdvertisements";
import DetailsPage from "@/pages/DetailsPage/DetailsPage";

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
            },
            {
                path: "/all-products",
                element: <AllProducts />
            },
            {
                path: "/product-details/:id",
                element: 
                <PrivateRoute>
                    <DetailsPage />
                </PrivateRoute>
            }
        ],
    },
    {
        path: "/dashboard",
        element: 
        <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                path: "/dashboard",
                element: <WelcomeDashboard />
            },
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
                },
            {
                path: "/dashboard/update-product/:id",
                element:
                <PrivateRoute>
                        <UpdateProduct />
                </PrivateRoute>
            },
            {
                path: '/dashboard/vendor/add-advertisement',
                element:
                <PrivateRoute>
                    <VendorRoute>
                        <AddAdvertisement />
                    </VendorRoute>
                </PrivateRoute>
            },
            {
                path: "/dashboard/vendor/my-advertisements",
                element: 
                <PrivateRoute><VendorRoute><MyAdvertisements /></VendorRoute></PrivateRoute>
            },
            {
                path: "/dashboard/admin/all-users",
                element:
                <PrivateRoute>
                    <AdminRoute>
                        <AllUsers></AllUsers>
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path: "/dashboard/admin/all-products",
                element:
                <PrivateRoute>
                    <AdminRoute>
                        <AllProductsAdmin />
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path: "/dashboard/admin/all-advertisements",
                element:
                <PrivateRoute>
                    <AdminRoute>
                        <AllAdvertisements />
                    </AdminRoute>
                </PrivateRoute>
            }
        ]
    }
]);