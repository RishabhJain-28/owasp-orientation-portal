import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ user, component: Component, ...rest }) => {
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user._id ? <Component {...props} user={user} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;
