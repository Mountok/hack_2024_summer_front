import React, {useEffect, useState} from 'react'
import { IoPlay } from "react-icons/io5";
import "./themeBlock.scss"
import { useNavigate } from 'react-router-dom';
import { BsBookmarkCheck,BsBookmarkCheckFill } from "react-icons/bs";


const ThemeBlock = ({is_done,lesson_number,theme_id,title,subject_id}) => {
    const navigate = useNavigate()
    useEffect(() => {

    }, []);

    return (
        <div onClick={()=>{navigate(`/lesson/${subject_id}/${theme_id}`)}}
             className='theme_block'
        >
            <div>
                <p>
                    {/*{lesson_number}*/}
                    {is_done[0] == theme_id ?  <BsBookmarkCheckFill className="theme_block_icons done"/> : <BsBookmarkCheck className="theme_block_icon"/>}
                </p>
                <p>{title}</p>
            </div>

        </div>
    )
}

export default ThemeBlock