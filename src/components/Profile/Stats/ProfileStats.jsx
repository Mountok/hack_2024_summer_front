import React from 'react'
import "./profilestat.scss"
// import styles from "./profilestat.scss"
const ProfileStats = () => {
  return (
    <div className='profile_stat'>
        
        <div className='stat_lvl'>
            <p>Ваш уровень <span>10</span></p>
        </div>

        <div className='stat_items'>
        <div className='stat_item'>
            <p>Пройдено тем</p>
            <span>10</span>
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