import React, { useState } from 'react'
import { DeleteTheme } from '../../../services/theme';
import axios from 'axios';

const ThemeUpdateDelete = ({LockUnLockIcon,openCode,closeCode}) => {

    const [themeTabOpen, setthemeTabOpen] = useState(true)


    // ДЛЯ ДОБАВЛЕНИЯ ТЕМОВ НА КУРС
    const [themeId, setThemeId] = useState(0);
    const [themeTitle, setThemeTitle] = useState('');
    const [themeDescription, setThemeDescription] = useState('');
    const [themeSubjectId, setThemeSubjectId] = useState(0);
    const handleSubmitThemes = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('theme_title', themeTitle);
        formData.append('theme_description', themeDescription);

        console.log(themeId,themeTitle,themeDescription)



        try {
            const response = await axios.post(`/api/themes/${themeId}`, formData);
            console.log('Ответ от сервера:', response.data);
            alert("Id измененной темы " + response.data.theme_id)


        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    };
    const handleThemeDelete = async (e) => {
        e.preventDefault()

        DeleteTheme(themeId).then(res => {
            console.log(res)
        })
    }
  return (
    <div style={themeTabOpen ? closeCode : openCode} className="admin_item">
    <h2 onClick={() => { setthemeTabOpen(!themeTabOpen) }} className='admin_item_header'>
        Редактирование тем
        {LockUnLockIcon(themeTabOpen)}

    </h2>

    <form className='admin_item_form theme'>
    <input
            value={themeId}
            onChange={(e) => { setThemeId(e.target.value) }}
            type="number"
            placeholder='Введите id темы (обезательно)' />
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
        <div>
        <button onClick={handleSubmitThemes}>
            Обновить
        </button>
        <button onClick={handleThemeDelete}>
            Удалить
        </button>
        </div>
        
    </form>
</div>
  )
}

export default ThemeUpdateDelete