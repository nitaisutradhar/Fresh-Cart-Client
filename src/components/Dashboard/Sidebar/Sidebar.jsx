import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'

import AdminMenu from './Menu/AdminMenu'
import UserMenu from './Menu/UserMenu'
import VendorMenu from './Menu/VendorMenu'

import useAuth from '@/hooks/useAuth'
import useRole from '@/hooks/useRole'
import Loading from '@/components/Loading'
import { ListCollapse } from 'lucide-react'
import { useNavigate } from 'react-router'

const Sidebar = () => {
  const { logOut, user } = useAuth()
  const [isActive, setIsActive] = useState(false)
  const [role, isRoleLoading] = useRole()
  const navigate = useNavigate()

  const handleToggle = () => setIsActive(!isActive)

  if (isRoleLoading) return <Loading />

  return (
    <div className='relative'>
      {/* Small screen top bar */}
      <div className='absolute -bottom-5 z-50 bg-muted flex justify-between md:hidden px-3 py-2 rounded-xl shadow-sm'>
        <button
          onClick={handleToggle}
          className='text-primary focus:outline-none text-2xl'
        >
          <ListCollapse />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-40 md:absolute flex flex-col justify-between md:min-h-screen bg-white dark:bg-card border-r dark:border-border w-full md:w-64 space-y-6 px-4 py-5 inset-y-0 left-0 transform ${
          isActive ? '-translate-x-full h-0 md:h-full' : 'translate-x-0'
        } md:translate-x-0 transition duration-300 ease-in-out shadow-lg`}
      >

        {/* Navigation */}
        <div className='flex flex-col justify-between flex-1 mt-6'>
          <nav className="space-y-2">
            {role === 'user' && <UserMenu />}
            {role === 'vendor' && <VendorMenu />}
            {role === 'admin' && <AdminMenu />}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="space-y-2">
          {/* User Info */}
          <button
            className='flex items-center gap-2 px-4 py-2 w-full text-gray-700 dark:text-foreground hover:bg-green-100 dark:hover:bg-muted rounded-md transition-colors duration-300'
            onClick={() => navigate('/dashboard/profile')}
          >
            <img
              src={user?.photoURL || 'https://i.pravatar.cc/40?img=3'}
              alt={user?.displayName || 'User'}
              className='w-8 h-8 rounded-full object-cover'
            />
            <span className='font-medium'>Profile</span>
          </button>
          {/* Divider */}
          <hr className='border-gray-200 dark:border-border' />
          {/* Logout Button */}
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 text-red-600 dark:text-destructive hover:bg-red-50 dark:hover:bg-destructive/10 hover:text-red-700 dark:hover:text-destructive rounded-md transition-colors duration-300'
          >
            <GrLogout className='w-5 h-5' />
            <span className='ml-3 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
