import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'

import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import UserMenu from './Menu/UserMenu'
import VendorMenu from './Menu/VendorMenu'

import { NavLink } from 'react-router'
import useAuth from '@/hooks/useAuth'
import useRole from '@/hooks/useRole'
import Loading from '@/components/Loading'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setIsActive] = useState(false)
  const [role, isRoleLoading] = useRole()

  const handleToggle = () => setIsActive(!isActive)

  if (isRoleLoading) return <Loading />

  return (
    <>
      {/* Small screen top bar */}
      <div className='bg-muted flex justify-between md:hidden px-4 py-3 shadow-sm'>
        <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <img src="/logo.png" alt="FreshCart Logo" className="h-8 w-8" />
          <span>FreshCart</span>
        </NavLink>
        <button
          onClick={handleToggle}
          className='text-primary focus:outline-none text-2xl'
        >
          <AiOutlineBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-40 md:fixed flex flex-col justify-between bg-white border-r w-full md:w-64 space-y-6 px-4 py-5 inset-y-0 left-0 transform ${
          isActive ? '-translate-x-full h-0 md:h-full' : 'translate-x-0'
        } md:translate-x-0 transition duration-300 ease-in-out shadow-lg`}
      >
        {/* Logo */}
        <div className="hidden md:flex items-center gap-2 justify-center py-2 bg-muted rounded-lg shadow-sm">
          <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <img src="/logo.png" alt="FreshCart Logo" className="h-8 w-8" />
            <span>FreshCart</span>
          </NavLink>
        </div>

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
          <MenuItem
            icon={FcSettings}
            label='Profile'
            address='/dashboard/profile'
          />
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors duration-300'
          >
            <GrLogout className='w-5 h-5' />
            <span className='ml-3 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
