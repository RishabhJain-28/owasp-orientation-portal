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
                Owasp student chapter portal! Recruitments will commence soon .
                Stay tuned!
              </p>
            </div>
            <div className="row">
              <div className="flex-container">
                <div className="flex-item">
                  <div className="flex-item-inner">
                    <div className="card-front">
                      <i
                        className={`${"fa fa-video-camera"} fa-3x tile-icon icon-white`}
                      ></i>

                      <h3>Recruitment link</h3>
                    </div>
                    {/* <a href={"http://bit.ly/OWASPorientation"}> */}
                    <div className="card-back bg-dark">
                      {/* <p className="title">{title}</p> */}
                      <p className="desc">Will be live soon.</p>
                      <p className="link">
                        <i className="fa fa-chevron-circle-right"></i>
                      </p>
                    </div>
                    {/* </a> */}
                  </div>
                </div>
                {/* <DashboardCard
                  iconClass="fa fa-video-camera"
                  heading="Orientation link"
                  title="Orientation on Youtube"
                  desc="Youtube live will be streamed at 5:30pm. Please be on time."
                  link="http://bit.ly/OWASPorientation"
                /> */}
                <DashboardCard
                  iconClass="fa fa-indent"
                  heading="Fun Quiz link"
                  title="Fun Quiz"
                  desc="Results will be out soon"
                  link={getLink("funquiz")}
                />
                <DashboardCard
                  iconClass="fa fa-file-text"
                  heading="Coding quiz link"
                  title="Coding quiz"
                  desc="Results will be out soon"
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
