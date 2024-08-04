import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/header/Header'
import Login from './screens/Login/Login'
import SignIn from './screens/SignIn/SignIn'
import Home from './screens/Courses/Courses'
import Footer from './components/footer/Footer'
import OpenCourse from './screens/OpenCours/OpenCourse'
import Lesson from './screens/Lesson/Lesson'
import Profile from './screens/Profile/Profile'
import LiderBord from './screens/Rating/LiderBord'
import Admin from './screens/Admin/Admin'
import Doc from './screens/Doc/Doc'
const PORT = "172.20.10.2:8080"
function App() {
  const location = useLocation()
  const [isLogin,setIsLogIn] = useState(false)
  const [isMobile,setIsMobile] = useState(false)
  useEffect(()=>{
    setIsMobile(window.matchMedia("(max-width: 560px)").matches)
    if (location.pathname == "/" || location.pathname == "/signin") {
      setIsLogIn(false)
    } else {
      setIsLogIn(true)
    }
  },[location])
  return (
    <>
      {isLogin ? location.pathname == "/profile" ? isMobile ? null : <Header/> : <Header/> : null  }
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/courses' element={<Home port={PORT}/>}/>
        <Route path='/profile' element={<Profile port={PORT}/>}/>
        <Route path='/rate' element={<LiderBord/>}/>
        <Route path='/course/:id' element={<OpenCourse/>}/>
        <Route path='/lesson/:id/:id' element={<Lesson/>}/>
        <Route path='/doc' element={<Doc/>}/>

        <Route path='/admin' element={<Admin/>} />
      </Routes>
      {isLogin ?  <Footer/> : location.pathname == "/profile" ? <Footer/> : null}
    </>
  )
}

export default App
