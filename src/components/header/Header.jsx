import React, { useEffect, useState } from 'react'
import "./header.css"
import { Link, useLocation } from 'react-router-dom'
import { IoIosLogOut } from 'react-icons/io';

const Header = ({role}) => {
    const location = useLocation()

    
    


    return (
        <header className="header_1">
            <div className="logotype">
                <img width={70} src="/images/Group 1.svg" alt="" />
            </div>
            <nav className="nav">
                <Link to='/games' className={location.pathname == "/games" ? "nav_links active" : "nav_links"}>Игры</Link>
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