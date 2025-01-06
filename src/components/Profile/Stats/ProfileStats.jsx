import React, { useEffect, useState } from 'react'
import "./profilestat.scss"
import { DoneThemesForAllSubjects } from '../../../services/theme'
import { GetAllCompletedTest } from '../../../services/subject_test'
// import styles from "./profilestat.scss"
const ProfileStats = ({userId,level}) => {
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
        
        {/* <div className='stat_lvl'>
            <p>Уровень <span>{Math.floor(level)}</span></p>
        </div> */}

        <div className='stat_items'>
        <div className='stat_item'>
            <p>Пройдено тем</p>
            <span>{doneThemes}</span>
        </div>
        <div className='stat_item'>
            <p>Пройдено тестов</p>
            <span>{doneTest}</span>
        </div>
        </div>
        
    </div>
  )
}

export default ProfileStats