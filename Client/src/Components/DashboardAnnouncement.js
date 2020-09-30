import React from "react";
import { Helmet } from "react-helmet";
const DashboardAnnouncments = () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/css/announcement.css" />
      </Helmet>
      <div
        className="container row"
        data-aos="fade-right"
        data-aos-duration="3000"
      >
        <div className="col-md-12 col-sm-12 col-12">
          <div className="announcement">
            <h1>
              <span>ANNOUN</span>
              <span className="cements">CEMENTS</span>
            </h1>
          </div>
          <div className="container">
            <div className="jumbotron">
              <p>
                <strong>Dated : 30th September,2020</strong><br></br>
                The Schedule for the Recruitment of <strong>first</strong> year is as follows: 
                <ul>
                  <li>October 1, 2020 - Aptitude and Coding Quiz (Round 1)</li>
                  <li>October 3, 2020 - Department preference forms will be out!</li>
                  <li>October 5 - October 7, 2020 - Personal Interviews</li>
                </ul>
                The Schedule for the Recruitment of <strong>second</strong> year is as follows:
                <ul>
                  <li>October 1, 2020 - Recruitment forms will be out!</li>
                  <li>October 5 - October 7, 2020 - Personal Interviews</li>
                </ul>
              </p>
            </div>
          </div>
          <br></br>
          <div className="container">
            <div className="jumbotron">
              <p>
                <strong>Dated : 28th September,2020</strong><br></br>
                Navigate to the Dashboard section for Orientation links.
                Orientation will commence at 5:30pm on 29th September,2020.
                Stick till the end know about the recruitment process!!!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAnnouncments;
