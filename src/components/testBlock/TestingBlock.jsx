import React from 'react'
import "./testBlock.css"
import { IoDocumentText } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";


const TestingBlock = ({subject_id,test_id,title}) => {
  const navigate = useNavigate()

  return (
    <div onClick={()=>navigate(`/test/${test_id}`)} className='test_block'>
            <div>
              <p><MdOutlineCheckBoxOutlineBlank/></p>
              
                <p>{title}</p>
            </div>
        </div>
  )
}

export default TestingBlock