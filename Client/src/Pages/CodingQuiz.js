import React, { useState, useEffect } from "react";
import Question from "../Components/QuestionCard";
import { ButtonGroup, ProgressBar } from "react-bootstrap";
import axios from "../util/axios";
import "../Components/quiz.css";

const CodingQuiz = ({ questions, user, submit: [submit, setSubmit] }) => {
  const [maxTime] = useState(2 * 60);
  const [time, setTime] = useState(0);
  const [timerID, setTimerID] = useState("");
  // const [q_index, setQ_index] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    // console.log(questions);
    // alert(JSON.stringify(questions));
    let time = localStorage.getItem("session#hash%20tc"); //!time
    // let index = localStorage.getItem("session_$index%c"); //!q_index
    // if (!index) {
    //   localStorage.setItem("session_$index%c", String.fromCharCode(0 * 2 + 6));
    //   index = String.fromCharCode(0 * 2 + 6);
    // }
    if (!time) {
      localStorage.setItem("session#hash%20tc", String.fromCharCode(0));
      time = String.fromCharCode(0);
    }
    // let decodedIndex = (index.charCodeAt(0) - 6) / 2;
    let decodedTime = time.charCodeAt(0);
    // if (decodedIndex === questions.length) {
    //   localStorage.setItem("session#hash%20tc", String.fromCharCode(0));
    //   localStorage.setItem("session_$index%c", String.fromCharCode(6 * 2 + 6));
    //   return setSubmit(true);
    // }
    if (maxTime < decodedTime) {
      localStorage.setItem("session#hash%20tc", String.fromCharCode(0));
      decodedTime = 0;
      // decodedIndex++;
      return;
      // if (decodedIndex >= questions.length) return submitQuiz();
      // localStorage.setItem(
      //   "session_$index%c",
      //   String.fromCharCode(decodedIndex * 2 + 6)
      // );
    }
    setTime(time ? decodedTime : 0);
    // setQ_index(index ? decodedIndex : 0);
  }, []);

  useEffect(() => {
    if (submit) return;
    setTimerID(
      setTimeout(() => {
        let t = time;
        if (t === maxTime) {
          // if (q_index + 1 >= questions.length)
          submitQuiz();
          // else nextQuestion();
        } else {
          t++;
          localStorage.setItem("session#hash%20tc", String.fromCharCode(t));
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
    localStorage.setItem("session#hash%20tc", String.fromCharCode(0));
    // localStorage.setItem("session_$index%c", String.fromCharCode(6 * 2 + 6));
    setSubmit(true);
  }
  // function nextQuestion() {
  //   let i = q_index;
  //   i++;
  //   localStorage.setItem("session_$indexc%", String.fromCharCode(i * 2 + 6));
  //   localStorage.setItem("session#hash%20tc", String.fromCharCode(0));
  //   setTime(0);
  //   setQ_index(i);
  // }
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
            CODING <span>QUIZ</span>
          </h1>
        </div>
        {!submit ? (
          <>
            <ProgressBar
              className="mb-3"
              animated
              now={time}
              min={0}
              max={maxTime}
            />
            {questions.map((question, i) => (
              <div key={question._id} className="mb-2 question">
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
    </div>
  );
}
