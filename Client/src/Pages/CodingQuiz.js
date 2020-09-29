import React, { useState, useEffect } from "react";
import Question from "../Components/QuestionCard";
import { ButtonGroup, ProgressBar } from "react-bootstrap";
import axios from "../util/axios";
import { Link } from "react-router-dom";
import "../Components/quiz.css";
import { hash, dehash } from "../util/encrypt";
const CodingQuiz = ({ user, questions, submit: [submit, setSubmit] }) => {
  const [maxTime] = useState(15 * 60);
  const [time, setTime] = useState();
  const [timerID, setTimerID] = useState("");
  // const [q_index, setQ_index] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  // function hash(i) {
  //   return i + 100;
  //   // return String.fromCharCode(i + 100);
  // }
  // function dehash(code) {
  //   return code - 100;
  //   // return code.charCodeAt(0) - 100;
  // }
  useEffect(() => {
    let score = localStorage.getItem("score2");
    console.log(score);
    // console.log("questions", questions);
    let time = localStorage.getItem("session#hash%20t2"); //!time
    let ans = localStorage.getItem("session#ans2"); //!time
    if (ans) setAnswers(JSON.parse(ans));
    if (score) setScore(score);
    // console.log("a", time);
    if (!time) {
      localStorage.setItem("session#hash%20t2", hash(0));
      console.log("setting time 0");
      time = hash(0);
      setTime(0);
    }
    // console.log("b", time);

    let decodedTime = dehash(time);
    // console.log("c-decoded", decodedTime);
    if (decodedTime === -1) {
      // console.log("-1", decodedTime);
      // setQ_index(6);
      // alert("sdsadasdad");
      setSubmit(true);
      return;
    }

    if (decodedTime >= maxTime * questions.length) {
      // console.log("d-lock", time);
      localStorage.setItem("session#hash%20t2", hash(-1));
      return submitQuiz();
    }
    setTime(decodedTime);
    // console.log("e-state-time", decodedTime);
    // setQ_index(Math.floor(decodedTime / maxTime));
  }, []);

  useEffect(() => {
    if (submit) return;
    // console.log("time in effect ", time);
    if (isNaN(Number(time))) return;
    setTimerID(
      setTimeout(() => {
        // console.log("time in timeout ", time);
        let t = time;
        if (t === -1) return;
        if (t >= maxTime * questions.length) {
          submitQuiz();
          //  nextQuestion();
        } else {
          t++;
          localStorage.setItem("session#hash%20t2", hash(t));
          setTime(t);
          // console.log(t);
          // setQ_index(Math.floor(t / maxTime));
        }
      }, 1000)
    );
    clearTimeout(timerID);
  }, [time]);

  async function submitQuiz() {
    console.log("QUIZ SUBMIITED");
    if (submitted) throw new Error();
    try {
      const { data, status } = await axios.post("/questionBank/submit", {
        responses: answers,
      });
      console.log(data);
      if (status == 200) {
        setSubmitted(true);
        alert("QUIZ SUBMIITED");
      }
      localStorage.setItem("score2", data.score);
      setScore(data.score);
    } catch (err) {
      alert("can not resubmit ");
    }
    clearTimeout(timerID);
    setTime(-1);
    // console.log("hash shoulld ve -1", hash(-1));
    localStorage.setItem("session#hash%20t2", hash(-1));
    // localStorage.setItem("session_$index%", String.fromCharCode(6 * 2 + 6));
    setSubmit(true);
  }
  // function nextQuestion() {
  //   let t = time;
  //   t = (q_index + 1) * maxTime;
  //   // localStorage.setItem("session_$index%", String.fromCharCode(i * 2 + 6));
  //   localStorage.setItem("session#hash%20t2", hash(t));
  //   setTime(t);
  //   setQ_index(Math.floor(t / maxTime));
  // }
  function markAns(e, id) {
    const ans = answers;
    ans[id] = e.target.value;
    console.log(ans);
    localStorage.setItem("session#ans2", JSON.stringify(ans));
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
            CODING <span>QUIZ</span>
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
            {/* {alert(q_index)} */}
            {questions.map((question, i) => (
              <div className="mb-2 question">
                <Question num={i + 1} markAns={markAns} question={question} />
              </div>
            ))}
            {/* {q_index < questions.length && (
                
              )} */}
            {maxTime * questions.length - time < 5 && (
              <div className="mb-2 question">
                <p>
                  Auto submitting in{" "}
                  <span className="auto_submit_span">
                    {maxTime * questions.length - time}
                  </span>{" "}
                  seconds...
                </p>
              </div>
            )}
            <div className="container">
              <div className="row justify-content-center">
                <ButtonGroup className="m-2 ml-4 mr-4">
                  <button className="btn pink_btn" onClick={() => submitQuiz()}>
                    Submit
                  </button>
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

export default CodingQuiz;

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
