import React, { useEffect, useState } from 'react'
import "./lesson.css"
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
const Lesson = () => {
    const [content,setContent] = useState([])
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    getContent()
    
    
  },[])

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
        return <div className='content' dangerouslySetInnerHTML={createMarkup(str)} />;
      }
  return (
    <main className="main lesson">


        <div className="lesson_content">
            {content.map(el => (
                <MyComponent key={el.id} str={el.upkeep}/>
            ))}
        </div>
        <div className="lesson_next">
            <button onClick={() => navigate(`/course/${location.pathname.split('/')[2]}`)} >Завершить</button>
        </div>
    </main>
  )
}

export default Lesson