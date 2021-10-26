import axios from "axios";

import AuthHandler from "./AuthHandler";
import Config from "./Config";

class ApiHandler {
  async checkLogin() {
    if (AuthHandler.checkTokenExpiry()) {
      var response = await axios.post(Config.refreshApiUrl, {
        refresh: AuthHandler.getRefreshToken(),
      });
      console.log(response);
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
  }
}

export default ApiHandler;
