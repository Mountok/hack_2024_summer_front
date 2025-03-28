import React, { useEffect, useState } from 'react'
import "./header.scss"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from 'react-icons/io';
import { PlayClick } from '../../utils/click';

const Header = ({role}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [scrolledHeader,setScrolledHeader] = useState(false)
    const locations = {
        "/courses": "Курсы",
        "/rate":"Рейтинг",
        "/admin":"Админ панель",
        "/events":"События",
    }
    const [currentLocation,setCurrentLocation] = useState(locations[location.pathname])


    useState(()=>{
        
  document.onscroll = () => {
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

    const logout = (e) => {
        e.preventDefault()
        localStorage.setItem("SKUToken","-")
        navigate("/")
    }

   
    

    return (
        <header className={scrolledHeader ? "header_1": "header_1"}>
            <div className="logotype">
                <h2>{currentLocation}</h2>
                <img  onClick={()=>navigate('/courses')}  src="/images/skillCamp.svg" alt="" />
            </div>
            <nav className="nav">
            <Link onClick={PlayClick} to='/courses' className={location.pathname == "/courses" ? "nav_links active" : "nav_links"}>Курсы</Link>
            <Link onClick={PlayClick}  to='/events' className={location.pathname == "/events" ? "nav_links active" : "nav_links"}>События</Link>
                <Link onClick={PlayClick}  to='/rate' className={location.pathname == "/rate" ? "nav_links active" : "nav_links"}>Рейтинг</Link>
                <Link onClick={PlayClick}  to='/profile' className={location.pathname == "/profile" ? "nav_links active" : "nav_links"}>Профиль</Link>
                {
                    role == "admin" ? <Link to='/admin' className={location.pathname == "/admin" ? "nav_links active" : "nav_links"}>Админ</Link> : null
                }
                <button  onClick={(e)=>{PlayClick();logout(e)}} className={location.pathname == "/" ? "nav_links active outlink" : "nav_links outlink"} >
                <IoIosLogOut style={{
                    fontSize:"20px"
                    
                    }} />

                </button>
            </nav>
        </header>
    )
}

export default Header