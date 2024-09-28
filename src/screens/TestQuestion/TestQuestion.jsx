import React, { useEffect, useState } from 'react'
import "./testQuestion.css"
import axios from 'axios'
import { useLocation } from 'react-router-dom'
const TestQuestion = () => {
    const location = useLocation()
    const [testId, setTestId] = useState(location.pathname.split("/")[2])
    const [questions, setQuestions] = useState([])
    const [selectedQueston, setSelectedQuestion] = useState([])
    useEffect(() => {
        getQuestion()
    }, [])

    const getQuestion = async () => {
        await axios.get(`/api/testing/${testId}`).then((resp) => {
            console.log(resp.data)
            setQuestions(resp.data.data)
        })
    }

    const SubmitQueston = async (e) => {
        e.preventDefault()
        await axios.post(`/api/test/check/${testId}`,selectedQueston).then((resp)=>{
            console.log(resp.data)
        })
    }

    const setValueForQuestion = (e, question_id) => {
        const answer = e.target.value;

        setSelectedQuestion(prevSelectedQuestions => {
            const existingAnswerIndex = prevSelectedQuestions.findIndex(q => q.question_id === question_id);

            if (existingAnswerIndex !== -1) {
                const updatedQuestions = [...prevSelectedQuestions];
                updatedQuestions[existingAnswerIndex].answer = answer;
                console.log(updatedQuestions)
                return updatedQuestions;
            } else {
                console.log([
                    ...prevSelectedQuestions,
                    {
                        question_id: question_id,
                        answer: answer
                    }
                ])

                return [
                    ...prevSelectedQuestions,
                    {
                        question_id: question_id,
                        answer: answer
                    }
                ];
            }
        });
    };



    return (
        <div className="main test_questions">

            <form >
                {
                    questions.map((q, index, array) => (
                        <div key={q.id} className="question_item">
                            <label>{index + 1 + ". " + q.question}</label>
                            {
                                q.options.split(';').map((option, i) => <div key={i}>
                                    <input onChange={(e)=>setValueForQuestion(e,q.id)} type="radio" name={q.question} value={option} id={q.question + i} />
                                    <label htmlFor={q.question + i}>{option}</label>
                                </div>)
                            }

                        </div>
                    ))
                }

                <button onClick={SubmitQueston}>Отправить</button>
            </form>

        </div>
    )
}

export default TestQuestion