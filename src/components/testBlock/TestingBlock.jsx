import React from 'react'
import "./testBlock.css"
import { IoDocumentText } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const TestingBlock = ({course_id,test_id}) => {
  const navigate = useNavigate()

  return (
    <div className='test_block'>
            <div>
                <p>Тестирование</p>
            </div>

            <button onClick={()=>navigate("lesson/1/1")}><IoDocumentText /></button>
        </div>
  )
}

export default TestingBlock