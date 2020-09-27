import React from "react";
import { Link } from "react-router-dom";
const DashboardNav = ({ user: { username, profilePicLink }, location }) => {
  function isActive(currentPath) {
    const pathname = location.pathname.split("/");
    return pathname[pathname.length - 1] === currentPath;
  }
  return (
    <>
      <div className="side-menu" data-aos="fade-right" data-aos-duration="3000">
        <div className="logo">
          <a className="navbar-brand" href="/dashboard">
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
            <Link className=" li-234" to="/dashboard">
              <i
                className={
                  isActive("dashboard")
                    ? "fa fa-dashboard active-red"
                    : "fa fa-dashboard "
                }
              ></i>
              <span>DASHBOARD</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/announcement">
              <i
                className={
                  isActive("announcement")
                    ? "fa fa-calendar-minus-o active-blue"
                    : "fa fa-calendar-minus-o"
                }
              ></i>
              <span>ANNOUNCEMENTS</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/aboutus">
              <i
                className={
                  isActive("aboutus") ? "fa fa-group active-red" : "fa fa-group"
                }
              ></i>
              <span>ABOUT US</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/leaderboard">
              <i
                className={
                  isActive("leaderboard")
                    ? "fa fa-line-chart active-blue"
                    : "fa fa-line-chart"
                }
              ></i>
              <span>LEADERBOARD</span>
            </Link>
          </li>
          {/* <li>
            <Link to="/contactus">
              <i className="fa fa-envelope-open"></i>
              <span>CONTACT US</span>
            </Link>
          </li> */}
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
