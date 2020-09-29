import React, { useState, useEffect } from "react";
import { ButtonGroup } from "react-bootstrap";
import axios from "../util/axios";
import { Redirect } from "react-router-dom";

import "../Components/quiz.css";
import CodingQuiz from "./CodingQuiz";
import { hash, dehash } from "../util/encrypt";

const CodingQuizStartPage = ({ match }) => {
  const [start, setStart] = useState(false);
  const [user, setUser] = useState({});
  const submit = useState(false);
  const [questions, setQuestions] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // localStorage.setItem("session#hash%20t", hash(0));
    async function getQuestions() {
      try {
        const local = JSON.parse(localStorage.getItem("questions2"));
        // alert(local);
        if (local && local.length) {
          return setQuestions(local);
        }
        const { data } = await axios.get(`/quiz/start/${match.params.id}`); //!add route
        console.log("questions", data);

        localStorage.setItem("questions2", JSON.stringify(data.questionIds));
        setQuestions(data.questionIds);
        setLoading(false);
      } catch (err) {
        alert("The quiz has not been started yet", err);
        // localStorage.setItem("questions", JSON.stringify([]));
        // setQuestions([]);
        setRedirect(true);
      }
    }
    getQuestions();
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    let start = localStorage.getItem("session*&start2");
    if (!start) {
      start = String.fromCharCode(0);
    }
    setStart(start.charCodeAt(0) === 1 ? true : false);
  }, []);

  function startQuiz() {
    localStorage.setItem("session*&start2", String.fromCharCode(1));
    localStorage.setItem("session#hash%20t2", hash(0));
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
        <CodingQuiz
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
                CODING <span>QUIZ</span>
              </h1>
            </div>
            <div className="mb-2 question">
              <div className="container">
                <div className="row justify-content-center">
                  <ButtonGroup className="m-2 ml-4 mr-4">
                    <button
                      className="btn blue_btn"
                      disabled={loading}
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
