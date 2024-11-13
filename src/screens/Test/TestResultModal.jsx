import React from 'react'
import "./test.scss"
import Loading from "../../components/loading/Loading"
import { useNavigate } from 'react-router-dom'
const TestResultModal = ({to,setModalView,isLoaded, setIsLoaded,resultPoints}) => {
    const navigate = useNavigate()
    const exitFromModal = () => {
        setModalView(true)
        setIsLoaded(false)
    }

    const exitFromTest = () => {
        setModalView(true)
        setIsLoaded(false)
        navigate(to)

    }

    return (
        <>
            <div className="test_modal_back"></div>
            <div className='test_modal'>
                <h2>Ваш результат</h2>
                <div className="test_modal_result">
                    <p>
                        {isLoaded ? resultPoints + "%": <Loading/>}
                        
                    </p>
                    <div>
                        <button onClick={exitFromTest}  className='test_modal_prev'>Вернуться обратно</button>
                        <button onClick={exitFromModal} className='test_modal_reset' >Повторить</button>

                    </div>
                </div>

            </div>
        </>

    )
}

export default TestResultModal