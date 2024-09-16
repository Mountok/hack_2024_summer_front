import React, { useEffect, useState } from 'react'
import CourseBlock from '../../components/courseBlock/CourseBlock'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Settings from "../../../settings.js";
const Courses = ({port}) => {

  const [subjectsState,setSubjectsState] = useState([])
  const [requestCompleted,setRequestCompleted] = useState(false)
  
  useEffect(()=>{
    const apiUrl = '/api/subject';
    axios.get(apiUrl).then((resp) => {
      const allSubjects = resp.data.data;
      console.log(resp.data)
      setSubjectsState(allSubjects);
      setRequestCompleted(true)
    });
  },[])

  return (
    <main className='main courses'>
      <Helmet>
        <title>Курсы</title>
      </Helmet>
      {(requestCompleted) ? (
         subjectsState.map(el => (
          <CourseBlock 
          id={el.id} 
          key={el.id} 
          image={`http://${Settings.PORT}/images?id=`+el.image}
          title={el.title}
          subtitle={el.description}/>
        ))
      ) : (
        <span className='loader'>Загрузка курсов</span>
      )}
     
    </main>
  )
}

export default Courses