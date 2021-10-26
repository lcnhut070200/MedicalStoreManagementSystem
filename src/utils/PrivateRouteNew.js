import React from "react";
import { Redirect, Route } from "react-router";
import AuthHandler from "./AuthHandler";
import MainComponent from "../components/MainComponent";

export var PrivateRouteNew = ({ page, activepage, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthHandler.loggedIn() ? (
          <MainComponent page={page} activepage={activepage} {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
