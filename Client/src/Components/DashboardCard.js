import React from "react";
import { Link } from "react-router-dom";
const DashboardCard = ({ iconClass, heading, title, desc, link }) => {
  return (
    <div className="flex-item">
      <div className="flex-item-inner">
        <div className="card-front">
          <i className={`${iconClass} fa-3x tile-icon icon-white`}></i>

          <h3>{heading}</h3>
        </div>
        {/* <Link to={link}> */}
        <div className="card-back bg-dark">
          <p className="title">{title}</p>
          <p className="desc">{desc}</p>
          <p className="link">
            <i className="fa fa-chevron-circle-right"></i>
          </p>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default DashboardCard;
