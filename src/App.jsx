import { Route, RouterProvider, Routes, useLocation, useNavigate } from 'react-router-dom'
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
import axios from 'axios'
import Certificate from './screens/Certificate/Certificate'
import Test from './screens/Test/Test'
import Privacy from './screens/Privacy/Privacy'
import { authorization } from './services/auth'


function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLogin, setIsLogIn] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [userRole, setUserRole] = useState("user")




  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 560px)").matches)
    if (location.pathname === "/" || location.pathname === "/signin") {
      setIsLogIn(false)
    } else {
      authorization().then((res) => {
        setUserRole(res.user_role)
      })
      setIsLogIn(true)
    }
  }, [location])





  return (
    <>
      {isLogin ? location.pathname === "/profile" ? isMobile ? null : <Header role={userRole} /> : <Header role={userRole} /> : null}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/courses' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/rate' element={<LiderBord />} />
        <Route path='/course/:id' element={<OpenCourse />} />
        <Route path='/lesson/:id/:id' element={<Lesson userRole={userRole} />} />
        <Route path='/test/:id' element={<Test />} />
        <Route path='/doc' element={<Doc />} />

        <Route path='/admin' element={<Admin />} />
        <Route path='/certificate/:id' element={<Certificate />} />

        <Route path='/privacy' element={<Privacy />} />


        {/* <Route path='/unauth' element={<Privacy/>}/> */}

      </Routes>
      {isLogin ? <Footer role={userRole} /> : location.pathname === "/profile" ? <Footer role={userRole} /> : null}
    </>
  )
}

export default App

