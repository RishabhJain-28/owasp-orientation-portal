import React from "react";
import RegistrationForm from "./RegistrationForm";
import Counter from "./Counter";
const RegistrationPageResponsive = () => {
  console.log("");
  return (
    <>
      <section className="phone-form-section">
        <div className="container">
          <div className="row phone">
            <div className="col-sm-12">
              <div className="orientation-info-phone">
                <div className="info-content-phone">
                  <h1 data-aos="flip-up" data-aos-once data-aos-duration="2000">
                    FUN
                  </h1>
                  <h1
                    className="code-phone"
                    data-aos="flip-up"
                    data-aos-duration="1000"
                    data-aos-once
                  >
                    CODE
                  </h1>
                  <h1 data-aos="flip-up" data-aos-once data-aos-duration="3000">
                    LEARN
                  </h1>
                  {/* <div className="countdown-phone">
                    Countdown to Orientation:
                  </div>
                  <Counter /> */}
                </div>
              </div>
            </div>
          </div>
          <div style={{ minWidth: "50%" }}>
            <div>
              {/* <div data-aos="fade-in" data-aos-duration="1000"> */}
              <div className="contact-phone">
                {/* <!-- ---------heading blue phone-------- --> */}
                <div className="row phone">
                  <div className="col-sm-12 form-body" id="head-phone">
                    <div className=" centered heading-form-phone">
                      REGISTRATION FOR RECRUITMENT
                    </div>
                  </div>
                </div>

                {/* <!-- ---------white form phone--------- --> */}
                <div className="row phone">
                  <div className="col-sm-12 form-body">
                    <RegistrationForm
                      buttonText="G Sign-up"
                      style={{ margin: "2rem 2.5rem " }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegistrationPageResponsive;
