import React from 'react'
import "./nameEditBlock.css"

import { MdDone } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from 'react';
import axios from "axios"
import { useEffect } from 'react';
const NameEditBlock = ({editName,setNameEdit}) => {
    const [userId,setUserId] = useState(localStorage.getItem("PRAXIS_USER_ID"))
    const [newName, setNewName] = useState("")
    const [isClose,setIsClose] = useState(!editName)

   


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newName == "" || newName == " " || newName.length < 4) {
            alert("Нельзя дать такое имя")
            return
        }
        
        await axios.post(`/api/profile/name/${userId}/${newName}`,).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            alert(error.response.data.data)
            return
        });
        window.location.reload();
        setIsClose(true)
        setNameEdit(false)
        setIsClose(false)

    }
  return (
    <section
    style={isClose ? {display:"none"}: {display:"flex"}} 
    className='name_edit_block'>
        <h2>
            Сменить имя
        </h2>
        <input
            value={newName}
            onChange={(e)=>setNewName(e.target.value)} 
            placeholder='Введите новое имя' type="text" />
        <div>
        <button>
            <MdDone
            onClick={(e)=>handleSubmit(e)}
            className="edit_name_done" />
        </button>
        <button>
            <MdOutlineCancel
            onClick={()=>{
                setIsClose(true)
                setNameEdit(false)
                setIsClose(false)

            }}
            className="edit_name_cancel"/>
        </button>
        </div>
       
    </section>
  )
}

export default NameEditBlock