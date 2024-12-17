import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./admin.css"
import { FaLockOpen, FaLock } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import SubjectForm from './Subject/SubjectForm';
import SubjectUpdateDelete from './Subject/SubjectUpdateDelete';
import ThemeForm from './Theme/ThemeForm';
import ThemeUpdateDelete from './Theme/ThemeUpdateDelete';
import SubjectTest from './Tests/SubjectTest';
import TestQuestion from './Tests/TestQuestion';
import Editor from '../../components/textEditor/Editor';

const closeCode = { height: "30px", backgroundColor: "var(--orange)" }
const openCode = { height: "fit-content", background: "none", overflow: "visible" }

const Admin = () => {
    const navigate = useNavigate()

    // const [isAdmin, setIsAdmin] = useState(localStorage.getItem("PRAXIS_USER_ID"))
    // useEffect(() => {
    //     if (isAdmin != 2) {
    //         navigate('/')
    //     }
    // }, [])

    const LockUnLockIcon = (bool) => bool ? <FaLock /> : <FaLockOpen />

    const [lessonTabOpen, setlessonTabOpen] = useState(true)
    

    


    
 

    // Функции для предпросмотра
    const [prevView, setPrevView] = useState(false)
    function showPrevView(e) {
        e.preventDefault()
        setPrevView(!prevView)
    }
    function createMarkup(str) {
        return { __html: str };
    }

    function MyComponent({ str, prevView }) {
        return <div style={{ display: prevView ? "block" : "none" }} className='content' dangerouslySetInnerHTML={createMarkup(str)} />;
    }



    return (
        <main className='main admin'>
            <SubjectForm 
            
            openCode={openCode} closeCode={closeCode} 
            LockUnLockIcon={LockUnLockIcon}/>

            <SubjectUpdateDelete
openCode={openCode} closeCode={closeCode} 
LockUnLockIcon={LockUnLockIcon}
            />


            <ThemeForm
            openCode={openCode} closeCode={closeCode}
            LockUnLockIcon={LockUnLockIcon}
            />

            <ThemeUpdateDelete
            openCode={openCode} closeCode={closeCode}
            LockUnLockIcon={LockUnLockIcon}
            />

            

            <div style={lessonTabOpen ? closeCode : openCode} className="admin_item">
                 <h2 onClick={() => { setlessonTabOpen(!lessonTabOpen) }} className='admin_item_header'>
                    Добавить содержание к теме
                    {LockUnLockIcon(lessonTabOpen)}

                </h2>
{/*
                <form onSubmit={handleSubmitLessons} className='admin_item_form lesson'>
                    <input
                        value={themeId}
                        onChange={(e) => { setThemeId(e.target.value) }}
                        type="number"
                        placeholder='Введите id темы' />
                    <textarea
                        style={{
                            display: prevView ? "none" : "block"
                        }}
                        id='html'
                        cols={50}
                        rows={10}

                        value={themeHTML}
                        onChange={(e) => setThemeHTML(e.target.value)}
                    >

                    </textarea>

                    <div className="lesson_content">

                        <MyComponent key={1} str={themeHTML} prevView={prevView} />

                    </div>
                    <br />

                    <button type='submit'>
                        Добавить
                    </button>
                    <br />
                    <button onClick={(e) => showPrevView(e)}>
                        Предпросмотр
                    </button>
                    <FaQuestionCircle onClick={()=>navigate("/doc")}/>
                </form> */}
                <Editor/>
            </div>



            <SubjectTest
            openCode={openCode} closeCode={closeCode}
            LockUnLockIcon={LockUnLockIcon}/>


            <TestQuestion
            openCode={openCode} closeCode={closeCode}
            LockUnLockIcon={LockUnLockIcon}/>
        </main>

    )
}

export default Admin