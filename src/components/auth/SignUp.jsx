import { useState, useEffect } from "react";
import { useAuth } from "../../store/data/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { signup, token } = useAuth();
  const navigate = useNavigate();
  const [form, setform] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setform({ ...form, [name]: value });
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    if (form.firstName && form.lastName && form.email && form.password) {
      signup(form);
    }
    setform({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  if (token) {
    setTimeout(() => {
      navigate("/products");
    }, 2000);
  }

  return (
    <div>
      <div class="form-container">
        <h1 class="text-center">SIGNUP</h1>
        <form class="form">
          <label htmlFor="" class="input-label">
            First name:
            <input
              type="text"
              placeholder="First Name"
              class="input"
              value={form.firstName}
              name="firstName"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="" class="input-label">
            Last name:
            <input
              type="text"
              placeholder="Last Name"
              class="input"
              value={form.lastName}
              name="lastName"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="" class="input-label">
            Email Address:
            <input
              type="email"
              placeholder="Email"
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
              placeholder="Password"
              class="input"
              value={form.password}
              name="password"
              onChange={handleChange}
            />
          </label>
          <label for="" class="input-label-row">
            <input type="checkbox" class="checkbox-input" />
            <span class="inputs-title">I accept all Terms & Conditions</span>
          </label>
          <label htmlFor="" class="input-label text-center formBtn">
            <button
              type="submit"
              onClick={(e) => signUpHandler(e)}
              class="btn-link formBtn"
            >
              SIGN UP
            </button>
          </label>
          <label htmlFor="" class="input-label text-center formBtn">
            <button
              type="button"
              onClick={() => navigate("/login")}
              class="btn-link formBtn"
            >
              Already Have An Account?
            </button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
