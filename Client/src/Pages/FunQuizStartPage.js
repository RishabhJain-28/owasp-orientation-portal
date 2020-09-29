import React, { useState, useEffect } from "react";
import { ButtonGroup } from "react-bootstrap";
import axios from "../util/axios";
import { Redirect } from "react-router-dom";

import "../Components/quiz.css";
import { hash, dehash } from "../util/encrypt";
import FunQuiz from "./FunQuiz";
// function hash(i) {
//   return i + 100;
//   // return String.fromCharCode(i + 100);
// }
// function dehash(code) {
//   return code - 100;
//   // return code.charCodeAt(0) - 100;
// }
const FunQuizStartPage = ({ match }) => {
  const [start, setStart] = useState(false);
  const [user, setUser] = useState({});
  const submit = useState(false);
  const [questions, setQuestions] = useState([]);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    // localStorage.setItem("session#hash%20t", hash(0));
    async function getQuestions() {
      try {
        const local = JSON.parse(localStorage.getItem("questions"));
        // alert(local);
        if (local && local.length) {
          return setQuestions(local);
        }
        const { data } = await axios.get(`/quiz/start/${match.params.id}`); //!add route
        console.log("questions", data);

        localStorage.setItem("questions", JSON.stringify(data.questionIds));
        setQuestions(data.questionIds);
      } catch (err) {
        alert("CANT FETCH QUESTIONS", err);
        // localStorage.setItem("questions", JSON.stringify([]));
        // setQuestions([]);
        setRedirect(true);
      }
    }
    getQuestions();
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    let start = localStorage.getItem("session*&start");
    if (!start) {
      start = String.fromCharCode(0);
    }
    setStart(start.charCodeAt(0) === 1 ? true : false);
  }, []);

  function startQuiz() {
    localStorage.setItem("session*&start", String.fromCharCode(1));
    localStorage.setItem("session#hash%20t", hash(0));
    // localStorage.setItem("session_$index%", String.fromCharCode(0 * 2 + 6));
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
        <FunQuiz
          hash={hash}
          dehash={dehash}
          submit={submit}
          user={user}
          questions={questions}
        />
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

export default FunQuizStartPage;
