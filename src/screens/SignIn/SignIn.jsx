import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../Login/login_signin.css"
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { CiRead, CiUnread, CiUser } from 'react-icons/ci'
import { CiEdit } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { signUp } from '../../services/auth'
import { TbRuler2Off } from 'react-icons/tb'
import { PlayClick } from '../../utils/click'

const SignIn = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [currentError, setCurrentError] = useState("")
  const [loading, SetLoading] = useState(false)

  const [isPassView, setisPassView] = useState(false)

  const handleSubmit = async (e) => {
    PlayClick()
    e.preventDefault();


    if (email.split("@").length == 1 || email.split(".").length == 1) {
      setCurrentError("неверный формат почты")
      return
    }
    if (password.length < 5) {
      setCurrentError("Пароль должен быть длинее 4-х символов")
      return
    }
    signUp(username, email, password).then(resp => {
      navigate("/")
    }).catch((err) => {
      setCurrentError(err.response.data.data)
    })
  }

  return (
    <>
      <Helmet>
        <title>Регистрация</title>
      </Helmet>
      <section onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleSubmit(e)
        }
      }} className="login">
        <div className='login_header'>
          <img height={100} width={100} src="/images/skillCamp.svg" alt="" />
          {/* <p>IN<span>iT</span></p> */}
        </div>

        <div>
          <CiEdit className='icon' />
          <input
            onClick={PlayClick}
            placeholder='Ваше ФИО'
            value={username}
            onChange={(e) => { setCurrentError(""); setUsername(e.target.value) }}
            name="name"
            type="text" />
        </div>

        <div>
          <CiUser className='icon' />
          <input
          onClick={PlayClick}
            placeholder='Адрес Эл.почты'
            value={email}
            onChange={(e) => { setCurrentError(""); setEmail(e.target.value) }}
            name="email"
            type="text" />
        </div>


        <div>
          <CiLock className='icon' />
          <input
          onClick={PlayClick}
            placeholder='Пароль'
            value={password}
            onChange={(e) => { setCurrentError(""); setPassword(e.target.value) }}
            name="password"
            type={isPassView ? "name" : "password"} />

          {
            isPassView ? <CiUnread onClick={() => setisPassView(false)} className='passread' />
              : <CiRead onClick={() => setisPassView(true)} className='passread' />

          }
        </div>

        <button onClick={(e) => handleSubmit(e)}>{loading ? <Loading /> : "Войти"}</button>

        <Link onClick={PlayClick} to="/">Есть аккаунт? Войдите.</Link>

        {
          currentError == "" ? null : <p className='currentError'>{currentError}</p>
        }
      </section>
    </>
  )
}

export default SignIn