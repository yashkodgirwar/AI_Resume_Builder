import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Layout from './pages/Layout'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='app' element={<Layout/>}>  
          <Route index element={<Dashboard/>} />
          <Route path='builder/:resumeId' element={<ResumeBuilder/>} />
          </Route>

                <Route path='view/:resumeId' element={<Preview/>} />
                <Route path='login' element={<Login/>} />

      </Routes>
    </>
  )
}

export default App
