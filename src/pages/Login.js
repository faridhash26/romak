import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg";

const Login = (props) => {
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    setIsError(false);
    setuserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };
  const handleLoginService = async () => {
    try {
      const res = await axios.post(
        "https://dummyjson.com/auth/login",

        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", res.data.token);
      alert("ورود موفقیت آمیز بود");
      navigate("/dashboard");
    } catch (error) {
      setIsError(true);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLoginService();

    setuserInfo({
      username: "",
      password: "",
    });
  };
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-image">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="devider"></div>
        <form className="form-wrapper" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">نام کاربری</label>
            <input
              value={userInfo.username}
              id="username"
              name="username"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">رمز عبور</label>
            <input
              value={userInfo.password}
              id="password"
              name="password"
              type={"password"}
              onChange={handleChange}
            />
          </div>
          <div className="button-wrapper">
            <button className="submit-button" type="submit">
              ورود به حساب کاربری
            </button>
            <Link>فراموشی رمز عبور</Link>
          </div>
          <div>
            {isError && <span>!نام کاربری یا رمز عبور اشتباه است</span>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
