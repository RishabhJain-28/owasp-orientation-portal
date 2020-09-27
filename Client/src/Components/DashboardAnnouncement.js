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
                Navigate to the Dashboard section for Orientation links.
                Orientation will commence at hh:mm pm on dd/mm/yyyy. Fun quiz
                shall start at hh:mm pm and Coding/Apti quiz shall commence at
                hh:mm pm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAnnouncments;
