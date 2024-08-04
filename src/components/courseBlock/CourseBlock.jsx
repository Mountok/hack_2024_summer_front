import React from 'react'
import "./coursesBlock.css"
import { useNavigate } from 'react-router-dom'
const CourseBlock = ({ id, image, title }) => {
    const navigate = useNavigate()
    return (
        <div className='course_block'>
            <img className='course_image' src={image} alt="" />
            <h3 className='course_title'>{title}</h3>
            <button onClick={()=>{navigate(`/course/${id}`)}} 
            className='course_button'>Изучить</button>
        </div>
    )
}

export default CourseBlock