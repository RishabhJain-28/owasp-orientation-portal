import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
const ContactUs = () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/css/contact.css" />
      </Helmet>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top ">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {" "}
            <span className="navbar-toggler-icon"></span>
          </button>
          <a
            className="navbar-brand"
            href="../REGISTRATION/IMAGES/owasp_logo-13.png"
          >
            <img className="logo" alt="LOGO" src="IMAGES/owasp_logo-13.png" />
          </a>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto stroke">
              <li className="nav-item ">
                {/* <a className=" dashboard" href="../REGISTRATION/REGISTRATION.html"> */}
                <Link className=" dashboard" to="/">
                  REGISTRATION
                </Link>
                {/* </a> */}
              </li>
              <li className="nav-item">
                <Link className=" li-234" to="/dashboard/">
                  DASHBOARD
                </Link>
                {/* </a> */}
              </li>
              <li className="nav-item">
                <Link className=" li-234" to="/dashboard/announcement">
                  ANNOUNCEMENTS
                </Link>
              </li>
              <li className="nav-item li-234">
                <Link to="/dashboard/aboutus">ABOUT US</Link>
              </li>
            </ul>
          </div>

          <div className="view zoom">
            <a
              href={`${process.env.REACT_APP_BASE_URL}/api/auth/login`}
              className="btn active signin"
              role="button"
              aria-pressed="true"
            >
              <span>SIGN IN</span>
            </a>
          </div>
        </nav>
      </header>
      <div className="container contact-form ">
        <div className="contact-image">
          <img
            src="https://static.thenounproject.com/png/345781-200.png"
            alt="rocket_contact"
          />
        </div>
        <form method="post">
          <h3>Drop Us a Message</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  name="txtName"
                  className="form-control"
                  placeholder="Your Name *"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="txtEmail"
                  className="form-control"
                  placeholder="Your Email *"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="txtPhone"
                  className="form-control"
                  placeholder="Your Phone Number *"
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  name="btnSubmit"
                  className="btnContact"
                  value="Send Message"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <textarea
                  name="txtMsg"
                  className="form-control"
                  placeholder="Your Message *"
                  style={{ width: "100%", height: "150px" }}
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
