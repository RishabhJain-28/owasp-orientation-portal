import React from "react";
import { Helmet } from "react-helmet";

import NavbarComponent from "../Components/Navbar";
import RegistrationPage from "../Components/RegistrationPage";
import RegistrationPageResponsive from "../Components/RegistrationPageResponsive";

const CompleteRegistration = () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/css/register.css" />
      </Helmet>
      <NavbarComponent />
      <RegistrationPage />
      <RegistrationPageResponsive />
    </>
  );
};

export default CompleteRegistration;
