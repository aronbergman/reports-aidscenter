import axios from "axios";
import baseUrl from "./../baseurl";

const host = baseUrl()
const API_URL = `${host}/api/auth/`;

class AuthService {
  // login(email, password) {
  //   return axios
  //     .post(API_URL + "signin", {
  //       email,
  //       password
  //     })
  //     .then(response => {
  //       if (response.data.accessToken) {
  //         localStorage.setItem("user", JSON.stringify(response.data));
  //       }
  //
  //       return response.data;
  //     });
  // }

  logout() {
    localStorage.removeItem("user");
  }

  register(values) {
    return axios.post(API_URL + "signup", {
      username: values.username,
      appointment: values.appointment,
      password: values.password,
      city: values.city
    });
  }

  changePassword(values) {
    return axios.post(API_URL + "change-password", {
      username: values.username,
      password: values.password,
    });
  }

  changeCity(values) {
    return axios.post(API_URL + "change-city", {
      username: values.username,
      city: values.city,
    });
  }

  changeRole(values) {
    return axios.post(API_URL + "change-role", {
      userId: values.userId,
      roleId: values.roleId,
    });
  }

  changeSubdivisions(values) {
    return axios.post(API_URL + "change-subdivision", {
      userId: values.userId,
      subdivisionsId: values.subdivisionsId,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
