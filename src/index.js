import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomeComponent from "./pages/HomeComponent";
import CompanyComponent from "./pages/CompanyComponent";
import { PrivateRouteNew } from "./utils/PrivateRouteNew";
import Config from "./utils/Config";
import LogoutComponent from "./pages/LogoutComponent";
import CompanyDetailsComponent from "./pages/CompanyDetailsComponent";
import CompanyAddBankComponent from "./pages/CompanyAddBankComponent";
import CompanyEditBankComponent from "./pages/CompanyEditBankComponent";
import MedicineAddComponent from "./pages/MedicineAddComponent";

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
        page={HomeComponent}
      ></PrivateRouteNew>

      {/* Company */}
      <PrivateRouteNew
        exact
        path="/company"
        activepage="1"
        page={CompanyComponent}
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/companydetails/:id"
        activepage="1"
        page={CompanyDetailsComponent}
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/addCompanyBank/:id"
        activepage="1"
        page={CompanyAddBankComponent}
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/editCompanyBank/:company_id/:id"
        activepage="1"
        page={CompanyEditBankComponent}
      ></PrivateRouteNew>

      {/* Medicine */}
      <PrivateRouteNew
        exact
        path="/addMedicine"
        activepage="2"
        page={MedicineAddComponent}
      ></PrivateRouteNew>
    </Switch>
  </Router>,
  document.getElementById("root")
);
