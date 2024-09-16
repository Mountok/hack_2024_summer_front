import {MdDone, MdOutlineCancel} from "react-icons/md";
import React, {useState} from "react";
import axios from "axios";


const DescriptionChange = ({editDesc,setDescEdit}) => {
    const [userId,setUserId] = useState(localStorage.getItem("PRAXIS_USER_ID"))
    const [newDesc, setNewDesc] = useState("")
    const [isClose,setIsClose] = useState(!editDesc)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newDesc === "" || newDesc === " " || newDesc.length < 4) {
            alert("Нельзя дать такое описание")
            return
        }

        const formData = new FormData()
        formData.append("user_id",userId)
        formData.append("description",newDesc)

        try {
            const response = await axios.post('/api/profile/description', formData);
            console.log('Ответ от сервера:', response.data);
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
        // window.location.reload();
        setIsClose(true)
        setDescEdit(false)
        setIsClose(false)

    }


    return (
        <>
            <section
                style={isClose ? {display: "none"} : {display: "flex"}}
                className='name_edit_block'>
                <h2>
                    Сменить описание
                </h2>
                <input
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    type="text"/>
                <div>
                    <button>
                        <MdDone
                            onClick={(e) => handleSubmit(e)}
                            className="edit_name_done"/>
                    </button>
                    <button>
                        <MdOutlineCancel
                            onClick={() => {
                                setIsClose(true)
                                setDescEdit(false)
                                setIsClose(false)

                            }}
                            className="edit_name_cancel"/>
                    </button>
                </div>

            </section>
        </>
    )
}

export default DescriptionChange