import React, { useEffect, useState } from 'react'
import "./openCourse.css"
import ThemeBlock from '../../components/themeBlock/ThemeBlock'
import TestBlock from '../../components/testBlock/TestingBlock'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
const OpenCourse = ({port}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [subjectId, setSubjectId] = useState(location.pathname.split("/")[2])
    const [themesState, setThemesState] = useState([])
    const [subjectState, setSubjectState] = useState([])
    const [doneThemesId,setDoneThemesId] = useState([])


    useEffect(() => {
        const apiUrlT = `/api/themes/${subjectId}`;
        const apiUrlS = `/api/subject/${subjectId}`;
        const apiUrlDoneThemes = `/api/themes/complete/${localStorage.getItem("PRAXIS_USER_ID")}/${subjectId}`;
        axios.get(apiUrlT).then((resp) => {
            const allThemes = resp.data.data;
            // console.log(resp.data)
            setThemesState(allThemes);
        });
        axios.get(apiUrlS).then((resp) => {
            const Subject = resp.data.data;
            // console.log(resp.data)
            setSubjectState(Subject);
        });
        axios.get(apiUrlDoneThemes).then((resp) => {
            const DoneThemesIds = resp.data.data;
            console.log(resp.data)
            doneThemesId==null ? setDoneThemesId([]) : setDoneThemesId(DoneThemesIds);
        });
    }, [])

    return (
        <>
            {subjectState.map(el => (
                <main className="main opencourse">



                    <h1 className='opencourse_title'>
                        {el.title}


                    </h1>
                    <div  className="opencourse_description">
                        <p>О курсе:</p>
                        <p>{el.description}</p>
                    </div>
                    <p>Содержание</p>
                    {themesState.map((theme,index,array) => (

                        <ThemeBlock is_done={(doneThemesId!=null) ? doneThemesId.filter(el => el == theme.id) : 0} lesson_number={index+1} title={theme.title} theme_id={theme.id} subject_id={el.id}/>

                    ))}

                    {/* <TestBlock /> */}
                </main>
            ))}
        </>

    )
}

export default OpenCourse