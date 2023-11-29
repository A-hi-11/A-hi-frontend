/** @format */
// Login과 Signup 페이지는 UI가 거의 동일합니다.
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Navigation from "../../Navigation";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from 'axios';
const Login = () => {
  const google = async () => {
    try {
      await (axios.get("/auth/kakao",{
        headers : {"Access-Code" : "L8ZHluIb_u5XKuEHa3GrJQMBxeJuWZ5cnRUb5TgYtXFcnLkcdYoGsuI1AXwKKiWRAAABi-alyAbOkqTnJF629A"}
      }))
    }
  catch(error) {
    console.log(error);
  }};
  const naver = () => {
    axios.get("/auth/naver",{
      headers : {"Access-Code" : "O1HrSzrucATjL7qh05"}
    })
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
        <Link to='/signup' style={{ color: "inherit"}}>
          회원이 아니신가요?
        </Link>
        <p style={{ marginTop: "30px" }}>이메일로 로그인하기</p>
        <form>
          <div className='inputForm'>
            <p>아이디</p>
            <input type='text' required></input>
            <p>비밀번호</p>
            <input type='text' required></input>
          </div>
          <button type='submit'>로그인</button>

          <div style={{marginTop:"30px",marginLeft:"50px"}}>
              <img style={{display:"block", width:"300px",marginBottom:"8px"}} src="img/google_login.png" onClick={()=>{google()}}/>
              <img style={{display:"block", width:"300px", height:"75px"}} src="img/naver_login.png" onClick={()=>{naver()}}/>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
