import React, { useEffect, useState } from 'react'
import "./Search.css"
import {FaSearch} from "react-icons/fa"


const Search = ({subjectsState,subjectsFilter,setSubjectsFilter}) => {
    const [input,setInput] = useState()
    const [allCourse,setAllCourses] = useState()
    
const filterCourses = (e) => {
    setInput(e.target.value)
    if (e.target.value == "") {
        setSubjectsFilter(subjectsState)
        setInput()
    } else {
        var filterData = subjectsState.filter(course => course.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setSubjectsFilter(filterData)
    }
}   

  return (
    <div className="search_course">
        <input 
        className='search_course_input' 
        type="text"
        value={input} 
        onChange={filterCourses}
        placeholder='Поиск'
        />
            <button className='search_course_btn'>
                <FaSearch/>
        </button>
    </div>
  )
}

export default Search