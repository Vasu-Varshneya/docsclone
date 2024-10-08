import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Nopage from './pages/Nopage';
import Signup from './pages/signup';
import Login from './pages/Login';
import Createdoc from './pages/createdocs'
import LandingPage from './pages/landing';
import About from './pages/About';
function App() {
  const isLogged = localStorage.getItem('isLoggedIn')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home/> } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={isLogged?<Nopage />:<Navigate to='/login'/>} />
        <Route path="/createdocs/:docsid" element={<Createdoc />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
