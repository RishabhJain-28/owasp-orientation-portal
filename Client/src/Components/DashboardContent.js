import React from "react";
import DashboardCard from "./DashboardCard";
import { Helmet } from "react-helmet";

const DashboardContent = () => {
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellat, porro? Nisi, sunt soluta? Expedita esse facilis
                temporibus recusandae distinctio repudiandae reprehenderit
                dolorem praesentium error autem, ratione accusamus quos ad
                aspernatur!
              </p>
            </div>
            <div className="row">
              <div className="flex-container">
                <DashboardCard
                  iconClass="fa fa-video-camera"
                  heading="Orientation link"
                  title="Lorem ipsum dolor sit amet"
                  desc="Pellentesque magna nunc"
                  link="Details"
                />
                <DashboardCard
                  iconClass="fa fa-indent"
                  heading="Fun Quiz link"
                  title="Praesent varius mi sem"
                  desc="Cras posuere consequat nisl, ut rh"
                  link="Details"
                />
                <DashboardCard
                  iconClass="fa fa-file-text"
                  heading="Coding quiz link"
                  title="Vestibulum eget sem malesuada"
                  desc="Etiam imperdiet ullamcorpe"
                  link="Details"
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
