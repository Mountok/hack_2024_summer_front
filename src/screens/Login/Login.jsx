import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./login_signin.css"
import axios from 'axios'
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    var redirect = true
    console.log("log in logic")
    const req = await axios.post('/api/auth', {
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
      alert(error.response.data.data)
    });

    redirect ? navigate("/courses") : null;
  }
  return (
    <section className="login">

      <h2>Вход в аккаунт</h2>

      <p>Почта пользователя</p>
      <input value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email" type="text"
        placeholder="введите свою почту" />
      <p>Пароль</p>
      <input value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        type="password"
        placeholder="введите свой пароль" />

      <button onClick={(e) => handleSubmit(e)}>Войти</button>

      <Link to="/signin">Нету аккаунта? Зарегистрируйтесь.</Link>
    </section>
  )
}

export default Login