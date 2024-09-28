import React, { useEffect, useState } from 'react'
import "./testQuestion.css"
import axios from 'axios'
import { useLocation } from 'react-router-dom'
const TestQuestion = () => {
    const location = useLocation()
    const [testId, setTestId] = useState(location.pathname.split("/")[2])
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        getQuestion()
    }, [])

    const getQuestion = async () => {
        await axios.get(`/api/testing/${testId}`).then((resp) => {
            console.log(resp.data)
            setQuestions(resp.data.data)
        })
    }
    return (
        <div className="main test_questions">

            <form >
                {
                    questions.map((q, index, array) => (
                        <div key={q.id} className="question_item">
                            <label>{q.question}</label>
                            {
                                q.options.split(';').map((option, i) => <div key={i}>
                                    <input type="radio" name={q.question} value={option} id={q.question + i} />
                                    <label htmlFor={q.question + i}>{option}</label>
                                </div>)
                            }

                        </div>
                    ))
                }

            </form>

        </div>
    )
}

export default TestQuestion