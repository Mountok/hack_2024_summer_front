import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./login_signin.css"
import axios from 'axios'
import Loading from '../../components/loading/Loading'
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";

import { CiRead } from "react-icons/ci";
import { CiUnread } from "react-icons/ci";
import { TbRuler } from 'react-icons/tb'
import { authorization, signIn } from '../../services/auth'


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")
  const [isPassView, setisPassView] = useState(false)

  const [currentError, setCurrentError] = useState("")
  const [loading, SetLoading] = useState(false)


  useEffect(() => {
    authorization().then((req) => {
      navigate("/profile")
    }).catch((req) => {
    })
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    SetLoading(true)

    signIn(email, password).then((resp) => {
      console.log(resp)
      localStorage.setItem("SKUToken", resp.token)
      navigate("/courses")
    }).catch((err) => {
      console.log(err)
      setCurrentError(err.response.data.data)
    })
    SetLoading(false)

  }
  return (
    <>
    
        <section onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e)
          }
        }} className="login">
    
    
          <div className='login_header'>
            <img width={100} src="/images/skillCamp.svg" alt="" />
            {/* <p>IN<span>iT</span></p> */}
          </div>
    
          <div>
            <CiUser className='icon' />
            <input value={email}
              placeholder='Адресс Эл.почты'
              onChange={(e) => { setCurrentError(""); setEmail(e.target.value) }}
              name="email" type="text" />
          </div>
          <div>
            <CiLock className='icon' />
            <input value={password}
              placeholder='Пароль'
              onChange={(e) => { setCurrentError(""); setPassword(e.target.value) }}
              name="password"
              type={isPassView ? "name" : "password"} />
    
            {
              isPassView ? <CiUnread onClick={() => setisPassView(false)} className='passread' />
                : <CiRead onClick={() => setisPassView(true)} className='passread' />
    
            }
    
          </div>
    
    
          <button onClick={(e) => handleSubmit(e)}>{loading ? <Loading /> : "Войти"}</button>
    
          <Link to="/signin">Нет аккаунта? Зарегистрируйтесь.</Link>
    
          {
            currentError == "" ? null : <p className='currentError'>{currentError}</p>
          }
        </section>
    </>
   
  )
}

export default Login