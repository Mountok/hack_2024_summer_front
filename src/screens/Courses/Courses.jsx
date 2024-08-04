import React, { useEffect, useState } from 'react'
import CourseBlock from '../../components/courseBlock/CourseBlock'
import axios from 'axios'
import { Helmet } from 'react-helmet'
const Courses = ({port}) => {

  const [subjectsState,setSubjectsState] = useState([])
  useEffect(()=>{
    const apiUrl = '/api/subject';
    axios.get(apiUrl).then((resp) => {
      const allSubjects = resp.data.data;
      console.log(resp.data)
      setSubjectsState(allSubjects);
    });
  },[])

  return (
    <main className='main courses'>
      <Helmet>
        <title>Курсы</title>
      </Helmet>
      {subjectsState.map(el => (
        <CourseBlock 
        id={el.id} 
        key={el.id} 
        image={`http://${port}/images?id=`+el.image} 
        title={el.title}
        subtitle={el.description}/>
      ))}
     
    </main>
  )
}

export default Courses