import React, {useEffect, useState} from 'react'
import { IoPlay } from "react-icons/io5";
import "./themeBlock.scss"
import { useNavigate } from 'react-router-dom';
import { HiOutlineAcademicCap } from "react-icons/hi2";

import { IoCheckmarkCircle } from "react-icons/io5";

const ThemeBlock = ({is_done,lesson_number,theme_id,title,subject_id}) => {
    const navigate = useNavigate()
    useEffect(() => {

    }, []);

    return (
        <div onClick={()=>{navigate(`/lesson/${subject_id}/${theme_id}`)}}
             className={is_done[0] == theme_id ?'theme_block done' :  'theme_block'}
        >
            <div>
                <p>
                    {/*{lesson_number}*/}
                    {is_done[0] == theme_id ? <HiOutlineAcademicCap className="theme_block_icon done"/> : <HiOutlineAcademicCap className="theme_block_icon"/>}
                    {is_done[0] == theme_id ?  <IoCheckmarkCircle className="theme_block_icons_done"/> : null}
                </p>
                <p>{title}</p>
            </div>

        </div>
    )
}

export default ThemeBlock