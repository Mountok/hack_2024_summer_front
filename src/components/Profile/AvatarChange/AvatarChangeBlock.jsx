import {MdDone, MdOutlineCancel} from "react-icons/md";
import React, {useState} from "react";
import "./avatarChangeBlock.css"
import axios from "axios";

const AvatarChangeBlock = ({editAvatar, setAvatarEdit}) => {
    const [userId, setUserId] = useState(localStorage.getItem("PRAXIS_USER_ID"))
    const [newImage, setNewImage] = useState(null)
    const [isClose, setIsClose] = useState(!editAvatar)

    const handleSubmitSubject = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', newImage);
        formData.append("user_id",userId)


        try {
            const response = await axios.post('/api/profile/avatar', formData);
            console.log('Ответ от сервера:', response.data);
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
        // window.location.reload();

        setIsClose(true)
        setAvatarEdit(false)
        setIsClose(false)

    };

    return (

        <section
            style={isClose ? {display: "none"} : {display: "flex"}}
            className='avatar_edit_block'>
            <h2>
                Сменить фото
            </h2>
            <form style={{margin:"0 auto"}} onSubmit={handleSubmitSubject}>
                <input
                    onChange={(e) => setNewImage(e.target.files[0])}
                     type="file"/>
                <div style={{margin:"0 auto",paddingTop:"10px"}}>
                    <button type="submit">
                        <MdDone
                            className="edit_avatar_done"/>
                    </button>
                    <button>
                        <MdOutlineCancel
                            onClick={() => {
                                setIsClose(true)
                                setAvatarEdit(false)
                                setIsClose(false)

                            }}
                            className="edit_avatar_cancel"/>
                    </button>
                </div>
            </form>


        </section>

    )
}


export default AvatarChangeBlock