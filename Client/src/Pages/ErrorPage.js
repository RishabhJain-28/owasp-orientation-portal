import React from "react";
import { Redirect } from "react-router-dom";
import queryString from "query-string";
const ErrorPage = ({ match, location }) => {
  return (
    <>
      {alert(`ERROR:${queryString.parse(location.search).msg}`)}
      <Redirect to="/" />
    </>
  );
};

export default ErrorPage;
