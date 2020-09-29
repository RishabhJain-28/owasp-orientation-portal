import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
const Leaderboard = ({ user }) => {
  const [max] = useState(150);
  const [leaderboard, setLeaderboard] = useState([]);
  const [self, setSelf] = useState({});
  const [show, setShow] = useState(false);
  useEffect(() => {
    async function getLeaderboard() {
      try {
        const { data } = await axios.get("/quiz/leaderboard");
        setLeaderboard(data.leaderboard);
        setSelf(data.self);
        setShow(true);
      } catch (err) {
        console.log("err in catch", err);
        setShow(false);
      }
    }

    getLeaderboard();
  }, []);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/css/leader.css" />
      </Helmet>

      <div class="container row" data-aos="fade-right" data-aos-duration="3000">
        <div class="col-md-12 col-sm-12 ">
          <div class="leaderboard">
            <h1>
              <span class="leader">LEADER</span>
              <span class="board">BOARD</span>
            </h1>
          </div>
          {show ? (
            <>
              <div class="container data">
                <div class="jumbotron notice">
                  <p>No leaderboard to show as of now!</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <ProgressBar
                  className="mb-3"
                  animated
                  now={self.score}
                  min={0}
                  max={max}
                />
              </div>
              <div>
                {leaderboard.map((l) => (
                  <div>
                    <ProgressBar
                      key={l._id}
                      className={l._id === self._id ? "highlight mb-3" : "mb-3"}
                      animated
                      now={l.score}
                      min={0}
                      max={max}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* </div> */}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Leaderboard;
