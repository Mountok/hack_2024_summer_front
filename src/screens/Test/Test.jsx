import React, { useEffect, useState } from "react";
import "./test.scss";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import TestQuestion from "../../components/testQuestion/testQuestion";
import { CheckQuestionsForTestId } from "../../services/subject_test";
import { FaArrowLeft } from "react-icons/fa";
import TestResultModal from "./TestResultModal";

const Test = () => {
  const location = useLocation();
  const [testId, setTestId] = useState(location.pathname.split("/")[2]);
  const [questions, setQuestions] = useState([]);
  const [subjectId,setSubjectId] = useState(0)
  const [selectedQueston, setSelectedQuestion] = useState([]);

  const [modalView,setModalView] = useState(true)
  const [isLoaded,setIsLoaded] = useState(false)
  const [resultPoints, setResultPoints] = useState(0)

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    await axios.get(`/api/testing/${testId}`).then((resp) => {
      console.log("test", resp.data.data);
      var questions =  resp.data.data
      setSubjectId(questions[0].subject_id)
      questions == null ? setQuestions([]) : setQuestions(resp.data.data);
    });
  };

  const SubmitQueston = async (e) => {
    e.preventDefault();
    setModalView(false)
    CheckQuestionsForTestId(testId,questions[0].subject_id,selectedQueston).then(resp=>{
      console.log(resp)
      setResultPoints(Math.trunc(( resp.points / questions.length) * 100))
    })
    setIsLoaded(true)

  };

  const setValueForQuestion = (e, question_id) => {
    const answer = e.target.value;

    setSelectedQuestion((prevSelectedQuestions) => {
      const existingAnswerIndex = prevSelectedQuestions.findIndex(
        (q) => q.question_id === question_id
      );

      if (existingAnswerIndex !== -1) {
        const updatedQuestions = [...prevSelectedQuestions];
        updatedQuestions[existingAnswerIndex].answer = answer;
        console.log(updatedQuestions);
        return updatedQuestions;
      } else {
        console.log([
          ...prevSelectedQuestions,
          {
            question_id: question_id,
            answer: answer,
          },
        ]);

        return [
          ...prevSelectedQuestions,
          {
            question_id: question_id,
            answer: answer,
          },
        ];
      }
    });
  };

  return (
    <div className="main test_questions">
      <nav>

        <Link to={"/course/"+subjectId}>
                    <FaArrowLeft/>
                </Link>
      </nav>

      <form>
        {questions.map((data, i) => (
          <TestQuestion
            key={data.id}
            data={data}
            index={i}
            setValueForQuestion={setValueForQuestion}
          />
        ))}
        <button className="test_button" onClick={SubmitQueston}>Готово</button>
      </form>

      { modalView ? null :
        <TestResultModal 
        setModalView={setModalView}  
        isLoaded={isLoaded} 
        setIsLoaded={setIsLoaded}
        resultPoints={resultPoints}
        to={"/course/"+subjectId}
        /> 
 
      }

      
    </div>
  );
};

export default Test;
