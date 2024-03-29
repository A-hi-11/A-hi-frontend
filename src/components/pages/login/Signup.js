/** @format */
// Login과 Signup 페이지는 UI가 거의 동일합니다.
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import Navigation from "../../Navigation";
import "./Signup.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [verifyCode, setVerifyCode] = useState("");
  const [sendBtnDisabled, setSendBtnDisabled] = useState(false);
  const [verifyBtnDisabled, setVerifyBtnDisabled] = useState(true);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
  const [time, setTime] = useState(0);
  const [expireTime, setExpireTime] = useState(0);

  const timeFormat = (time) => {
    if (time == 0) return "코드 발송";
    const m = Math.floor(time / 60).toString();
    let s = (time % 60).toString();
    if (s.length === 1) s = `0${s}`;
    return `${m}:${s}`;
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  useEffect(() => {
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    if (time > 0) {
      const Counter = setInterval(() => {
        const gap = Math.floor((expireTime - new Date().getTime()) / 1000);
        setTime(gap);
      }, 1000);
      return () => clearInterval(Counter);
    }
    if (time == 0) {
      setSendBtnDisabled(false);
    }
  }, [expireTime, time]);

  const OnClickSend = async () => {
    //"@"형식 검증 먼저 하기
    // axios로 email 값 보내서 인증 코드 발송시키기

    setSendBtnDisabled(true);
    setVerifyBtnDisabled(false);
    setExpireTime(new Date().getTime() + 180000);
    setTime(179);
    try {
      const res = await axios.post("/user/mail", {
        email,
      });
    } catch (error) {
      console.log(email);
      console.log(error);
    }
  };
  const onClickVerify = async () => {
    // 인증코드 값을 보낸 후 백엔드에서 일치하는지 처리
    //백엔드에서 일치한다고 답이 오면 계속하기 버튼 활성화
    //인증 된 경우
    try {
      const res = await axios.post("/user/mail/check", {
        email: email,
        code: verifyCode,
      });
      if (res.data == true) {
        setSubmitBtnDisabled(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onClickCont = (e) => {
    if (submitBtnDisabled == true) e.preventDefault();
  };
 
  return (
    <div className='Signup'>
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
        <Link to='/login' style={{ color: "inherit" }}>
          계정이 있나요?
        </Link>
        <p style={{ marginTop: "30px" }}>이메일로 가입하기</p>
        <form>
          <div className='inputForm'>
            <div className="cont" style={{ display: "flex", marginLeft: "-70px" }}>
              <p style={{ width: "150px" }}>이메일 주소</p>
              <input
                type='text'
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <button
                type='button'
                className='sendBtn'
                disabled={sendBtnDisabled}
                style={{ margin: "3px" }}
                onClick={() => {

                  if (isValidEmail) {
                    OnClickSend();
                  }
                  else {
                    alert("올바른 이메일 형식이 아닙니다.")

                  }
                }}
              >
                {timeFormat(time)}
              </button>
            </div>
            <br />
            <div className="cont" style={{ display: "flex", marginLeft: "-70px" }}>
              <p style={{ width: "150px" }}>인증 코드</p>
              <input
                type='text'
                onChange={(e) => setVerifyCode(e.target.value)}
                required
              ></input>
              <button
                type='button'
                disabled={verifyBtnDisabled}
                style={{ margin: "3px" }}
                onClick={() => {
                  onClickVerify();
                }}
              >
                인증 하기
              </button>
            </div>
          </div>

          <Link
            to={`/Signupform/${email}`}
            onClick={() => {
              onClickCont();
            }}
          >
            <button type='submit' disabled={submitBtnDisabled}>
              계속하기
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
