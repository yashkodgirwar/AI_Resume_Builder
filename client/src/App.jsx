import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Layout from './pages/Layout'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import { useEffect } from 'react'
import {Toaster} from'react-hot-toast'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  const dispatch=useDispatch()

  const getUserData =async ()=>{
    const token =localStorage.getItem('token')
    try{
      if(token){
        const {data}=await api.get('/api/users/data',{headers:{
          Authorization:token}})
          if(data.user){
            dispatch(login({token,user:data.user}))
          }
          dispatch(setLoading(false))
        }else{
          dispatch(setLoading(false))
        }
      } catch (error){
        dispatch(setLoading(false))
        console.log(error.message)
      }
      }
    
    

    useEffect(()=>{
      getUserData()
    })
  
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/reset-password/:token' element={<ResetPassword/>} />
        <Route path='app' element={<Layout/>}>  
          <Route index element={<Dashboard/>} />
          <Route path='builder/:resumeId' element={<ResumeBuilder/>} />
          </Route>

                <Route path='view/:resumeId' element={<Preview/>} />

      </Routes>
    </>
  )

}
export default App
