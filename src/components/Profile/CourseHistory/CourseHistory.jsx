import React, { useEffect, useState } from 'react'
import { GetLastSubject } from '../../../services/profile'
import { GetSubjectById } from '../../../services/subject'
import "./courseHistory.css"
import Settings from '../../../../settings'
import { useNavigate } from 'react-router-dom'
import { SlArrowRight } from "react-icons/sl";


const CourseHistory = () => {
    const [lastSubject, setLastSubject] = useState([{}])
    const navigate = useNavigate()
    useEffect(() => {
        GetLastSubject().then((res) => {
            console.log(res)
            GetSubjectById(res.data[0].subjects_id).then((res) => {
                setLastSubject(res)
            }).catch(err=>{
                console.log(err)

            })
        })


    }, [])
    return (
        <>
            <h2 className='last_course_header'>Продолжите изучение </h2>
            {lastSubject.map(el => (
                <div
                onClick={() => {
                    navigate(`/course/${el.id}`)
                }}
                key={el.id} 
                className="last_course">
                    <div className="last_course_info">
                        <h2>{el.title}</h2>
                        <p>{el.description}</p>
                    </div>
                    {/* <div className="last_course_control">
                        <SlArrowRightCircle/>
                    </div> */}
                    <div className="open_course">
                        <SlArrowRight/>
                    </div>
                </div>
            ))}
        </>

    )
}

export default CourseHistory