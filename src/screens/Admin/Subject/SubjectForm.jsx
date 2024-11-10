import axios from 'axios';
import React, { useState } from 'react'

const SubjectForm = ({closeCode,openCode,LockUnLockIcon}) => {
    const [subjectTabOpen, setsubjectTabOpen] = useState(true)

    // ДЛЯ СОЗДАНИЯ КУРСОВ
    const [subjectTitle, setSubjectTitle] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');
    const [subjectImage, setSubjectImage] = useState(null);
    const [courseCompleted, setCourseCompleted] = useState('false'); // Новое состояние для чекбокса
    
    const handleSubmitSubject = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', subjectTitle);
        formData.append('description', subjectDescription);
        formData.append('image', subjectImage);
        formData.append('iscertificated', "false"); // Добавляем состояние чекбокса в formData
        try {
            const response = await axios.post('/api/subject', formData);
            console.log('Ответ от сервера:', response.data);
            alert("Id созданного курса " + response.data.subject_id)
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    };

  return (
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
  )
}

export default SubjectForm