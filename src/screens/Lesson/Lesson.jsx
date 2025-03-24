import React, {useEffect, useState} from 'react'
import "./lesson.css"
import axios from 'axios'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {FaArrowLeft} from "react-icons/fa6"
import 'react-quill/dist/quill.snow.css'; // Импорт стилей Quill
import { PlayClick } from '../../utils/click'
import { addComment, addReply, getComments } from '../../services/comment'
import Comment from '../../components/comments/Comment'
import { BiSolidCommentEdit } from "react-icons/bi";
import { BiSolidCommentX } from "react-icons/bi";
import { GetProfile } from '../../services/profile'

const Lesson = ({userRole}) => {
    const [content, setContent] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const [btnView, isBtnView] = useState(false)
    const [comments, setComments] = useState([])
    const [userProfile, setUserProfile] = useState([])

    const [themeId, setThemeId] = useState(location.pathname.split('/')[3])

    const [comment, setComment] = useState('')
    const [commentFormView, setCommentFormView] = useState(false)

    const [reply, setReply] = useState('')
    const [replyFormView, setReplyFormView] = useState(false)
    const [replyCommentId, setReplyCommentId] = useState()
    const [reloadRelies, setReloadReplies] = useState(0)

    setTimeout(() => {
        isBtnView(true)
    }, 5000)

    useEffect(() => {
        getContent()
        // Получение комментариев
        getComments(location.pathname.split('/')[3]).then((data) => {
            console.log(data.data)
            setComments(data.data)
        })

        GetProfile().then((res) => {
            console.log(res)
            setUserProfile(res.data)

        }).catch((err) => {
            console.log(err)
            if (err.response.status == 401) {
                console.log("unauth")
                navigate("/")
            }

        })


    }, [])


    const addPoint = async (e) => {
        e.preventDefault()


        const apiUrl = `/api/profile/point/${content[0].theme_id}`
        await axios.post(apiUrl,undefined,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("SKUToken")
            }
        }).then((resp) => {
            console.log(resp)
        })
      navigate(`/course/${location.pathname.split('/')[2]}`)

    }

    const addCommentHandler = async (e) => {
        e.preventDefault()
        
        // Проверяем, что поля не пустые
        if (!themeId || !comment) {
            alert("Пожалуйста, заполните комментарий");
            return;
        }
        
        try {
            const response = await addComment(themeId, comment);
            console.log(response);
            
            // Обновляем список комментариев после успешного добавления
            const updatedComments = await getComments(themeId);
            setComments(updatedComments.data);
            
            setReloadReplies(0)

            // Очищаем поле комментария
            setComment('');
            setCommentFormView(false);
            
            alert("Комментарий успешно добавлен");
        } catch (err) {
            console.error(err);
            alert("Ошибка при добавлении комментария: " + (err.response.data.message || "Неизвестная ошибка"));
        }
    }

    const addReplyHandler = async (e) => {
        e.preventDefault()

        console.log(replyCommentId)
        console.log(reply)
        if (!replyCommentId || !reply) {
            alert("Пожалуйста, заполните комментарий");
            return;
        }

        try {
            const responce = await addReply(replyCommentId,reply)
            console.log(responce)

            // Очищаем поле комментария
            setReply('');
            setReplyFormView(false);
            
            alert("Ответ на комментарий успешно отправлен");

        } catch (err) {
            console.error(err);
            alert("Ошибка при отправке ответа на комментарий: " + (err.response || "Неизвестная ошибка"));
        }
    }

    const getContent = async () => {
        const apiUrl = `/api/lessons/${location.pathname.split('/')[2]}/${location.pathname.split('/')[3]}`;
        await axios.get(apiUrl).then((resp) => {
            const lessonContent = resp.data.data;
            setContent([lessonContent]);
            console.log(lessonContent)
            
        });
        

    }

    function createMarkup(str) {
        return {__html: str};
    }

    function MyComponent({str}) {
        return <div className='content' dangerouslySetInnerHTML={createMarkup(str)}/>;
    }



    return (
        <main className="main lesson">
            <div className="lesson_header">
                <Link  onClick={PlayClick} to={"/course/"+location.pathname.split("/")[2]}>
                    <FaArrowLeft/>
                </Link>
            </div>

            <div className="lesson_content">
                {content.map(el => (
                    <MyComponent key={el.id} str={el.upkeep}/>
                ))}
            </div>



            <div className="lesson_comments">
                <div className="lesson_comments_header">
                    <h2 className='lesson_comments_header_title'>Комментарии</h2>
                    <button className='lesson_comments_header_button' onClick={() => setCommentFormView(!commentFormView)}>
                        {commentFormView ? <BiSolidCommentX/> : <BiSolidCommentEdit/>}
                    </button>
                </div>

                {commentFormView ? <div className="lesson_comments_form">
                    <p className='lesson_comments_form_title'> <span className='lesson_comments_form_title_name'>{userProfile[0].full_name}</span></p>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={8}  type="text" placeholder='Комментарий' />
                    <button onClick={(e) => addCommentHandler(e)} className='lesson_comments_form_button'>Отправить</button>
                </div> : null}

                {replyFormView ? <div className="lesson_comments_form">
                    <p className='lesson_comments_form_title'> <span className='lesson_comments_form_title_name'>{userProfile[0].full_name}</span> - ответ на комментарий</p>
                    <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={8}  type="text" placeholder='Комментарий' />
                    <button onClick={(e) => addReplyHandler(e)} className='lesson_comments_form_button'>Ответить</button>
                </div> : null}

                <div className='comments_list'>
                    {comments.map(el => (
                        <Comment  
                        setReloadReplies={setReloadReplies}
                        themeId={themeId}
                        setComments={setComments}
                        setReplyCommentId={setReplyCommentId}
                        replyFormView={replyFormView}
                        setReplyFormView={setReplyFormView}
                        userRole={userRole} 
                        key={el.id} 
                        comment={el.content} 
                        email={el.email} 
                        date={el.created_at} 
                        commentId={el.id} />
                    ))}
                </div>
            </div>
            <div className="lesson_next">
                {btnView ?
                    <button onClick={(e) => addPoint(e)}>Завершить</button>
                    : null
                }
            </div>
        </main>
    )
}

export default Lesson