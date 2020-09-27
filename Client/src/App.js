import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import CompleteRegistration from "./Pages/CompleteRegistration";
// import ContactUs from "./Pages/ContactUs";
import FunQuiz from "./Pages/FunQuiz";
import CodingQuiz from "./Pages/CodingQuiz";
import ErrorPage from "./Pages/ErrorPage";

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
          <Route exact path="/funquiz" component={FunQuiz} />
          <Route exact path="/codingquiz" component={CodingQuiz} />
          <Route exact path="/" component={CompleteRegistration} />

          {/* <Redirect to="/" /> */}
        </Switch>
      </Router>
    </React.Fragment>
  );
}
export default App;
