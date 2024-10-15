import axios from 'axios';
import React, { useState } from 'react'
import { CreateTheme } from '../../../services/theme';

const ThemeForm = ({openCode,closeCode,LockUnLockIcon}) => {
    const [themeTabOpen, setthemeTabOpen] = useState(true)


    const [themeTitle, setThemeTitle] = useState('');
    const [themeDescription, setThemeDescription] = useState('');
    const [themeSubjectId, setThemeSubjectId] = useState('');
    const handleSubmitThemes = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', themeTitle);
        formData.append('description', themeDescription);
        formData.append('subject_id', themeSubjectId);

        CreateTheme(formData).then(res => {
            console.log(res)
        })
    };



  return (
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
  )
}

export default ThemeForm