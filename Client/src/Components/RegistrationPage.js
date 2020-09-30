import React from "react";
// import "./register.css";
import RegistrationForm from "./RegistrationForm";
import Counter from "./Counter";
const RegistrationPage = () => {
  //  const [user, setUser] = useState({ name: "Rishabh", age: 19 });
  console.log("");
  return (
    <>
      <section className="pc-form-section">
        <div data-aos="fade-in" data-aos-duration="1000">
          <div className="contact">
            <div className="container">
              {/* 
                        <!-- ---------heading blue-------- --> */}
              <div className="row">
                <div className="col-md-12" id="head">
                  <div className=" centered heading-form">
                    <div className="align-center">
                      REGISTRATION FOR RECRUITMENT
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- ---------white form --------- --> */}
              <div className="row" style={{ minWidth: "50%" }}>
                {/* <!-- ---left part--- --> */}
                <div className="col-md-5">
                  <div className="orientation-info">
                    <div className="info-content">
                      <h1 data-aos="flip-up" data-aos-duration="2000">
                        FUN
                      </h1>
                      <h1
                        className="code"
                        data-aos="flip-up"
                        data-aos-duration="4000"
                      >
                        CODE
                      </h1>
                      <h1 data-aos="flip-up" data-aos-duration="3000">
                        LEARN
                      </h1>
                      {/* <div
                        className="countdown-phone"
                        style={{ color: "black" }}
                      >
                        Countdown to Orientation:
                      </div>
                      <Counter /> */}
                    </div>
                  </div>
                </div>

                {/* <!-- ---right part--- --> */}
                <div className="col-md-7">
                  <RegistrationForm
                    buttonText="G Sign-up with Google"
                    style={{ margin: "2rem 2.5rem " }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegistrationPage;
