import React, { useEffect, useState } from 'react'
import "./header.scss"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from 'react-icons/io';

const Header = ({role}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [scrolledHeader,setScrolledHeader] = useState(false)
    const locations = {
        "/courses": "Курсы",
        "/rate":"Рейтинг",
        "/admin":"Админ панель",
    }
    const [currentLocation,setCurrentLocation] = useState(locations[location.pathname])


    useState(()=>{
        
  document.onscroll = () => {

    console.log(window.scrollY)
    if (window.scrollY > 15){
        setScrolledHeader(true)
    } else {
        setScrolledHeader(false)
    }
  }
  
    },[])

    useEffect(()=>{
        setCurrentLocation(locations[location.pathname])
    })



    return (
        <header className={scrolledHeader ? "header_1 scrolled": "header_1"}>
            <div className="logotype">
                <h2>{currentLocation}</h2>
                <img  onClick={()=>navigate('/courses')}  width={100} src="/images/ico_next.svg" alt="" />
            </div>
            <nav className="nav">
                <Link to='/sources' className={location.pathname == "/sources" ? "nav_links active" : "nav_links"}>Ресурсы</Link>
                <Link to='/courses' className={location.pathname == "/courses" ? "nav_links active" : "nav_links"}>Курсы</Link>
                <Link to='/rate' className={location.pathname == "/rate" ? "nav_links active" : "nav_links"}>Рейтинг</Link>
                <Link to='/profile' className={location.pathname == "/profile" ? "nav_links active" : "nav_links"}>Профиль</Link>
                {
                    role == "admin" ? <Link to='/admin' className={location.pathname == "/admin" ? "nav_links active" : "nav_links"}>Админ</Link> : null
                }
                <Link to='/' className={location.pathname == "/" ? "nav_links active" : "nav_links"} >
                <IoIosLogOut style={{
                    fontSize:"20px"
                    
                    }} />

                </Link>
            </nav>
        </header>
    )
}

export default Header