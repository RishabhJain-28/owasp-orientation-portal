import React, { useState, useEffect } from "react";
import Question from "../Components/QuestionCard";
import "../Components/quiz.css";
import { ButtonGroup, ProgressBar } from "react-bootstrap";
import axios from "../util/axios";
import { Redirect } from "react-router-dom";
const FunQuiz = () => {
  const [start, setStart] = useState(false);
  const [maxTime] = useState(15);
  const [time, setTime] = useState(0);
  const [timerID, setTimerID] = useState("");
  const [q_index, setQ_index] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [user, setUser] = useState({});
  const [questions] = useState([
    {
      questionStatement: "STATMENT 1",
      options: ["option 1-1", "option 1-2", "option 1-3", "option 1-4"],
    },
    {
      questionStatement: "STATMENT 2",
      options: ["option 2-1", "option 2-2", "option 2-3", "option 2-4"],
    },
    {
      questionStatement: "STATMENT 3",
      options: ["option 2-1", "option 2-2", "option 2-3", "option 2-4"],
    },
    {
      questionStatement: "STATMENT 4",
      options: ["option 2-1", "option 2-2", "option 2-3", "option 2-4"],
    },
    {
      questionStatement: "STATMENT 5",
      options: ["option 2-1", "option 2-2", "option 2-3", "option 2-4"],
    },
    {
      questionStatement: "STATMENT 6",
      options: ["option 2-1", "option 2-2", "option 2-3", "option 2-4"],
    },
  ]);
  useEffect(() => {});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    let time = localStorage.getItem("session#hash%20t"); //!time
    let index = localStorage.getItem("session_$index%"); //!q_index
    if (!index) {
      localStorage.setItem("session_$index%", String.fromCharCode(0 * 2 + 6));
      index = String.fromCharCode(0 * 2 + 6);
    }
    if (!time) {
      localStorage.setItem("session#hash%20t", String.fromCharCode(0));
      time = String.fromCharCode(0);
    }
    let decodedIndex = (index.charCodeAt(0) - 6) / 2;
    let decodedTime = time.charCodeAt(0);
    if (decodedIndex === questions.length) {
      localStorage.setItem("session#hash%20t", String.fromCharCode(0));
      localStorage.setItem("session_$index%", String.fromCharCode(6 * 2 + 6));
      return setSubmit(true);
    }
    if (maxTime < decodedTime) {
      localStorage.setItem("session#hash%20t", String.fromCharCode(0));
      decodedTime = 0;
      decodedIndex++;

      if (decodedIndex >= questions.length) return setSubmit(true);
      localStorage.setItem(
        "session_$index%",
        String.fromCharCode(decodedIndex * 2 + 6)
      );
    }
    setTime(time ? decodedTime : 0);
    setQ_index(index ? decodedIndex : 0);
  }, [start]);

  useEffect(() => {
    if (!start) return;
    if (submit) return;
    setTimerID(
      setTimeout(() => {
        let t = time;
        if (t === maxTime) {
          if (q_index + 1 >= questions.length) submitQuiz();
          else nextQuestion();
        } else {
          t++;
          localStorage.setItem("session#hash%20t", String.fromCharCode(t));
          setTime(t);
        }
      }, 1000)
    );
    clearTimeout(timerID);
  }, [time, start]);

  function submitQuiz() {
    console.log("QUIZ SUBMIITED");
    alert("QUIZ SUBMIITED");
    //!submit quiz
    localStorage.setItem("session#hash%20t", String.fromCharCode(0));
    localStorage.setItem("session_$index%", String.fromCharCode(6 * 2 + 6));
    setSubmit(true);
  }
  function nextQuestion() {
    let i = q_index;
    i++;
    localStorage.setItem("session_$index%", String.fromCharCode(i * 2 + 6));
    localStorage.setItem("session#hash%20t", String.fromCharCode(0));
    setTime(0);
    setQ_index(i);
  }
  if (!user) return <Redirect to="/" />;
  //   if(!start)return (<>
  //   </>)
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
            <span>FUN</span> QUIZ
          </h1>
        </div>
        {!submit ? (
          !start ? (
            <div className="mb-2 question">
              <ButtonGroup className="m-2 ml-4 mr-4">
                <button className="btn blue_btn" onClick={() => setStart(true)}>
                  Start
                </button>
              </ButtonGroup>
            </div>
          ) : (
            <>
              <div className="mb-2 question">
                <Question question={questions[q_index]} />
                {q_index === questions.length - 1 && maxTime - time < 5 && (
                  <p>
                    Auto submitting in{" "}
                    <span className="auto_submit_span">{maxTime - time}</span>{" "}
                    seconds...
                  </p>
                )}
              </div>
              <ProgressBar
                className="mb-3"
                animated
                now={time}
                min={0}
                max={maxTime}
              />
              <div className="container">
                <div className="row justify-content-center">
                  {/* <ButtonGroup className="m-2 ml-4 mr-4">
                        <button className="btn blue_btn">Previous</button>
                      </ButtonGroup> */}

                  <ButtonGroup className="m-2 ml-4 mr-4">
                    {q_index === questions.length - 1 ? (
                      <button className="btn pink_btn">Submit</button> //! add submit
                    ) : (
                      <button className="btn blue_btn" onClick={nextQuestion}>
                        Next
                      </button>
                    )}
                  </ButtonGroup>
                  {/* <ButtonGroup className="m-2 ml-4 mr-4">
                        <button className="btn blue_btn">Next</button>
                      </ButtonGroup> */}
                </div>
              </div>
            </>
          )
        ) : (
          <AfterSubmit user={user} />
        )}
      </div>
    </div>
  );
};

export default FunQuiz;

function AfterSubmit({ user }) {
  return <div className="question">Nicely done {user.username}</div>;
}
