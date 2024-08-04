import React from 'react'
import { IoPlay } from "react-icons/io5";
import "./themeBlock.css"
import { useNavigate } from 'react-router-dom';
const ThemeBlock = ({lesson_number,theme_id,title,subject_id}) => {
    const navigate = useNavigate()
    return (
        <div className='theme_block'>
            <div>
                <p>{lesson_number}</p>
                <p>{title}</p>
            </div>

            <button onClick={()=>{navigate(`/lesson/${subject_id}/${theme_id}`)}} ><IoPlay /></button>
        </div>
    )
}

export default ThemeBlock