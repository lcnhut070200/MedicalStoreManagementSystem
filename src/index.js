import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomeComponent from "./pages/HomeComponent";
import CompanyComponent from "./pages/CompanyComponent";
import { PrivateRouteNew } from "./utils/PrivateRouteNew";
import Config from "./utils/Config";
import LogoutComponent from "./pages/LogoutComponent";

ReactDom.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Login}></Route>
      <Route
        exact
        path={Config.logoutPageUrl}
        component={LogoutComponent}
      ></Route>
      <PrivateRouteNew
        exact
        path="/home"
        activepage="0"
        page={<HomeComponent />}
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/company"
        activepage="1"
        page={<CompanyComponent />}
      ></PrivateRouteNew>
    </Switch>
  </Router>,
  document.getElementById("root")
);
