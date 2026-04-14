import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import {useSelector} from 'react-redux'
import { Loader } from 'lucide-react'
import Login from './Login'

const Layout = () => {
  const {user,loading}=useSelector(state => state.auth)
  if(loading){
    return <Loader/>
  }
  return (
    <div>
      {
        user ? ( <div className='min-h-screen bg-gray-50'>
        <NavigationBar /> 
        <Outlet />
      </div>) :<Login/>
      }
     
    </div>
  )
}

export default Layout
