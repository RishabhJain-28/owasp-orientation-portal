import React from "react";
import DashboardCard from "./DashboardCard";

const DashboardContent = ({ quizzes, name }) => {
  function getLink(routeName) {
    if (quizzes.length) {
      const quiz = quizzes.filter((quiz) => quiz.name === routeName)[0];
      if (quiz) return `/${routeName}/${quiz._id}`;
    }
    return "/dashboard";
  }
  return (
    <>
      <div
        className="container row"
        data-aos="fade-right"
        data-aos-duration="3000"
      >
        <div className="col-md-12 col-sm-12 col-12">
          <div className="dashboard">
            <h1>
              <span className="dash">DASH</span>
              <span className="board">BOARD</span>
            </h1>
          </div>
          <div className="container">
            <div className="jumbotron">
              <p>
                Hey {name},Thank you for registering! We welcome you to the
                Owasp student chapter portal! Orientation will commence at
                5:30pm on 29th September,2020. Find the Youtube link down below.
                Stand a chance to win a direct spot in personal interviews by
                taking part in the quiz. Stay tuned!
              </p>
            </div>
            <div className="row">
              <div className="flex-container">
                <DashboardCard
                  iconClass="fa fa-video-camera"
                  heading="Orientation link"
                  title="Orientation on Youtube"
                  desc="Youtube live will be streamed at 5:30pm. Please be on time."
                  link="http://bit.ly/OWASPorientation"
                />
                <DashboardCard
                  iconClass="fa fa-indent"
                  heading="Fun Quiz link"
                  title="Fun Quiz"
                  desc="Fun quiz will be soon. You have 15 seconds for each question. All the best!"
                  link={getLink("funquiz")}
                />
                <DashboardCard
                  iconClass="fa fa-file-text"
                  heading="Coding quiz link"
                  title="Coding quiz"
                  desc="Coding quiz will be live for only 15 minutes. All the best! "
                  link={getLink("codingquiz")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
