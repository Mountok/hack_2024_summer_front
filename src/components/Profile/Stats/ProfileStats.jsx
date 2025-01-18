import React, { useEffect, useState } from 'react'
import "./profilestat.scss"
import { DoneThemesForAllSubjects } from '../../../services/theme'
import { GetAllCompletedTest } from '../../../services/subject_test'
// import styles from "./profilestat.scss"
const ProfileStats = ({userId,score}) => {
  const [doneThemes,setDoneThemes] = useState(0)
  const [doneTest,setDoneTest] = useState(0)

  
  useEffect(()=>{
    DoneThemesForAllSubjects(userId).then(res => {
      setDoneThemes(res.data)
    })


    GetAllCompletedTest(userId).then(data => {
      console.log("ALL TEST:" , data)
      setDoneTest(data)
    })
  },[])



  return (
    <div className='profile_stat'>
        
        <h2 className='last_course_header'>Ваш прогресс: </h2>

        <div className='stat_items'>
        <div className='stat_item'>
            <p>Баллы</p>
            <span>{score}</span>
        </div>

        <div className='stat_item_container'>
        <div  className='stat_item'>
            <p>Темы </p>
            <span> {doneThemes}</span>
        </div>
        <div className='stat_item'>
            <p>Тесты </p>
            <span> {doneTest}</span>
        </div>
        </div>
        
        
        </div>
        
    </div>
  )
}

export default ProfileStats