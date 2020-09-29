import React from "react";
import { Navbar, Nav } from "react-bootstrap";
const NavbarComponent = () => {
  return (
    <>
      <Navbar variant="dark" className="navCustom  fixed-top" expand="lg">
        <Navbar.Brand href="/" style={{ marginLeft: "1rem " }}>
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
              // href="http://localhost:5000/api/auth/login"
            >
              SIGN IN
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="view zoom signin-desktop-view">
          <a
            href={`${process.env.REACT_APP_BASE_URL}/api/auth/login`}
            // href="http://localhost:5000/api/auth/login"
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
