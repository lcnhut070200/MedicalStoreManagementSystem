import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainComponent from "./components/MainComponent";

ReactDom.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Login}></Route>
      <Route exact path="/home" component={MainComponent}></Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
