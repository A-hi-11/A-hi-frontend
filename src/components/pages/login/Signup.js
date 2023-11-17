/** @format */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Navigation from "../../Navigation";
import "./Signup.css";

const Signup = () => {
  const onClickLogin = () => {
    console.log("로그인 api");
  };
  return (
    <div
      className='Signup'
      style={{
        display: "inline-flex",
      }}
    >
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
        <a href='/login' style={{ color: "inherit" }}>
          계정이 있나요?
        </a>
        <p style={{ marginTop: "50px" }}>이메일로 가입하기</p>
        <FontAwesomeIcon
          icon={faEnvelope}
          style={{ color: "#4997b0", fontSize: "60px" }}
        />
        <form>
          <div className='inputForm'>
            <p>이메일 주소</p>
            <input type='text' required></input>
            <p>인증 코드</p>
            <input type='text' required></input>
          </div>
          <button type='submit' onClick={onClickLogin}>
            계속하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
