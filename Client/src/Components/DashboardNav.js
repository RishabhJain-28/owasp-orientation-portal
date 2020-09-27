import React from "react";
import { Link } from "react-router-dom";
const DashboardNav = ({ user: { username, profilePicLink } }) => {
  return (
    <>
      <div className="side-menu" data-aos="fade-right" data-aos-duration="3000">
        <div className="logo">
          <a className="navbar-brand" href="/IMAGES\owasp_logo-13.png">
            <img alt="LOGO" src="/IMAGES/owasp_logo-13.png" />
          </a>
        </div>

        <div className="profile">
          <div className="avatar" style={{ alignContent: "center" }}>
            <img alt="profilePic" src={profilePicLink} />
          </div>
          <br />
          <h2 className="username">{username}</h2>
        </div>

        <ul className="left-nav">
          <li>
            {/* <a className="nav-item active" id="dashboard"> */}
            <Link className=" li-234 " to="/dashboard">
              <i className="fa fa-dashboard"></i>
              <span>DASHBOARD</span>
            </Link>
            {/* </a> */}
          </li>
          {/* <li>
            <Link class=" li-234" to="/dashboard/profile">
              <i className="fa fa-user-circle"></i>
              <span>YOUR PROFILE</span>
            </Link>
          </li> */}
          <li>
            {/* <Link class=" li-234" to="/dashboard/announcement"> */}
            <Link to="/dashboard/announcement">
              <i className="fa fa-calendar-minus-o"></i>
              <span>ANNOUNCEMENTS</span>
            </Link>
          </li>
          {/* <li>
            <a className="nav-item" id="leaderboard">
              <i className="fa fa-line-chart"></i>
              <span>LEADERBOAD</span>
            </a>
          </li> */}
          <li>
            {/* <a className="nav-item" id="about us"> */}
            <Link to="/dashboard/aboutus">
              <i className="fa fa-group"></i>
              <span>ABOUT US</span>
            </Link>
            {/* </a> */}
          </li>
          <li>
            <Link to="/contactus">
              <i className="fa fa-envelope-open"></i>
              <span>CONTACT US</span>
            </Link>
          </li>
          <li>
            <a
              href={`${process.env.REACT_APP_BASE_URL}/api/auth/logout`}
              className="side-signout "
              role="button"
              aria-pressed="true"
            >
              <i className="fa fa-power-off"></i>
              <span>SIGN OUT</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashboardNav;
