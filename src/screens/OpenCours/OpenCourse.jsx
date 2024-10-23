import React, { useEffect, useState } from 'react'
import "./openCourse.css"
import ThemeBlock from '../../components/themeBlock/ThemeBlock'
import TestBlock from '../../components/testBlock/TestingBlock'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import { FaArrowLeft } from 'react-icons/fa6'
import { Helmet } from 'react-helmet'
import { GetCompletedTests, GetTestsBySubjectId } from '../../services/subject_test'
import { CertificateVerification } from '../../services/cerificated'
import { DoneThemes } from '../../services/theme'
const OpenCourse = ({ port }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [themesState, setThemesState] = useState([])
    const [doneThemesId, setDoneThemesId] = useState([])

    const [subjectId, setSubjectId] = useState(location.pathname.split("/")[2])
    const [subjectState, setSubjectState] = useState([])

    const [testsForSubject, setTestForSubject] = useState([])
    const [doneTestsForSubject, setDoneTestsForSubject] = useState([])

    const [userId, setUserId] = useState(localStorage.getItem("PRAXIS_USER_ID"))


    useEffect(() => {
        const apiUrlT = `/api/themes/${subjectId}`;
        const apiUrlS = `/api/subject/${subjectId}`;
        const apiUrlDoneThemes = `/api/themes/complete/${userId}/${subjectId}`;
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
        DoneThemes(userId,subjectId).then(res => setDoneThemesId(res))

        GetTestsBySubjectId(subjectId).then(res => setTestForSubject(res == null ? [] : res))

        GetCompletedTests(userId, subjectId).then(res => setDoneTestsForSubject(res.data) )

        CertificateVerification(userId, subjectId).then(res => {
            if (res.courseDone) {
                alert("ваш сертификат доступен")
            } 
        }).catch(err => {
            console.log(err)
        })


    }, [])

    return (
        <>

            <Helmet>
                <title>Курсы</title>
                <meta name="description" content="Выберите курс для себя." />
                <meta name="keywords" content="praxis, courses, praxis курсы" />
                <meta property="og:title" content="Курсы Praxis" />
                <meta property="og:description" content="Выберите курсы для себя на Praxis!" />
                <meta property="og:image" content="/images/Group 1.svg" />
                <meta property="og:url" content="https://praxis-app.netlify.app/courses" />
            </Helmet>

            {subjectState.map(el => (
                <main className="main opencourse">

                    <div className="opencourse_header">
                        <Link to={"/courses"}>
                            <FaArrowLeft />
                        </Link>
                    </div>
                    <div className='opencourse_header_2'>
                        <h1 className='opencourse_title'>
                            {el.title}
                        </h1>
                    </div>

                    <div className="opencourse_description">
                        <p>О курсе:</p>
                        <p>{el.description}</p>
                    </div>
                    <p>Обучение</p>
                    {themesState.map((theme, index, array) => (

                        <ThemeBlock is_done={(doneThemesId != null) ? doneThemesId.filter(el => el == theme.id) : 0} lesson_number={index + 1} title={theme.title} theme_id={theme.id} subject_id={el.id} />

                    ))}

                    {
                        testsForSubject.length != 0 ? <p>Тестирование</p> : <></>
                    }

                    {
                        testsForSubject.map((test, index, array) => (

                            <TestBlock points={filterTestPoints(index, doneTestsForSubject)} test_id={test.id} key={index} title={test.title} />
                        ))
                    }

                </main>
            ))}
        </>

    )
}

const filterTestPoints = (idx, doneTestsForSubject) => {
    console.log(doneTestsForSubject)
    if (doneTestsForSubject == null) {
        return 0
    } else {
        if (doneTestsForSubject[idx]) {
            console.log(Math.trunc((doneTestsForSubject[idx].points / doneTestsForSubject[idx].question_count) * 100))

            return Math.trunc((doneTestsForSubject[idx].points / doneTestsForSubject[idx].question_count) * 100)
        } else {
            return 0
        }
    }
}

export default OpenCourse