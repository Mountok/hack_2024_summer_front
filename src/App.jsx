import {Route, RouterProvider, Routes, useLocation, useNavigate} from 'react-router-dom'
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
import TestQuestion from './screens/TestQuestion/TestQuestion'
import Certificate from './screens/Certificate/Certificate'


function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLogin,setIsLogIn] = useState(false)
  const [isMobile,setIsMobile] = useState(false)
  const [userRole,setUserRole] = useState("user")


  useEffect(()=>{
    setIsMobile(window.matchMedia("(max-width: 560px)").matches)
    if (location.pathname === "/" || location.pathname === "/signin") {
      setIsLogIn(false)
    } else {
      setIsLogIn(true)
      handleSubmit()
    }
  },[location])

  const handleSubmit = async () => {
    console.log("валидация: проверка")
    let isValid = false
    let uuid = localStorage.getItem("PRAXIS_USER_ID")
    const req = await axios.post('/api/validate', {
      user_uuid: uuid
    }).then(function (response) {
      console.log(response);
      if (response.data.is_valid === true) {
        isValid = true
        console.log("валидация: успешна")
        setUserRole(response.data.user[0].role)
        console.log(response.data.user[0].role)
      }
    }).catch(function (error) {
      console.log(error);
    });
    !isValid ? navigate("/") : null;
  }

  return (
    <>
      {isLogin ? location.pathname === "/profile" ? isMobile ? null : <Header role={userRole}/> : <Header role={userRole}/> : null  }
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/courses' element={<Home />}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/rate' element={<LiderBord/>}/>
        <Route path='/course/:id' element={<OpenCourse/>}/>
        <Route path='/lesson/:id/:id' element={<Lesson/>}/>
        <Route path='/test/:id' element={<TestQuestion/>}/>
        <Route path='/doc' element={<Doc/>}/>

        <Route path='/admin' element={<Admin/>} />
        <Route path='/certificate' element={<Certificate/>} />
      </Routes>
      {isLogin ?  <Footer role={userRole}/> : location.pathname === "/profile" ? <Footer role={userRole}/> : null}
    </>
  )
}

export default App

