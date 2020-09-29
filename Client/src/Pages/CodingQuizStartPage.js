import React, { useState, useEffect } from "react";
import { ButtonGroup } from "react-bootstrap";
import axios from "../util/axios";
import { Redirect } from "react-router-dom";

import "../Components/quiz.css";

import CodingQuiz from "./CodingQuiz";

const CodingQuizStartPage = ({ match }) => {
  const [start, setStart] = useState(false);
  const [user, setUser] = useState({});
  const submit = useState(false);
  // const [questions, setQuestions] = useState([]);
  const [questions, setQuestions] = useState([
    { _id: "1", statement: "asad", options: ["op1", "op2"] },
    { _id: "2", statement: "asad", options: ["op1", "op2"] },
    { _id: "3", statement: "asad", options: ["op1", "op2"] },
    { _id: "4", statement: "asad", options: ["op1", "op2"] },
    { _id: "5", statement: "asad", options: ["op1", "op2"] },
    { _id: "6", statement: "asad", options: ["op1", "op2"] },
    { _id: "7", statement: "asad", options: ["op1", "op2"] },
    { _id: "8", statement: "asad", options: ["op1", "op2"] },
  ]);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    async function getQuestions() {
      try {
        const local = JSON.parse(localStorage.getItem("questions2"));
        // alert(local);
        if (local && local.length) {
          // return setQuestions(local);
        }
        const { data } = await axios.get(`/quiz/start/${match.params.id}`); //!add route
        // console.log("questions", data);

        localStorage.setItem("questions2", JSON.stringify(data.questionIds));
        // setQuestions(data.questionIds);
      } catch (err) {
        alert(err);
        // localStorage.setItem("questions", JSON.stringify([]));
        // setQuestions([]);
        setRedirect(true);
      }
    }
    getQuestions();
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    let start = localStorage.getItem("session*&startc");
    if (!start) {
      start = String.fromCharCode(0);
    }
    setStart(start.charCodeAt(0) === 1 ? true : false);
  }, []);

  function startQuiz() {
    localStorage.setItem("session*&startc", String.fromCharCode(1));
    localStorage.setItem("session#hash%20tc", String.fromCharCode(0));
    localStorage.setItem("session_$index%c", String.fromCharCode(0 * 2 + 6));
    setStart(true);
  }
  //! check if quiz start from backend
  //! load questions from

  if (!user) {
    return <Redirect to="/" />;
  }
  if (redirect) return <Redirect to="/dashboard" />; //! local storage
  return (
    <>
      {start ? (
        <CodingQuiz submit={submit} user={user} questions={questions} />
      ) : (
        <div className="quiz_body">
          <div className="container">
            <div className="row justify-content-center">
              <img
                src="/IMAGES/owasp_logo-13.png"
                style={{ height: "60px" }}
                className="mt-3  mb-3"
              />
            </div>
            <div className="row justify-content-center mt-3 mb-4">
              <h1 className="quiz_heading">
                <span>FUN</span> QUIZ
              </h1>
            </div>
            <div className="mb-2 question">
              <div className="container">
                <div className="row justify-content-center">
                  <ButtonGroup className="m-2 ml-4 mr-4">
                    <button
                      className="btn blue_btn"
                      onClick={() => startQuiz()}
                    >
                      Start
                    </button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* </Switch> */}
    </>
  );
};

export default CodingQuizStartPage;
