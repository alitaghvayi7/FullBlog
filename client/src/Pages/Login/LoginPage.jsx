import "./loginPage.css";
import Layout from "../../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useUserDispatch, useUserState } from "../../Context/AuthContext";

export default function LoginPage() {
  const [validEmail, setValidEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const loginPassword = useRef();
  const { isLoading, error } = useUserState();
  const dispatch = useUserDispatch();
  const history = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_REQUEST" });
    axios
      .post(`/auth/login`, {
        email: loginEmail,
        password: loginPassword.current.value,
      })
      .then((response) => {
        if (response.data === "User Not Found") {
          dispatch({ type: "LOGIN_FAILED" });
        } else {
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
          history("/");
        }
      });
  };

  useEffect(() => {
    axios.get(`/users?email=${loginEmail}`).then((response) => {
      if (response.data) {
        setInvalidEmail(false);
        setValidEmail(true);
      } else {
        setInvalidEmail(true);
        setValidEmail(false);
      }
    });
  }, [loginEmail]);

  return (
    <Layout>
      <div className="loginPage">
        <div className="loginPageMain">
          <span className="loginTitle">Login</span>
          <form className="loginForm" onSubmit={handleLoginSubmit}>
            <fieldset>
              <label htmlFor="loginEmail">Email</label>
              <input
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                type="email"
                id="loginEmail"
                className="loginInput"
                placeholder="Enter your Email...."
              />
              {validEmail && (
                <i className="loginSuccessIcon fa-solid fa-circle-check"></i>
              )}
              {invalidEmail && (
                <i className="loginErrorIcon fa-solid fa-circle-exclamation"></i>
              )}
            </fieldset>
            <fieldset>
              <label htmlFor="loginPassword">Password</label>
              <input
                ref={loginPassword}
                required
                type={showPassword ? "text" : "password"}
                id="loginPassword"
                className="loginInput"
                placeholder="Enter Your Password..."
              />
              {error && (
                <i className="loginErrorIcon fa-solid fa-circle-exclamation"></i>
              )}
              {!showPassword ? (
                <i
                  className="loginPasswordIcon fa-solid fa-eye"
                  onClick={(e) => {
                    setShowPassword(!showPassword);
                  }}
                ></i>
              ) : (
                <i
                  className="loginPasswordIcon fa-solid fa-eye-slash"
                  onClick={(e) => {
                    setShowPassword(!showPassword);
                  }}
                ></i>
              )}
            </fieldset>
            <button type="submit" className="loginButton" disabled={isLoading}>
              Login
            </button>
          </form>
          <button className="loginRegisterButton">
            <Link style={{ color: "inherit" }} to="/signup">
              Register
            </Link>
          </button>
        </div>
      </div>
    </Layout>
  );
}
