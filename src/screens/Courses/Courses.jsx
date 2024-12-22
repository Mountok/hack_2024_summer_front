import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import CourseBlock from '../../components/courseBlock/CourseBlock'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Settings from "../../../settings.js";
import { GetSubject } from '../../services/subject.js';
import Loading from '../../components/loading/Loading.jsx';
import { ShimmerDiv } from 'shimmer-effects-react';
import { useNavigate } from 'react-router-dom';
import Search from '../../components/search/Search.jsx';

const Courses = () => {
  const [subjectsState,setSubjectsState] = useState([])
  const [subjectsFilter,setSubjectsFilter] = useState([])
  
  const [requestCompleted,setRequestCompleted] = useState(false)
  const [allLoad, setAllLoad] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    GetSubject().then((res) => {
      setSubjectsState(res)
      setSubjectsFilter(res)
      setRequestCompleted(true) 
    }).catch(err => {
      if (err.response.status == 401) {
        navigate("/")
      }
      console.log(err)
    })
  },[])

  


  return (
    <main 
    className='main courses'>
      <Helmet>
        <title>Курсы</title>
      </Helmet>

      <Search 
      subjectsFilter={subjectsFilter}
      setSubjectsFilter={setSubjectsFilter}
      subjectsState={subjectsState}/>
      
      {(requestCompleted) ? (
         subjectsFilter.map(el => (
          <CourseBlock 
          id={el.id} 
          key={el.id} 
          image={`http://${Settings.PORT}/images?id=`+el.image}
          title={el.title}
          setAllLoad={setAllLoad}
          subtitle={el.description}/>
        ))
      ) : (!allLoad) ? (
        <>

        <ShimmerDiv className='shimmer_block' rounded={1} mode="light" height={240} width={330} />
        <ShimmerDiv className='shimmer_block' rounded={1} mode="light" height={240} width={330} />
        <ShimmerDiv className='shimmer_block' rounded={1} mode="light" height={240} width={330} />
        <ShimmerDiv className='shimmer_block' rounded={1} mode="light" height={240} width={330} />
        </>
        // <Loading/>
      ) : (
        null
      )}
     
    </main>
  )
}

export default Courses