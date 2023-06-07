import { useState, useEffect } from "react";
import { useAuth } from "../../store/data/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login} = useAuth();
  const navigate = useNavigate();
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setform({ ...form, [name]: value });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (form.email && form.password) {
      login(form.email, form.password);
    } else {
    }
  };

  return (
    <div>
      <div class="form-container">
        <h1 class="text-center">LOGIN</h1>
        <form class="form">
          <label htmlFor="" class="input-label">
            Email address:
            <input
              type="email"
              placeholder="Enter your email here"
              class="input"
              value={form.email}
              name="email"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="" class="input-label">
            Password:
            <input
              type="password"
              placeholder="*************"
              class="input"
              value={form.password}
              name="password"
              onChange={handleChange}
            />
          </label>
          <button
            onClick={() =>
              setform((form) => ({
                ...form,
                email: "guestlogin@gmail.com",
                password: "Happyday1",
              }))
            }
            type="button"
            class="btn-link formBtn"
          >
            Guest Login
          </button>
          <button onClick={(e) => loginHandler(e)} class="btn-link formBtn">
            Login
          </button>
          <button
            type="button"
            class="btn-link formBtn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
