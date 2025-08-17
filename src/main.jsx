import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import AuthProvider from './contexts/AuthContext/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/Toggle/theme-provider'
// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={1100} />
      </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
    
  </StrictMode>,
)
