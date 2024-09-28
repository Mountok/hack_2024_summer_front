import React, { useEffect, useState } from 'react'
import { GetLastSubject } from '../../../services/profile'
import { GetSubjectById } from '../../../services/subject'
import "./courseHistory.css"
import Settings from '../../../../settings'
import { GrNext } from "react-icons/gr";
import { useNavigate } from 'react-router-dom'


const CourseHistory = () => {
    const [lastSubject, setLastSubject] = useState([{}])
    const navigate = useNavigate()
    useEffect(() => {
        GetLastSubject(localStorage.getItem("PRAXIS_USER_ID")).then((res) => {
            GetSubjectById(res[0].subjects_id).then((res) => {
                console.log(res)
                setLastSubject(res)
            })
        })


    }, [])
    return (
        <>
            <h2 className='last_course_header'>Вы проходите: </h2>
            {lastSubject.map(el => (
                <div
                onClick={() => {
                    navigate(`/course/${el.id}`)
                }}
                key={el.id} 
                className="last_course">
                    <img src={`http://${Settings.PORT}/images?id=`+el.image} alt="" />
                    <div className="last_course_info">
                        <h2>{el.title}</h2>
                        <p>{el.description}</p>
                    </div>
                    <div className="last_course_control">
                        <GrNext/>
                    </div>
                </div>
            ))}
        </>

    )
}

export default CourseHistory