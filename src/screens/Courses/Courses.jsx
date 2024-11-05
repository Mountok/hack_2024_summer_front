import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import CourseBlock from '../../components/courseBlock/CourseBlock'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Settings from "../../../settings.js";
import { GetSubject } from '../../services/subject.js';
import Loading from '../../components/loading/Loading.jsx';
import { ShimmerDiv } from 'shimmer-effects-react';

const Courses = () => {
  const [subjectsState,setSubjectsState] = useState([])
  
  const [requestCompleted,setRequestCompleted] = useState(false)
  const [allLoad, setAllLoad] = useState(false)

  useEffect(()=>{
    GetSubject().then((res) => {
      setSubjectsState(res)
      setRequestCompleted(true) 
    })
  },[])

  


  return (
    <main 
    className='main courses'>
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