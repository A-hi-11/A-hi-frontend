/** @format */

import React, { useState, useEffect } from "react";
import Navigation from "../../Navigation";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 180);
  function login() {
    window.location.href = process.env.REACT_APP_API_URL + "/google-login";
  }
  function naver() {
    window.location.href = process.env.REACT_APP_API_URL + "/naver-login";
  }

  const onClickLogin = async () => {
    try {
      const res = await axios.post("/user/signin", {
        userId: id,
        userPassword: pw,
      });
      if (
        res.data != "존재하지 않는 회원입니다. 로그인에 실패하였습니다." &&
        res.data != "비밀번호가 일치하지 않습니다. 로그인에 실패하였습니다."
      ) {
        localStorage.setItem("memberId", res.data.memberId);
        localStorage.setItem("nickname", res.data.nickname);
        localStorage.setItem("profileImage", res.data.profileImg);
        localStorage.setItem("jwtToken", res.data.jwt);
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
              type='email'
              onChange={(e) => setId(e.target.value)}
              required
            ></input>
            <p>비밀번호</p>
            <input
              type='password'
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => {
                onClickLogin();
              }}
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
              onClick={naver}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
