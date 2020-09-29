import React, { useState, useEffect } from "react";
import Question from "../Components/QuestionCard";
import { ButtonGroup, ProgressBar } from "react-bootstrap";
import axios from "../util/axios";
import "../Components/quiz.css";

const FunQuiz = ({ user, questions, submit: [submit, setSubmit] }) => {
  const [maxTime] = useState(15);
  const [time, setTime] = useState(0);
  const [timerID, setTimerID] = useState("");
  const [q_index, setQ_index] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
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

      if (decodedIndex >= questions.length) return submitQuiz();
      localStorage.setItem(
        "session_$index%",
        String.fromCharCode(decodedIndex * 2 + 6)
      );
    }
    setTime(time ? decodedTime : 0);
    setQ_index(index ? decodedIndex : 0);
  }, []);

  useEffect(() => {
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
  }, [time]);

  async function submitQuiz() {
    console.log("QUIZ SUBMIITED");

    alert("QUIZ SUBMIITED");
    try {
      const { data } = await axios.post("/questionBank/submit", {
        responses: answers,
      });
      console.log(data);
      setScore(data.score);
    } catch (err) {
      alert("can not resubmit ");
    }
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
  function markAns(e, id) {
    const ans = answers;
    ans[id] = e.target.value;
    console.log(ans);
    setAnswers(ans);
  }
  return (
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
        {!submit ? (
          <>
            <div className="mb-2 question">
              <Question
                num={q_index + 1}
                markAns={markAns}
                question={questions[q_index]}
              />
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
                <ButtonGroup className="m-2 ml-4 mr-4">
                  {q_index === questions.length - 1 ? (
                    <button
                      className="btn pink_btn"
                      onClick={() => submitQuiz()}
                    >
                      Submit
                    </button> //! add submit
                  ) : (
                    <button className="btn blue_btn" onClick={nextQuestion}>
                      Next
                    </button>
                  )}
                </ButtonGroup>
              </div>
            </div>
          </>
        ) : (
          <AfterSubmit user={user} score={score} />
        )}
      </div>
    </div>
  );
};

export default FunQuiz;

function AfterSubmit({ user, score }) {
  return (
    <div className="question">
      Nicely done {user.username}! You got{" "}
      <span className="auto_submit_span">{score}</span> marks!!!
      <br />
      <Link to="/dashboard">Back to dashboard</Link>
    </div>
  );
}
