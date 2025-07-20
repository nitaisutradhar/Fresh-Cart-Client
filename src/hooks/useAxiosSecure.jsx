import axios from 'axios'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import useAuth from './useAuth'

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// ✅ Attach interceptors only once
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosSecure.interceptors.response.use(
  (res) => res,
  async (error) => {
    // We'll handle logout in hook where we have access to navigate and context
    return Promise.reject(error)
  }
)

const useAxiosSecure = () => {
  const { logOut } = useAuth()
  const navigate = useNavigate()

  // Optional: Handle auth errors globally (on client side)
  useEffect(() => {
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.error('⛔ Unauthorized request:', error.response)
          await logOut()
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )

    return () => {
      // Cleanup the interceptor on unmount
      axiosSecure.interceptors.response.eject(resInterceptor)
    }
  }, [logOut, navigate])

  return axiosSecure
}

export default useAxiosSecure
