import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../Login/login_signin.css"
import axios from 'axios'

const SignIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (email.split("@").length == 1 || email.split(".").length == 1 ) {
      alert("неверный формат почты")
      return
    }
    if (password.length < 5) {
      alert("Пароль должен быть длинее 4-х символов")
      return
    }
    var redirect = true
    console.log("reg logic")
    const req = await axios.post('/api/reg', {
      id: 0,
      email: email,
      password: password,
      create_date: ""
    }).then(function (response) {
      console.log(response);
      localStorage.setItem("PRAXIS_USER_ID", response.data.data)
    }).catch(function (error) {
      console.log(error);
      redirect = false
      alert(error.response.data.split("\"")[3])
    });

    redirect ? navigate("/courses") : null;
  }

  return (
    <section className="login">
      <h2>Регистрация</h2>
      <p>Почта пользователя</p>
      <input 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} 
      name="email" 
      type="text" 
      placeholder="введите свою почту" />
      <p>Пароль</p>
      <input 
      value={password} 
      onChange={(e) => setPassword(e.target.value)} 
      name="password" 
      type="password" 
      placeholder="введите свой пароль" />

      <button onClick={(e)=>handleSubmit(e)}>Создать аккаунт</button>

      <Link to="/">Есть аккаунт? Войдите.</Link>
    </section>
  )
}

export default SignIn