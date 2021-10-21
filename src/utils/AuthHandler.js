import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import Config from "./Config";

class AuthHandler {
  static login(username, password, callback) {
    axios
      .post(Config.loginUrl, {
        username: username,
        password: password,
      })
      .then(function (res) {
        if (res.status === 200) {
          reactLocalStorage.set("token", res.data.access);
          reactLocalStorage.set("refresh", res.data.refresh);
          callback({ error: false, message: "Login Successfull..." });
        }
      })
      .catch(function (err) {
        callback({
          error: true,
          message: "Error During Login Invalid Details...",
        });
      });
  }

  static loggedIn() {
    if (reactLocalStorage.get("token") && reactLocalStorage.get("refresh")) {
      return true;
    } else {
      return false;
    }
  }

  static getLoginToken() {
    return reactLocalStorage.get("token");
  }

  static getRefreshToken() {
    return reactLocalStorage.get("refresh");
  }

  static logoutUser() {
    reactLocalStorage.remove("token");
    reactLocalStorage.remove("refresh");
  }

  static checkTokenExpiry() {
    var expire = false;
    var token = this.getLoginToken();
    var tokenArray = token.split(".");
    var jwt = JSON.parse(atob(tokenArray[1]));

    if (jwt && jwt.exp && Number.isFinite(jwt.exp)) {
      expire = jwt.exp * 1000;
    } else {
      expire = false;
    }

    if (!expire) {
      return false;
    }

    return Date.now() > expire;
  }
}
export default AuthHandler;
