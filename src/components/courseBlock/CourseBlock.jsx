import React, { useEffect, useState } from 'react'
import "./coursesBlock.scss"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Loading from '../loading/Loading';
import { BsPlayCircleFill } from 'react-icons/bs';
import { PlayClick } from '../../utils/click';

const CourseBlock = ({ id, image, title, setAllLoad, subtitle }) => {
    const [themesLength, setThemesLength] = useState()
    const [doneThemes, setDoneThemes] = useState(null)
    const [doneThemesLoad, setDoneThemesLoad] = useState(false)
    const [imgIsLoad, setImgIsLoad] = useState(false)
    useEffect(() => {
        getCoursesThemeSumm(id)
        getDoneThemes(id)
    }, [])
    const getCoursesThemeSumm = async (id) => {
        var apiUrlT = `/api/themes/${id}`;
        await axios.get(apiUrlT, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("SKUToken")
            }
        }).then((resp) => {
            console.log("COURSEBLOCK res: ", resp)
            setThemesLength(resp.data.data.length);
        }).catch(err => {
            console.log(err)
        });
    }
    const getTopicLabel = (count) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return `${count} тема`;
        } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 12 || count % 100 > 14)) {
            return `${count} темы`;
        } else {
            return `${count} тем`;
        }
    };
    const getDoneThemes = async (id) => {
        setDoneThemesLoad(false)

        const apiUrlDoneThemes = `/api/themes/complete/${id}`;
        axios.get(apiUrlDoneThemes, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("SKUToken")
            }
        }).then((resp) => {
            const DoneThemesIds = resp.data.data;
            console.log(resp.data)
            DoneThemesIds == null ? setDoneThemes(0) : setDoneThemes(DoneThemesIds.length);
        });
        setDoneThemesLoad(true)
    }

  



    const navigate = useNavigate()
    return (
        <>
            <div onClick={() => {
                PlayClick()
                navigate(`/course/${id}`)
            }} className='course_block'>

                <div>
                    <img
                        onLoad={(e) => {
                            setImgIsLoad(true)
                            setAllLoad(true)
                        }}

                        style={{ opacity: imgIsLoad ? ('1') : ('0') }}
                        className='course_image' src={image} alt="" />


                    <div className='course_footer'>
                        <p className='course_themes_lenght'>
                            {(themesLength) ? getTopicLabel(themesLength) : <Loading />}
                        </p>
                        <p className='course_themes_complete'>
                            {(doneThemesLoad && themesLength) ? Math.floor((doneThemes / themesLength) * 100) + "%" : (<Loading />)}
                        </p>


                    </div>
                    <h3 className='course_title'>{title}</h3>
                    <p className='course_subtitle'>{subtitle}</p>


                    <button onClick={() => {
                        navigate(`/course/${id}`)
                    }}
                        className='course_button'> <p>{(doneThemes == 0) ? "Бесплатно" : "Продолжить"}</p>
                    </button>

                </div>

            </div>
        </>

    )
}

export default CourseBlock