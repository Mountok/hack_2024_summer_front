import axios from 'axios';
import React, { useState } from 'react'

const TestQuestion = ({openCode,closeCode,LockUnLockIcon}) => {
    const [themeTabOpen, setthemeTabOpen] = useState(true)


    const [testId, setTestId] = useState('');
    const [question, setQuestion] = useState('');
    const [questionCorrectAnswer, setQuestionCorrectAnswer] = useState('');
    const [questionAnswers, setQuestionAnswers] = useState('');
    // const [testSubjectId, setTestSubjectId] = useState('');


    const handleSubmitTestQuestion = async() => {
        

        const formData = new FormData()
        formData.append("question",question)
        formData.append("options",questionAnswers)
        formData.append("answer",questionCorrectAnswer)

        
        try {
            const response = await axios.post(`/api/testing/${testId}`, formData, {
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("SKUToken")
                }
            });
            console.log('Ответ от сервера:', response.data);
            alert("Id созданного вопроса " + response.data.data)
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    }

    return (
        <div style={themeTabOpen ? closeCode : openCode} className="admin_item">
            <h2 onClick={() => { setthemeTabOpen(!themeTabOpen) }} className='admin_item_header'>
                Добавить вопрос к тесту
                {LockUnLockIcon(themeTabOpen)}

            </h2>

            <form onSubmit={handleSubmitTestQuestion} className='admin_item_form theme'>
                <input
                    value={testId}
                    onChange={(e) => { setTestId(e.target.value) }}
                    type="number"
                    placeholder='Введите id тест' />
                <input
                    value={question}
                    onChange={(e) => { setQuestion(e.target.value) }}
                    type="text"
                    placeholder='Вопрос' />
                <input
                    value={questionCorrectAnswer}
                    onChange={(e) => { setQuestionCorrectAnswer(e.target.value) }}
                    type="text"
                    placeholder='Введите верный ответ' />
                <input
                    value={questionAnswers}
                    onChange={(e) => { setQuestionAnswers(e.target.value) }}
                    type="text"
                    placeholder='Перечилите варинаты' />
                    <i>Пример: Вариант1;Вариант2;Вариант3;Вариант4;</i>

                    <br />

                    
                    {/* <input
                    
                    // value={questionAnswers}
                    onChange={(e) => { e.preventDefault()}}
                    type="number"
                    placeholder='Введите id ' />
                    <i>ТОЛЬКО ЕСЛИ ХОТИТЕ ОБНОВИТЬ/УДАЛИТЬ ВОПРОС</i> */}

                <br />
                <button type='submit'>
                    Добавить
                </button>
            </form>
        </div>
    )
}

export default TestQuestion