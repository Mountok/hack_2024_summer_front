import React from 'react'
import "./testBlock.css"
import { IoDocumentText } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import { NULL } from 'sass';



const TestingBlock = ({points,subject_id,test_id,title}) => {
  const navigate = useNavigate()
  
  return (
    <div onClick={()=>navigate(`/test/${test_id}`)} className={points>90 ? 'test_block done' : 'test_block'}>
            <div>
              <p>
                {points>90?<IoCheckmarkCircle className="test_block_icons_done"/>: null}

                </p>
              
                <p>{title}</p>
            </div>
            <div>
              {/* <p style={{
                color: (points > 90) ? "#09d209" : (points >= 50) ? "orange" : "red"
              }}>{points}%</p> */}
          
            </div>
        </div>
  )
}

export default TestingBlock