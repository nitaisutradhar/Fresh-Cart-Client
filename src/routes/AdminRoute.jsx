import { Navigate, useLocation } from 'react-router'
import useRole from '../hooks/useRole'
import Loading from '@/components/Loading'

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()
  const location = useLocation()
  console.log(location)
  console.log('in Admin route')
  if (isRoleLoading) return <Loading />
  if (role === 'admin') return children
  return <Navigate to='/' replace='true' />
}

export default AdminRoute