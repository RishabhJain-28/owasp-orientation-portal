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
                Owasp student chapter portal! <br></br>
                <strong>In order to be irreplaceable, one must always be different.</strong><br></br>
                The world today requires multi-tasking and multi-skilled engineers who can write the most efficient code at one time and pitch the 
                business ideas on the other. OWASP Student Chapter TIET, an elite coding club, that prepares you for the Tech world and simultaneously 
                equips you with Non-Tech skills, is officially going to start the recruitments for First Year and Second Year from OCTOBER 1, 2020.
                <br></br>
                For 1st year candidates : On 1st October, quiz will be held in two slots i.e at <strong>5:30pm</strong> and <strong>7:30pm</strong>. You can choose any <strong>one</strong> slot.
                <br></br>
                For 2nd year candidates : On 1st October, Recruitment form will be live at <strong>5:30pm</strong>.
              </p>
            </div>
            <div className="row">
              <div className="flex-container">
                {/* <div className="flex-item">
                  <div className="flex-item-inner">
                    <div className="card-front">
                      <i
                        className={`${"fa fa-video-camera"} fa-3x tile-icon icon-white`}
                      ></i>

                      <h3>Recruitment link</h3>
                    </div>
                    <a href={"http://bit.ly/OWASPorientation"}>
                    <div className="card-back bg-dark">
                      <p className="title">{title}</p>
                      <p className="desc">Will be live soon.</p>
                      <p className="link">
                        <i className="fa fa-chevron-circle-right"></i>
                      </p>
                    </div>
                    </a>
                  </div> */}
                {/* </div> */}
                {/* <DashboardCard
                  iconClass="fa fa-video-camera"
                  heading="Orientation link"
                  title="Orientation on Youtube"
                  desc="Youtube live will be streamed at 5:30pm. Please be on time."
                  link="http://bit.ly/OWASPorientation"
                /> */}
                <DashboardCard
                  iconClass="fa fa-indent"
                  heading="Recruitment quiz for first year"
                  title="Only for first year students"
                  desc="Slot 1 : Quiz will be live at 5:30pm"
                  link={getLink("funquiz")}
                />
                <DashboardCard
                  iconClass="fa fa-file-text"
                  heading="Recruitment form for 2nd year"
                  title="Only for Second year students"
                  desc="Form link will be live at 5:30pm"
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
