import React from 'react'
import "./testBlock.css"
import { IoDocumentText } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";



const TestingBlock = ({points,subject_id,test_id,title}) => {
  const navigate = useNavigate()
  
  return (
    <div onClick={()=>navigate(`/test/${test_id}`)} className='test_block'>
            <div>
              <p>
                {points>90?<MdCheckBox style={{color:"var(--orange)"}}/>:<MdCheckBoxOutlineBlank/>}
                
                </p>
              
                <p>{title}</p>
            </div>
            <div>
              <p>{points}%</p>
          
            </div>
        </div>
  )
}

export default TestingBlock