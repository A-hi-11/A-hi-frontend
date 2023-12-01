/** @format */
// Login과 Signup 페이지는 UI가 거의 동일합니다.
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../../Navigation";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 180);
  function login() {
    window.location.href = "https://a-hi-prompt.com/google-login";
  }
  const naver = () => {
    window.location.href = "http://api.a-hi-prompt.com/";
  };
  const onClickLogin = async () => {
    try {
      const res = await axios.post("https://a-hi-prompt.com/user/signin", {
        userId: id,
        userPassword: pw,
      });
      if (
        res.data != "존재하지 않는 회원입니다. 로그인에 실패하였습니다." &&
        res.data != "비밀번호가 일치하지 않습니다. 로그인에 실패하였습니다."
      ) {
        cookie.save("token", res.data, {
          path: "/",
          expires,
        });
        console.log(cookie.load("token"));
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='Login'>
      <Navigation />
      <div
        className='this'
        style={{
          marginTop: "-20px",
          position: "absolute",
          left: "40%",
          textAlign: "center",
        }}
      >
        <h2>안녕 AI</h2>
        <h1>에이 하이</h1>
        <Link to='/signup' style={{ color: "inherit" }}>
          회원이 아니신가요?
        </Link>
        <p style={{ marginTop: "30px" }}>이메일로 로그인하기</p>
        <form>
          <div className='inputForm'>
            <p>아이디</p>
            <input
              type='text'
              onChange={(e) => setId(e.target.value)}
              required
            ></input>
            <p>비밀번호</p>
            <input
              type='text'
              onChange={(e) => setPw(e.target.value)}
              required
            ></input>
          </div>
          <button
            type='button'
            onClick={() => {
              onClickLogin();
            }}
          >
            로그인
          </button>

          <div style={{ marginTop: "30px", marginLeft: "50px" }}>
            <img
              style={{ display: "block", width: "300px", marginBottom: "8px" }}
              src='img/google_login.png'
              onClick={login}
            />
            <img
              style={{ display: "block", width: "300px", height: "75px" }}
              src='img/naver_login.png'
              onClick={() => {
                naver();
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
