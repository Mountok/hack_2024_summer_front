import React, { useEffect, useState } from "react";
import "./test.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
import TestQuestion from "../../components/testQuestion/testQuestion";
import { CheckQuestionsForTestId } from "../../services/subject_test";

const Test = () => {
  const location = useLocation();
  const [testId, setTestId] = useState(location.pathname.split("/")[2]);
  const [questions, setQuestions] = useState([]);
  const [selectedQueston, setSelectedQuestion] = useState([]);

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    await axios.get(`/api/testing/${testId}`).then((resp) => {
      console.log("test", resp.data.data);
      var questions =  resp.data.data
      questions == null ? setQuestions([]) : setQuestions(resp.data.data);
    });
  };

  const SubmitQueston = async (e) => {
    e.preventDefault();
    CheckQuestionsForTestId(testId,questions[0].subject_id,localStorage.getItem("PRAXIS_USER_ID"),selectedQueston).then(resp=>{
      console.log(resp)
    })
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
      <form>
        {questions.map((data, i) => (
          <TestQuestion
            key={data.id}
            data={data}
            index={i}
            setValueForQuestion={setValueForQuestion}
          />
        ))}
        <button className="test_button" onClick={SubmitQueston}>Отправить</button>
      </form>
    </div>
  );
};

export default Test;
