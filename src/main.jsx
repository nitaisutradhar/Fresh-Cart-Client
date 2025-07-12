import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import AuthProvider from './contexts/AuthContext/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    <ToastContainer position="top-center" autoClose={1100} />
    </AuthProvider>
  </StrictMode>,
)
