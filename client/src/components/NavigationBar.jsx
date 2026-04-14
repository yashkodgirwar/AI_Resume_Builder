import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice';

const NavigationBar = () => {
     const user=useSelector(state=> state.auth.user)
     const dispatch=useDispatch()
        const navigate=useNavigate();
        const logoutUser=()=>{
            navigate('/');
             dispatch(logout())
        };

  return (
    <div className='shadow bg-white'>
        <nav className='flex items-centre justify-between max-w-7xl mx-auto py-4 px-3.5 text-slate-800 transition-all'>
            <Link to="/">
            <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
            </Link>
            <div className='flex items-center gap-4 text-sm'>
                <p className='max-sm:hidden'>
                    Hi,{user?.name}
                </p>
                <button onClick={logoutUser} className='bg-white hover:bg-slate-50 border border-grey-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default NavigationBar
