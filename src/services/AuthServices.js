import axios from "axios";

const loginService = (email, password) => {
  return axios.post("api/auth/login", {
    email: email,
    password: password,
  });
};
const signUpService = (signUpData) => {
  return axios.post("/api/auth/signup", {
    ...signUpData,
  });
};

export { loginService, signUpService };
