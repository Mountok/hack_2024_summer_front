import React, { useState } from 'react'
import axios from 'axios';

const SubjectTest = ({openCode,closeCode,LockUnLockIcon}) => {

    const [themeTabOpen, setthemeTabOpen] = useState(true)


    const [testTitle, setTestTitle] = useState('');
    const [testSubjectId, setTestSubjectId] = useState('');

    const handleSubmitThemes = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', testTitle);

        try {
            const response = await axios.post(`/api/test/${testSubjectId}`, formData);
            console.log('Ответ от сервера:', response.data);
            alert("Id созданного курса " + response.data.subject_id)
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    };

  return (
    <div style={themeTabOpen ? closeCode : openCode} className="admin_item">
    <h2 onClick={() => { setthemeTabOpen(!themeTabOpen) }} className='admin_item_header'>
        Добавить тест
        {LockUnLockIcon(themeTabOpen)}

    </h2>

    <form onSubmit={handleSubmitThemes} className='admin_item_form theme'>
        <input
            value={testTitle}
            onChange={(e) => { setTestTitle(e.target.value) }}
            type="text"
            placeholder='Название' />
        <input
            value={testSubjectId}
            onChange={(e) => { setTestSubjectId(e.target.value) }}
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

export default SubjectTest