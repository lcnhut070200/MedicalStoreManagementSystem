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
}
export default AuthHandler;
