import React from 'react'
import Banner from '../components/home/banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Customertestimonial from '../components/home/Customertestimonial'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'


const Home = () => {
  return (
    <div>
    <Banner/>
    <Hero/>
     <Features/>  
     <Customertestimonial/> 
     <CallToAction/>
     <Footer/>
    </div>
  )
}

export default Home
