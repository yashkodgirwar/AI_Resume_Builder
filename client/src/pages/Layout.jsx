import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'

const Layout = () => {
  return (
    <div>
      <div className='min-h-screen bg-gray-50'>
        <NavigationBar /> 
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
