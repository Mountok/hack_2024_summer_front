import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./admin.css"
import { FaLockOpen, FaLock } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";

const Admin = () => {
    const navigate = useNavigate()

    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("PRAXIS_USER_ID"))
    useEffect(() => {
        if (isAdmin != 2) {
            navigate('/')
        }
    }, [])

    const LockUnLockIcon = (bool) => {
        if (bool) {
            return <FaLock />

        } else {
            return <FaLockOpen />

        }
    }


    const [subjectTabOpen, setsubjectTabOpen] = useState(true)
    const [themeTabOpen, setthemeTabOpen] = useState(true)
    const [lessonTabOpen, setlessonTabOpen] = useState(true)
    var closeCode = { height: "30px", backgroundColor: "var(--orange)" }
    var openCode = { height: "auto", background: "none" }

    // ДЛЯ СОЗДАНИЯ КУРСОВ
    const [subjectTitle, setSubjectTitle] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');
    const [subjectImage, setSubjectImage] = useState(null);
    const handleSubmitSubject = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', subjectTitle);
        formData.append('description', subjectDescription);
        formData.append('image', subjectImage);

        try {
            const response = await axios.post('/api/subject', formData);
            console.log('Ответ от сервера:', response.data);
            alert("Id созданного курса " + response.data.subject_id)
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    };


    // ДЛЯ ДОБАВЛЕНИЯ ТЕМОВ НА КУРС
    const [themeTitle, setThemeTitle] = useState('');
    const [themeDescription, setThemeDescription] = useState('');
    const [themeSubjectId, setThemeSubjectId] = useState('');
    const handleSubmitThemes = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', themeTitle);
        formData.append('description', themeDescription);
        formData.append('subject_id', themeSubjectId);

        try {
            const response = await axios.post('/api/themes', formData);
            console.log('Ответ от сервера:', response.data);
            alert("Id созданного темы " + response.data.theme_id)


        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    };

    // ДЛЯ ДОБАВЛЕНИЯ СОДЕРЖАНИЯ В ТЕМЫ
    const [themeId, setThemeId] = useState('');
    const [themeHTML, setThemeHTML] = useState('');
    const handleSubmitLessons = async (e) => {
        e.preventDefault();

        // Создаем объект с данными для отправки
        const formData = new FormData();
        formData.append('theme_id', themeId);
        formData.append('theme_html', themeHTML);

        try {
            const response = await axios.post('/api/lessons', formData);
            console.log('Ответ от сервера:', response.data);
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }

    };


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
            <div className="admin_item" style={subjectTabOpen ? closeCode : openCode}>
                <h2 onClick={() => { setsubjectTabOpen(!subjectTabOpen) }} className='admin_item_header'>Добавить курс

                    {LockUnLockIcon(subjectTabOpen)}
                </h2>

                <form onSubmit={handleSubmitSubject} className='admin_item_form subject'>
                    <input
                        onChange={(e) => setSubjectImage(e.target.files[0])}
                        type="file" />
                    <input
                        value={subjectTitle}
                        onChange={(e) => { setSubjectTitle(e.target.value) }}
                        type="text"
                        placeholder='Название' />
                    <input
                        value={subjectDescription}
                        onChange={(e) => { setSubjectDescription(e.target.value) }}
                        type="text"
                        placeholder='Описание' />

                    <br />
                    <button type='submit'>
                        Добавить
                    </button>
                </form>
            </div>

            <div style={themeTabOpen ? closeCode : openCode} className="admin_item">
                <h2 onClick={() => { setthemeTabOpen(!themeTabOpen) }} className='admin_item_header'>
                    Добавить темы
                    {LockUnLockIcon(themeTabOpen)}

                </h2>

                <form onSubmit={handleSubmitThemes} className='admin_item_form theme'>
                    <input
                        value={themeTitle}
                        onChange={(e) => { setThemeTitle(e.target.value) }}
                        type="text"
                        placeholder='Название' />
                    <input
                        value={themeDescription}
                        onChange={(e) => { setThemeDescription(e.target.value) }}
                        type="text"
                        placeholder='Описание' />
                    <input
                        value={themeSubjectId}
                        onChange={(e) => { setThemeSubjectId(e.target.value) }}
                        type="number"
                        placeholder='Введите id курса' />
                    <br />
                    <button type='submit'>
                        Добавить
                    </button>
                </form>
            </div>

            <div style={lessonTabOpen ? closeCode : openCode} className="admin_item">
                <h2 onClick={() => { setlessonTabOpen(!lessonTabOpen) }} className='admin_item_header'>
                    Добавить содержание к теме
                    {LockUnLockIcon(lessonTabOpen)}

                </h2>

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
                </form>
            </div>
        </main>
    )
}

export default Admin