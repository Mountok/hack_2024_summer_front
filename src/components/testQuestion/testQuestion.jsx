import React from "react";
import "./testQuestion.scss";
import { FaCheck } from "react-icons/fa";
import { PlayClick } from "../../utils/click";

const TestQuestion = ({ data, index, setValueForQuestion }) => {
  return (
    <div className="question_item">
      <h3>{index + 1 + ". " + data.question}</h3>
      {data.options.split(";").map((option, i) => (
        <div onClick={PlayClick} className="question_option" key={i}>
          <label htmlFor={data.question + i}>
            <input
              onChange={(e) => setValueForQuestion(e, data.id)}
              type="radio"
              name={data.question}
              value={option}
              id={data.question + i}
            />
            <span className="radio-button">
              <FaCheck />
            </span>
            <span>{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default TestQuestion;
