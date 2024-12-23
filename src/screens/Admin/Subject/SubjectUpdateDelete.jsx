import axios from 'axios';
import React, { useState } from 'react'

const SubjectUpdateDelete = ({openCode,closeCode,LockUnLockIcon}) => {
    const [subjectTabOpen, setsubjectTabOpen] = useState(true)


    const [subjectId, setSubjectId] = useState(0);
    const [subjectTitle, setSubjectTitle] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');
    const [subjectImage, setSubjectImage] = useState(null);
    const [courseCompleted, setCourseCompleted] = useState(false); // Новое состояние для чекбокса


    const handleSubjectUpdate = async (e) => {
        e.preventDefault();

        

        const formData = new FormData();
        formData.append('subject_id', subjectId);
        formData.append('title', subjectTitle);
        formData.append('description', subjectDescription);
        formData.append('image', subjectImage);
        formData.append('iscertificated', (courseCompleted) ? "true" : "false"); // Добавляем состояние чекбокса в formData

        try {
            const response = await axios.put('/api/subject', formData,{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("SKUToken")
                }
            });
            console.log('Ответ от сервера:', response.data);
            alert("Id измененного курса " + response.data.subject_id)
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    };

    const handleSubjectDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`/api/subject/${subjectId}`, {
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("SKUToken")
                }
            });
            console.log('Ответ от сервера:', response.data);
            alert("Курса удален" + response.data)
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    };



    return (
        <div className="admin_item" style={subjectTabOpen ? closeCode : openCode}>
            <h2 onClick={() => { setsubjectTabOpen(!subjectTabOpen) }} className='admin_item_header'
            >Редактирование курса

                {LockUnLockIcon(subjectTabOpen)}
            </h2>

            <form className='admin_item_form subject'>
                <input
                    onChange={(e) => setSubjectImage(e.target.files[0])}
                    type="file" />
                <input
                    value={subjectId}
                    onChange={(e) => { setSubjectId(e.target.value) }}
                    type="number"
                    placeholder='Id' />
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
                <label>
                    <input
                        type="checkbox"
                        checked={courseCompleted}
                        onChange={(e) => {
                            setCourseCompleted(e.target.checked)
                        }
                            
                        } // Обработчик изменения состояния чекбокса
                    />
                    Курс завершен?
                </label>
                <br />
                <div>
                <button onClick={handleSubjectUpdate}>
                Обновить
                </button>
                <button onClick={handleSubjectDelete}>
                Удалить
                </button>
                
                </div>
                
            </form>
        </div>
    )
}

export default SubjectUpdateDelete