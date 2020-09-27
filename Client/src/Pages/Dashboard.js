import React, { useState, useEffect } from "react";
import axios from "../util/axios";

import DashboardNav from "../Components/DashboardNav";
import DashboardContent from "../Components/DashboardContent";
// import DashboardProfile from "../Components/DashboardProfile";
import DashboardAnnouncement from "../Components/DashboardAnnouncement";
import Leaderboard from "../Components/DashboardLeaderboard";
import DashboardAboutus from "../Components/DashboardAboutus";

import { Helmet } from "react-helmet";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Dashboard = ({ location }) => {
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    async function getProfile() {
      try {
        const res = await axios.get("/participants/profile");

        setUser(res.data);
      } catch (error) {
        setRedirect(true);
      }
    }

    getProfile();
  }, []);

  if (redirect) return <Redirect to="/" />;
  return (
    <>
      <link rel="stylesheet " href="/css/dashboardnav.css" />
      <Helmet>
        <link rel="stylesheet" href="/css/dashboard.css" />
      </Helmet>

      <DashboardNav location={location} user={user} />
      <Switch>
        {/* <Route exact path="/dashboard/profile" component={DashboardProfile} /> */}
        <Route
          exact
          path="/dashboard/announcement"
          component={DashboardAnnouncement}
        />
        <Route exact path="/dashboard/leaderboard" component={Leaderboard} />
        <Route exact path="/dashboard/aboutus" component={DashboardAboutus} />
        <Route exact path="/dashboard/" component={DashboardContent} />
      </Switch>
    </>
  );
};

export default Dashboard;
