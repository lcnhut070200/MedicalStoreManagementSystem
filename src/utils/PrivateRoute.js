import React from "react";
import { Redirect, Route } from "react-router";
import AuthHandler from "./AuthHandler";

export var PrivateRoute = ({ component: Component, ...rest }) => {
  console.log("rest:", { ...rest });
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthHandler.loggedIn() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
