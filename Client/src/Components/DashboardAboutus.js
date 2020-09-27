import React from "react";
import { Helmet } from "react-helmet";
const DashboardAboutUs = () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/css/aboutus.css" />
      </Helmet>
      <div
        className="container row"
        data-aos="fade-right"
        data-aos-duration="3000"
      >
        <div className="col-md-12 col-sm-12 col-12">
          <div className="aboutus">
            <h1>
              <span className="about">ABOUT US</span>
            </h1>
          </div>
          <div className="container">
            <div className="jumbotron">
              <p>
                The Open Web Application Security Project(OWASP) Student Chapter
                is an elite technical society of the Thapar Institute of
                Engineering and Technology, Patiala. With an experience of over
                5 years, we aim to spread our mission of collective learning to
                every nook and corner. By successfully organizing many
                Hackathons, Tech talks, Workshops, and Coding nights, we have
                always strived hard to maintain the coding culture throughout
                the campus. The inception of the last session was with
                “Techniti” which helped in spreading huge technical awareness
                among the freshers. This was followed by our main event,
                HACKOWASP 2.0, which focused on bringing out innovation in
                collaboration with various startups and organizations. About 400
                young minds from 20+ different colleges all over India
                participated in the event. In the last session we have also
                achieved great heights in the non-tech skills of our members.
                So, in addition to advancing the technical skills, we also focus
                on spreading apt knowledge of fields like marketing, finance,
                designing, content writing, etc. Our vision is to bring out the
                best of every individual. We capture young minds and introduce
                them to various fields. So, we are proposing both technical and
                non-tech workshops. This will help students to decide what they
                want to do and also give a clear picture of what actually
                interests them.
              </p>
            </div>
            <div className="gallery-image">
              <div className="img-box">
                <img src="/IMAGES/pics/3.jpeg" alt="" />
              </div>
              <div className="img-box">
                <img
                  src="/IMAGES/pics/WhatsApp Image 2020-06-01 at 5.21.28 AM.jpeg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAboutUs;
