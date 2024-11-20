import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./login_signin.css"
import axios from 'axios'
import Loading from '../../components/loading/Loading'
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";

import { CiRead } from "react-icons/ci";
import { CiUnread } from "react-icons/ci";
import { TbRuler } from 'react-icons/tb'


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")
  const [isPassView,setisPassView] = useState(true)




  const [currentError,setCurrentError] = useState("")
  const [loading,SetLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    SetLoading(true)
    var redirect = true
    console.log("log in logic")
    const req = await axios.post('/api/auth', {
      id: "",
      email:  email,
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
<img width={100} src="/images/skillCamp.svg" alt="" />
{/* <p>IN<span>iT</span></p> */}
      </div>

<div>
<CiUser className='icon'/>
      <input value={email}
      placeholder='Адресс Эл.почты'
        onChange={(e) => {setCurrentError("");setEmail(e.target.value)}}
        name="email" type="text" />
</div>
<div>
<CiLock className='icon'/>
      <input value={password}
      placeholder='Пароль'
        onChange={(e) => {setCurrentError("");setPassword(e.target.value)}}
        name="password"
        type={isPassView ? "name" : "password"} />
        
        {
          isPassView ? <CiUnread onClick={()=>setisPassView(false)} className='passread'/> 
          :            <CiRead onClick={()=>setisPassView(true)} className='passread'/>

        }

        </div>


      <button onClick={(e) => handleSubmit(e)}>{loading ?  <Loading/> : "Войти" }</button>

      <Link to="/signin">Нет аккаунта? Зарегистрируйтесь.</Link>

      {
        currentError == "" ? null : <p className='currentError'>{currentError}</p>
      }
    </section>
  )
}

export default Login