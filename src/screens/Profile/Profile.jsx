import React, {useEffect, useState} from 'react'
import "./profile.css"
import {MdEdit} from "react-icons/md";
import {Helmet} from 'react-helmet'
import axios from "axios"
import NameEditBlock from '../../components/Profile/NameEdit/NameEditBlock';
import {Link} from 'react-router-dom';
import {IoIosLogOut} from "react-icons/io";
import AvatarChangeBlock from "../../components/Profile/AvatarChange/AvatarChangeBlock.jsx";
import DescriptionChange from "../../components/Profile/DescriptionEdit/DescriptionChange.jsx";
import { IoLogOut } from "react-icons/io5";
import Settings from "../../../settings.js";
import CourseHistory from '../../components/Profile/CourseHistory/CourseHistory.jsx';



const Profile = () => {
    const [progress, setProgress] = useState(0)
    const [localStoreUserId, setLocalStoreUserId] = useState(localStorage.getItem("PRAXIS_USER_ID"))
    const [userProfile, setUserProfile] = useState([])
    const [editName, setNameEdit] = useState(false)
    const [editAvatar, setAvatarEdit] = useState(false)
    const [editDescription, setDescriptionEdit] = useState(false)

    useEffect(() => {
        GetProfile()


    }, [editName,editAvatar,editDescription])
    const GetProfile = async () => {
        await axios.get(`/api/profile/${localStoreUserId}`)
            .then(function (response) {
                // Обработка успешного ответа
                console.log(response.data.data);
                setProgress(response.data.data[0].score % 100)
                setUserProfile(response.data.data)
            })
            .catch(function (error) {
                // Обработка ошибки
                console.log(error);
            });
    }
    return (
        <main
            className="main profile">
            {editName ? <NameEditBlock
                editName={editName}
                setNameEdit={setNameEdit}/> : console.log(editName)}

            {editAvatar ? <AvatarChangeBlock
                editAvatar={editAvatar}
                setAvatarEdit={setAvatarEdit}/> : console.log(editAvatar)}

            {editDescription ? <DescriptionChange
                editDesc={editDescription}
                setDescEdit={setDescriptionEdit}
            /> : console.log(editDescription)}

            <Helmet>
                <title>Профиль</title>
            </Helmet>
            {userProfile.map((el, idx, array) => (
                <>
                    <div 
                    key={idx}
                        className="profile_header">
                        {/* <img
                        className='profile_header_bg' 
                        src="images/profile_bg.png" alt="" /> */}
                        <div
                            onDoubleClick={() => {
                                setAvatarEdit(true)
                            }}
                            className="profile_header_avatar">
                            <img className="profile_header_avatar_img" src={`http://${Settings.PORT}/images?id=${el.image}`} />

                        </div>

                        <h2
                            onDoubleClick={() => {
                                setNameEdit(true)
                            }}
                        >{el.full_name}
                            {/*<MdEdit*/}
                            {/*    onClick={() => {*/}
                            {/*        setNameEdit(true)*/}
                            {/*    }}*/}
                            {/*    className='name_edit_icon'/>*/}
                        </h2>
                        <p onDoubleClick={()=>setDescriptionEdit(true)}>{el.description}</p>
                        <Link
                            to='/'
                            className={location.pathname == "/" ? "nav_links active" : "nav_links"}

                        >
                            <IoLogOut className="log_out_icon"/>

                        </Link>
                    </div>
                    <div
                        className="profile_body">
                        <div

                            className="profile_stats level">
                            <div>
                                <p>{Math.floor(el.score / 100)} lvl</p>
                            </div>
                            <div
                                className="level_range">
                <span
                    style={{width: `${progress}%`}}
                    className='level_range_item'></span>
                            </div>
                        </div>
                <CourseHistory/>

                    </div>
                </>
            ))}
        </main>
    )
}

export default Profile