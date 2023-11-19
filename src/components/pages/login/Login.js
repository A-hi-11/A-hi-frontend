/** @format */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Navigation from "../../Navigation";
import "./Login.css";

const Login = () => {
  return (
    <div className='Login'>
      <Navigation />
      <div
        className='this'
        style={{
          margin: "0 auto",
          position: "absolute",
          left: "40%",
          textAlign: "center",
        }}
      >
        <h2>안녕 AI</h2>
        <h1>에이 하이</h1>
        <a href='/signup' style={{ color: "inherit" }}>
          회원이 아니신가요?
        </a>
        <p style={{ marginTop: "50px" }}>이메일로 로그인하기</p>
        <FontAwesomeIcon
          icon={faEnvelope}
          style={{ color: "#4997b0", fontSize: "60px" }}
        />
        <form>
          <div className='inputForm'>
            <p>아이디</p>
            <input type='text' required></input>
            <p>비밀번호</p>
            <input type='text' required></input>
          </div>
          <button type='submit'>로그인</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
