import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import CompleteRegistration from "./Pages/CompleteRegistration";
// import ContactUs from "./Pages/ContactUs";
import FunQuizStartPage from "./Pages/FunQuizStartPage";
import CodingQuizStartPage from "./Pages/CodingQuizStartPage";
import ErrorPage from "./Pages/ErrorPage";
import { hash, dehash } from "./util/encrypt";
function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/error" component={ErrorPage} />
          <Route path="/dashboard" component={Dashboard} />
          {/* <Route exact path="/contactus" component={ContactUs} /> */}
          {/* <Route path="/funquiz/:id" component={FunQuizStartPage} /> */}
          <Route
            exact
            render={(props) => {
              let time = localStorage.getItem("session#hash%20t");
              // if (!time) {
              //   localStorage.setItem("session#hash%20t", hash(0));
              //   time = hash(0);
              // }
              if (time) {
                const decodedTime = dehash(time);
                // localStorage.setItem("session#hash%20t", hash(0));
                // time = hash(0);

                console.log("before route", decodedTime);
                console.log("performance", PerformanceNavigation.TYPE_RELOAD);
                if (
                  decodedTime !== -1 &&
                  PerformanceNavigation.TYPE_RELOAD === 1
                ) {
                  console.log("in condition", decodedTime);
                  localStorage.setItem(
                    "session#hash%20t",
                    hash(decodedTime + 1)
                  );
                }
              }
              return <FunQuizStartPage {...props} />;
            }}
            path="/funquiz/:id"
          />
          <Route
            exact
            render={(props) => {
              let time = localStorage.getItem("session#hash%20t2");
              // if (!time) {
              //   localStorage.setItem("session#hash%20t", hash(0));
              //   time = hash(0);
              // }
              if (time) {
                const decodedTime = dehash(time);
                // localStorage.setItem("session#hash%20t", hash(0));
                // time = hash(0);

                console.log("before route", decodedTime);
                console.log("performance", PerformanceNavigation.TYPE_RELOAD);
                if (
                  decodedTime !== -1 &&
                  PerformanceNavigation.TYPE_RELOAD === 1
                ) {
                  console.log("in condition", decodedTime);
                  localStorage.setItem(
                    "session#hash%20t2",
                    hash(decodedTime + 1)
                  );
                }
              }
              return <CodingQuizStartPage {...props} />;
            }}
            path="/codingquiz/:id"
          />

          {/* <Route path="/funquiz2" component={CodingQuiz} /> */}
          <Route exact path="/" component={CompleteRegistration} />

          {/* <Redirect to="/" /> */}
        </Switch>
      </Router>
    </React.Fragment>
  );
}
export default App;
