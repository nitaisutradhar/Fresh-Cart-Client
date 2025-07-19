import { Navigate } from 'react-router'
import Loading from '@/components/Loading'
import useRole from '@/hooks/useRole'

const SellerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  console.log('I was here, in SellerRoute')
  if (isRoleLoading) return <Loading />
  if (role === 'vendor') return children
  return <Navigate to='/' replace='true' />
}

export default SellerRoute