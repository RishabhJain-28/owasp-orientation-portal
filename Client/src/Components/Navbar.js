import React from "react";
import { Navbar, Nav } from "react-bootstrap";
const NavbarComponent = () => {
  //! fix logo a tag
  return (
    <>
      <Navbar variant="dark" className="navCustom  fixed-top" expand="lg">
        <Navbar.Brand href="#home" style={{ marginLeft: "1 rem" }}>
          <img className="logo" alt="LOGO" src="IMAGES/owasp_logo-13.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ml-auto navbar-collapse justify-content-center"
            id="navbarResponsive"
          >
            {/* <Nav.Link style={{ color: "white" }} href="#home">
              DASHBOARD
            </Nav.Link> */}
            {/* <Nav.Link href="#home">ANNOUNCEMENTS</Nav.Link> */}
            {/* <Nav.Link href="/dashboard/">LEADERBOARD</Nav.Link> */}
            {/* <Nav.Link href="/dashboard/aboutus">ABOUT US</Nav.Link>
            <Nav.Link href="/dashboard/contactus">CONTACT US</Nav.Link> */}
            <Nav.Link
              className="responsive-view"
              href={`${process.env.REACT_APP_BASE_URL}/api/auth/login`}
            >
              SIGNIN
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="view zoom signin-desktop-view">
          <a
            // onClick={(e) => {
            //   e.preventDefault();
            //   // * Signin()
            // }}
            href={`${process.env.REACT_APP_BASE_URL}/api/auth/login`}
            className="btn active signin"
            role="button"
            aria-pressed="true"
          >
            <span>SIGN IN</span>
          </a>
        </div>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
