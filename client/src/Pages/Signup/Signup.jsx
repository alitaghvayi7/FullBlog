import "./signup.css";
import Layout from "../../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function Signup() {
  const location = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const password = useRef();
  const repeatPassword = useRef();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (password.current.value !== repeatPassword.current.value) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      axios.post("/auth/register", {
        username: username,
        email: email,
        password: password.current.value,
      });
      location("/login");
    }
  };

  useEffect(() => {
    axios.get(`/users?username=${username}`).then((response) => {
      if (response.data) {
        setUsernameError(true);
      } else {
        setUsernameError(false);
      }
    });
    axios.get(`/users?email=${email}`).then((response) => {
      if (response.data) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    });
  }, [username, email]);

  return (
    <Layout>
      <div className="signupPage">
        <div className="signupPageMain">
          <span className="signupTitle">Signup</span>
          <form className="signupForm" onSubmit={handleRegisterSubmit}>
            <fieldset>
              <label htmlFor="signupUsername">UserName</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                type="text"
                id="signupUsername"
                className="signupInput"
                placeholder="Enter your Username...."
              />
              {usernameError && (
                <i className="signupIcon fa-solid fa-circle-exclamation"></i>
              )}
            </fieldset>
            <fieldset>
              <label htmlFor="signupEmail">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                id="signupEmail"
                className="signupInput"
                placeholder="Enter your Email...."
              />
              {emailError && (
                <i className="signupIcon fa-solid fa-circle-exclamation"></i>
              )}
            </fieldset>
            <fieldset>
              <label htmlFor="signupPassword">Password</label>
              <input
                ref={password}
                required
                type={showPassword ? "text" : "password"}
                id="signupPassword"
                className="signupInput"
                placeholder="Enter Your Password..."
              />
              {passwordError && (
                <i className="signupIcon fa-solid fa-circle-exclamation"></i>
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
            <fieldset>
              <label htmlFor="signupRepeatPassword">RepeatPassword</label>
              <input
                ref={repeatPassword}
                required
                type={showRepeatPassword ? "text" : "password"}
                id="signupRepeatPassword"
                className="signupInput"
                placeholder="Enter Your Password Again..."
              />
              {passwordError && (
                <i className="signupIcon fa-solid fa-circle-exclamation"></i>
              )}
              {!showRepeatPassword ? (
                <i
                  className="loginPasswordIcon fa-solid fa-eye"
                  onClick={(e) => {
                    setShowRepeatPassword(!showRepeatPassword);
                  }}
                ></i>
              ) : (
                <i
                  className="loginPasswordIcon fa-solid fa-eye-slash"
                  onClick={(e) => {
                    setShowRepeatPassword(!showRepeatPassword);
                  }}
                ></i>
              )}
            </fieldset>

            <button type="submit" className="signupButton">
              Register
            </button>
          </form>
          <button className="signupLoginButton">
            <Link style={{ color: "inherit" }} to="/login">
              Login
            </Link>
          </button>
        </div>
      </div>
    </Layout>
  );
}
