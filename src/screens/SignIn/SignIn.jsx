import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../Login/login_signin.css"
import axios from 'axios'
import { Helmet } from 'react-helmet'

const SignIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [currentError,setCurrentError] = useState("")


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (email.split("@").length == 1 || email.split(".").length == 1 ) {
      setCurrentError("неверный формат почты")
      return
    }
    if (password.length < 5) {
      setCurrentError("Пароль должен быть длинее 4-х символов")
      return
    }
    var redirect = true
    console.log("reg logic")
    const req = await axios.post('/api/reg', {
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
      setCurrentError(error.response.data.split("\"")[3])
      
    });

    redirect ? navigate("/courses") : null;
  }

  return (
    <>
    <Helmet>
                <title>Регистрация</title>
            </Helmet>
    <section className="login">
      <h2>Создайте аккаунт</h2>
      <p>E-mail</p>
      <input 
      value={email} 
      onChange={(e) => {setCurrentError("");setEmail(e.target.value)}} 
      name="email" 
      type="text" />
      <p>Password</p>
      <input 
      value={password} 
      onChange={(e) => {setCurrentError("");setPassword(e.target.value)}} 
      name="password" 
      type="password"/>

      <button onClick={(e)=>handleSubmit(e)}>Войти
      </button>

      <Link to="/">Есть аккаунт? Войдите.</Link>

      {
        currentError == "" ? null : <p className='currentError'>{currentError}</p>
      }
    </section>
    </>
  )
}

export default SignIn