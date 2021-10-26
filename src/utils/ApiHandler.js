import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

import AuthHandler from "./AuthHandler";
import Config from "./Config";

class ApiHandler {
  async checkLogin() {
    if (AuthHandler.checkTokenExpiry()) {
      var response = await axios.post(Config.refreshApiUrl, {
        refresh: AuthHandler.getRefreshToken(),
      });
      reactLocalStorage.set("token", response.data.access);
    }
  }

  async saveCompanyData(
    name,
    license_no,
    address,
    contact_no,
    email,
    description
  ) {
    this.checkLogin();

    var response = await axios.post(
      Config.companyApiUrl,
      {
        name: name,
        license_no: license_no,
        address: address,
        contact_no: contact_no,
        email: email,
        description: description,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  }
}

export default ApiHandler;
