import React, { useEffect, useState } from 'react'
import "./coursesBlock.css"
import { useNavigate } from 'react-router-dom'
import { RxChevronRight } from "react-icons/rx";
import { BsPlayCircleFill } from "react-icons/bs";
import axios from 'axios';
import { FaBookOpen } from "react-icons/fa";
import { MdBookmarkAdded } from "react-icons/md";

const CourseBlock = ({ id, image, title }) => {
    const [themesLength, setThemesLength] = useState()
    const [doneThemes,setDoneThemes] = useState(0)
    useEffect(() => {
        getCoursesThemeSumm(id)
        getDoneThemes(id)
    },[])
    const getCoursesThemeSumm = async (id) => {
        var apiUrlT = `/api/themes/${id}`;
        await axios.get(apiUrlT).then((resp) => {
            setThemesLength(resp.data.data.length);
        });
    } 
    const getTopicLabel = (count) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return `${count} тема`;
        } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 12 || count % 100 > 14)) {
            return `${count} темы`;
        } else {
            return `${count} тем`;
        }
    };
    const getDoneThemes = async (id) => {
        const apiUrlDoneThemes = `/api/themes/complete/${localStorage.getItem("PRAXIS_USER_ID")}/${id}`;
        axios.get(apiUrlDoneThemes).then((resp) => {
            const DoneThemesIds = resp.data.data;
            console.log(resp.data)
            DoneThemesIds == null ? setDoneThemes(0) : setDoneThemes(DoneThemesIds.length);
        });
    }


   


const navigate = useNavigate()
return (
    <div className='course_block'>
        <img className='course_image' src={image} alt="" />

        <h3 className='course_title'>{title}</h3>

        <div className='course_footer'>
            <p className='course_themes_lenght'>
                <FaBookOpen/>
                {getTopicLabel(themesLength)}
                <span className='course_themes_complete'>
                <MdBookmarkAdded />
                {(doneThemes/themesLength)*100 + "%"}
                </span>
                
            </p>
                
        <button onClick={() => {
            navigate(`/course/${id}`)
        }}
            className='course_button'> <p>{doneThemes == 0 ? "Начать" : "Продолжить"}</p>
            <BsPlayCircleFill />
        </button>
        </div>
    </div>
)
}

export default CourseBlock