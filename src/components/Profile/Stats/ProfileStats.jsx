import React, { useEffect, useState } from 'react'
import "./profilestat.scss"
import { DoneThemesForAllSubjects } from '../../../services/theme'
// import styles from "./profilestat.scss"
const ProfileStats = ({userId}) => {
  const [doneThemes,setDoneThemes] = useState(0)
  
  useEffect(()=>{
    DoneThemesForAllSubjects(userId).then(data => {
      setDoneThemes(data)
    })
  },[])


  return (
    <div className='profile_stat'>
        
        <div className='stat_lvl'>
            <p>Ваш уровень <span>10</span></p>
        </div>

        <div className='stat_items'>
        <div className='stat_item'>
            <p>Пройдено тем</p>
            <span>{doneThemes}</span>
        </div>
        <div className='stat_item'>
            <p>Пройдено тестов</p>
            <span>4</span>
        </div>
        </div>
        
    </div>
  )
}

export default ProfileStats