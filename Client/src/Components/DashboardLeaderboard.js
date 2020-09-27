import React from "react";
import { Helmet } from "react-helmet";

const Leaderboard = () => {
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
          <div class="container data">
            <div class="jumbotron notice">
              <p>No leaderboard to show as of now!</p>
            </div>

            <div class="row showboard">
              <div class="col-12 align-content-start">
                <div class=" jumbotron 1" id="top10"></div>
              </div>
              <div class="col-12 align-content-start">
                <div class=" jumbotron 2" id="top10"></div>
              </div>
              <div class="col-12 align-content-start">
                <div class=" jumbotron 3" id="top10"></div>
              </div>
              <div class="col-12 align-content-start">
                <div class=" jumbotron 4" id="top10"></div>
              </div>
              <div class="col-12 align-content-start">
                <div class=" jumbotron 5" id="top10"></div>
              </div>
              <div class="col-12 align-content-start">
                <div class=" jumbotron 6" id="top10"></div>
              </div>
              <div class="col-12 align-content-start">
                <div class=" jumbotron 7" id="top10"></div>
              </div>
              <div class="col-12 align-content-start">
                <div class=" jumbotron 8" id="top10"></div>
              </div>
              <div class="col-12 align-content-start">
                <div class=" jumbotron 9" id="top10"></div>
              </div>
              <div class="col-12 align-content-start">
                <div class=" jumbotron 10" id="top10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
