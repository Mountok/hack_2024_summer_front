import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./login_signin.css"
import axios from 'axios'
import Loading from '../../components/loading/Loading'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [currentError,setCurrentError] = useState("")
  const [loading,SetLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetLoading(true)
    var redirect = true
    console.log("log in logic")
    const req = await axios.post('/api/auth', {
      id: "",
      email: email,
      password: password,
      create_date: ""
    }).then(function (response) {
      console.log(response);
      localStorage.setItem("PRAXIS_USER_ID", response.data.user_info.id)
      
    }).catch(function (error) {
      console.log(error);
      redirect = false
      setCurrentError(error.response.data.data)
    });
    SetLoading(false)
    redirect ? navigate("/courses") : null;
  }
  return (
    <section onKeyPress={(e)=>{
      if (e.key === "Enter") {
        handleSubmit(e)
      }
    }} className="login">

      
<div className='login_header'>
      <img width={100} height={100} src="/images/Group 1.svg" alt="" />
      {/* <p>IN<span>iT</span></p> */}
      </div>

      <p>E-mail</p>
      <input value={email}
        onChange={(e) => {setCurrentError("");setEmail(e.target.value)}}
        name="email" type="text" />
      <p>Password</p>
      <input value={password}
        onChange={(e) => {setCurrentError("");setPassword(e.target.value)}}
        name="password"
        type="password" />

      <button onClick={(e) => handleSubmit(e)}>{loading ?  <Loading/> : "Войти" }</button>

      <Link to="/signin">Нету аккаунта? Зарегистрируйтесь.</Link>

      {
        currentError == "" ? null : <p className='currentError'>{currentError}</p>
      }
    </section>
  )
}

export default Login