import React, { useState, useEffect } from "react";
import Question from "../Components/QuestionCard";
import { ButtonGroup, ProgressBar } from "react-bootstrap";
import axios from "../util/axios";
import { Link } from "react-router-dom";
import "../Components/quiz.css";
import { hash, dehash } from "../util/encrypt";
const RecruitmentQuiz = ({ user, questions, submit: [submit, setSubmit] }) => {
  const [maxTime] = useState(2 * 60);
  const [time, setTime] = useState();
  const [timerID, setTimerID] = useState("");
  //   const [q_index, setQ_index] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let score = localStorage.getItem("score");
    console.log(score);

    let time = localStorage.getItem("session#hash%20t3"); //!time
    let ans = localStorage.getItem("session#ans3"); //!time
    if (ans) setAnswers(JSON.parse(ans));
    if (score) setScore(score);

    if (!time) {
      localStorage.setItem("session#hash%20t3", hash(0));
      console.log("setting time 0");
      time = hash(0);
      setTime(0);
    }

    let decodedTime = dehash(time);

    if (decodedTime === -1) {
      // setQ_index(6);
      setSubmit(true);
      return;
    }

    if (decodedTime >= maxTime) {
      localStorage.setItem("session#hash%20t3", hash(-1));
      return submitQuiz();
    }
    setTime(decodedTime);
  }, []);

  useEffect(() => {
    if (submit) return;
    if (submitted) return;

    if (isNaN(Number(time))) return;
    setTimerID(
      setTimeout(() => {
        let t = time;
        if (t === -1) return;
        if (t >= maxTime) {
          submitQuiz();
        } else {
          t++;
          localStorage.setItem("session#hash%20t3", hash(t));
          setTime(t);

          // setQ_index(Math.floor(t / maxTime));
        }
      }, 1000)
    );
    clearTimeout(timerID);
  }, [time]);

  async function submitQuiz() {
    setSubmitted(true);
    console.log("QUIZ SUBMIITED");
    if (submitted) return;
    if (submit) return;
    try {
      const { data, status } = await axios.post("/questionBank/submit", {
        responses: answers,
      });
      console.log(data);
      if (status == 200) {
        alert("QUIZ SUBMIITED");
      }
      localStorage.setItem("score", data.score);
      setScore(data.score);
    } catch (err) {
      console.log(err);
      if (err.status === 403)
        return alert(`cookie error ${JSON.stringify(err)}`);
      alert(`can not resubmit ${JSON.stringify(err)}`);
    }
    clearTimeout(timerID);
    setTime(-1);

    localStorage.setItem("session#hash%20t3", hash(-1));

    setSubmit(true);
  }
  //   function nextQuestion() {
  //     let t = time;
  //     t = (q_index + 1) * maxTime;

  //     localStorage.setItem("session#hash%20t3", hash(t));
  //     setTime(t);
  //     setQ_index(Math.floor(t / maxTime));
  //   }
  function markAns(e, id) {
    const ans = answers;
    ans[id] = e.target.value;
    console.log(ans);
    localStorage.setItem("session#ans3", JSON.stringify(ans));
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
            <span>TEST </span> QUIZ
          </h1>
        </div>

        {!submit ? (
          <>
            <ProgressBar
              className="mb-3"
              animated
              now={Math.floor(time % maxTime)}
              min={0}
              max={maxTime}
            />
            {maxTime - time < 60 && (
              <div className="mb-2 question">
                <p>
                  Auto submitting in{" "}
                  <span className="auto_submit_span">{maxTime - time}</span>{" "}
                  seconds...
                </p>
              </div>
            )}
            {questions.map((question, i) => (
              <div className="mb-2 question">
                <Question num={i + 1} markAns={markAns} question={question} />
              </div>
            ))}

            {maxTime - time < 60 && (
              <div className="mb-2 question">
                <p>
                  Auto submitting in{" "}
                  <span className="auto_submit_span">{maxTime - time}</span>{" "}
                  seconds...
                </p>
              </div>
            )}

            <div className="container">
              <div className="row justify-content-center">
                <ButtonGroup className="m-2 ml-4 mr-4">
                  {/* {q_index === questions.length - 1 ? ( */}
                  <button
                    disabled={submitted}
                    className="btn pink_btn"
                    onClick={() => submitQuiz()}
                  >
                    Submit
                  </button>

                  {/* ) : (
                    <button className="btn blue_btn" onClick={nextQuestion}>
                      Next
                    </button>
                  )} */}
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

export default RecruitmentQuiz;

function AfterSubmit({ user, score }) {
  return (
    <div className="question">
      Nicely done {user.name}! You got{" "}
      <span className="auto_submit_span">{score}</span> marks!!!
      <br />
      <Link to="/dashboard">Back to dashboard</Link>
    </div>
  );
}
