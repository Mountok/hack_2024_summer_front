import React, { useState } from 'react'
import "../header/header.css"

import { IoCopy } from "react-icons/io5";
import { IoDice } from "react-icons/io5";
import { IoFlashSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiAdminLine } from "react-icons/ri";

const Footer = () => {
    const [isAdmin,setIsAdmin] = useState(localStorage.getItem("PRAXIS_USER_ID") == "2" ? true : false)

    const location = useLocation()

    return (
        <footer className="header_2">
            <nav className="nav">
                <Link to='/games'
                    className={location.pathname == "/games" ? "nav_links active" : "nav_links"}>
                    <IoDice />
                    Игры
                </Link>
                <Link
                    to='/courses'
                    className={location.pathname == "/courses" ? "nav_links active" : "nav_links"}>
                    <IoCopy />
                    Курсы
                </Link>
                <Link
                    to='/rate'
                    className={location.pathname == "/rate" ? "nav_links active" : "nav_links"}>
                    <IoFlashSharp />
                    Рейтинг
                </Link>
                <Link
                    to='/profile'
                    className={location.pathname == "/profile" ? "nav_links active" : "nav_links"}>
                    <IoPerson />
                    Профиль
                </Link>
                {
                    isAdmin ? <Link to='/admin' className={location.pathname == "/admin" ? "nav_links active" : "nav_links"}>
                        <RiAdminLine/>
                        Администрирование
                        </Link> : null
                }
            </nav>
        </footer>
    )
}

export default Footer