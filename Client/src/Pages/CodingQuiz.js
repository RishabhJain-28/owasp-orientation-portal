import React from "react";
import Question from "../Components/QuestionCard";
import "../Components/quiz.css";
import { ButtonGroup, ProgressBar } from "react-bootstrap";

const CodingQuiz = () => {
  return (
    <div className="quiz_body">
      <div className="container">
        <div className="row justify-content-center">
          <img
            src="IMAGES/owasp_logo-13.png"
            style={{ height: "60px" }}
            className="mt-3  mb-3"
          />
        </div>
        <div className="row justify-content-center mt-3 mb-4">
          <h1 className="quiz_heading">
            <span>CODING</span> QUIZ
          </h1>
        </div>
        <ProgressBar className=" mt-5 mb-3" animated now={3} min={0} max={10} />
        <div className="mb-2 question">
          <Question
            question={{
              questionStatement: "ST",
              options: ["op1", "op2", "op3"],
            }}
          />
        </div>
        <div className="mb-2 question">
          <Question question={{ questionStatement: "ST", options: ["op1"] }} />
        </div>
        <div className="mb-2 question">
          <Question question={{ questionStatement: "ST", options: ["op1"] }} />
        </div>
        <div className="mb-2 question">
          <Question question={{ questionStatement: "ST", options: ["op1"] }} />
        </div>
        <div className="mb-2 question">
          <Question question={{ questionStatement: "ST", options: ["op1"] }} />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <button className="btn pink_btn m-2 ml-4 mr-4">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingQuiz;
