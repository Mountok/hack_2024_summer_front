import React, {useEffect, useState} from 'react'
import "./lesson.css"
import axios from 'axios'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {FaArrowLeft} from "react-icons/fa6"
const Lesson = () => {
    const [content, setContent] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const [btnView, isBtnView] = useState(false)

    setTimeout(() => {
        isBtnView(true)
    }, 5000)

    useEffect(() => {
        getContent()



    }, [])

    const addPoint = async (e) => {
        e.preventDefault()
        const apiUrl = `/api/profile/point/${localStorage.getItem("PRAXIS_USER_ID")}/${content[0].theme_id}`
        await axios.post(apiUrl).then((resp) => {
            console.log(resp)
        })
      navigate(`/course/${location.pathname.split('/')[2]}`)

    }

    const getContent = async () => {
        const apiUrl = `/api/lessons/${location.pathname.split('/')[2]}/${location.pathname.split('/')[3]}`;
        await axios.get(apiUrl).then((resp) => {
            const lessonContent = resp.data.data;
            setContent([lessonContent]);
        });

    }

    function createMarkup(str) {
        return {__html: str};
    }

    function MyComponent({str}) {
        return <div className='content' dangerouslySetInnerHTML={createMarkup(str)}/>;
    }

    return (
        <main className="main lesson">
            <div className="lesson_header">
                <Link to={"/course/"+location.pathname.split("/")[2]}>
                    <FaArrowLeft/>
                </Link>
            </div>

            <div className="lesson_content">
                {content.map(el => (
                    <MyComponent key={el.id} str={el.upkeep}/>
                ))}
            </div>
            <div className="lesson_next">
                {btnView ?
                    <button onClick={(e) => addPoint(e)}>Завершить</button>
                    : null
                }
            </div>
        </main>
    )
}

export default Lesson