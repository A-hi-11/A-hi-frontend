/** @format */

import React, { useEffect } from "react";
import { useRef, useState } from "react";
import Navigation from "../../Navigation";
import "./PromptDetail.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import Chat from "../chat/ChatFrame";

const PromptDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [user, setUser] = useState([]);
  const [isUse, setUse] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [isPrompt, setPrompt] = useState(false);
  const [isHowto, setHowto] = useState(false);

  const messageEndRef = useRef();
  const [Input, setInput] = useState("");

  function onClickUse(e) {
    setUse(true);
    setPrompt(false);
    setHowto(false);
    document.getElementById("use").style.borderBottom = "3px solid #04364A";
    document.getElementById("prompt").style.borderBottom = "none";
    document.getElementById("howto").style.borderBottom = "none";
  }
  function onClickPrompt(e) {
    setPrompt(true);
    setUse(false);
    setHowto(false);
    document.getElementById("prompt").style.borderBottom = "3px solid #04364A";
    document.getElementById("use").style.borderBottom = "none";
    document.getElementById("howto").style.borderBottom = "none";
  }

  function onClickHowto(e) {
    setUse(false);
    setPrompt(false);
    setHowto(true);
    document.getElementById("howto").style.borderBottom = "3px solid #04364A";
    document.getElementById("prompt").style.borderBottom = "none";
    document.getElementById("use").style.borderBottom = "none";
  }

  useEffect(() => {
    getMyPrompts().then(getUser());
  }, []);

  const getMyPrompts = async () => {
    await axios
      .get(`http://localhost:3001/MyPrompts/${id}`)
      .then((res) => setDetail(res.data));
  };

  const getUser = async () => {
    // const userId = detail.user_id;
    // await axios
    //   .get(`http://localhost:3001/User/${userId}`)
    //   .then((res) => setUser(res.data));
    setUser({ name: "Unknown" });
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function onSendMsg(event) {
    event.preventDefault();
    const ul = document.getElementById("msgList");
    const li = document.createElement("li");
    //li.className = 'quest';
    li.innerText = Input;
    ul.appendChild(li);
    scrollToBottom(messageEndRef);
  }
  return (
    <div className='detailMain' style={{ display: "flex" }}>
      <Navigation />
      <div style={{ display: "inline-flex" }}>
        <div
          className='detailDiv'
          style={{
            marginRight: "27px",
            height: "868px",
            flexShrink: "0",
            padding: "25px",
          }}
        >
          <h2 color='FFF'>title</h2>
          <h3>프롬프트 설명</h3>
          <p style={{ fontWeight: "lighter" }}>{detail.description}</p>
          <p style={{ marginLeft: "7px", marginRight: "7px" }}>
            <FontAwesomeIcon icon={faHeart} style={{ color: "#e63b7a" }} />{" "}
            likes
          </p>
          <p>#tag #tag #tag #tag</p>
          <div style={{ display: "inline-flex", marginTop: "40px" }}>
            <img
              className='profilePic'
              src={process.env.PUBLIC_URL + "/img/profile_exm.png"}
              style={{ width: "60px", height: "60px", margin: "0" }}
            />
            <p
              style={{
                textAlign: "end",
                paddingBottom: "20px",
                marginLeft: "10px",
              }}
            >
              제작자
            </p>
          </div>
          <p textAlign='center'>게시일 : 2023/11/13</p>
          <p textAlign='center'>최근 수정일 : 2023/11/15</p>
        </div>
        <div
          className='detailDiv'
          style={{
            backgroundColor: "white",
            border: "3px solid #04364A",
            marginLeft: "10px",
            height: "868px",
            flexShrink: "0",
            padding: "10px",
            color: "#04364A",
          }}
        >
          <span className='detailMenu'>
            <button
              id='use'
              style={{ borderBottom: "3px solid #04364A" }}
              onClick={onClickUse}
            >
              사용해보기
            </button>
            <button id='prompt' onClick={onClickPrompt}>
              프롬프트 내용
            </button>
            <button id='howto' onClick={onClickHowto}>
              사용 방법
            </button>
          </span>
          {isUse ? (
            <>
              <Chat width='530px' margin='10px' fontSize='14px' />
            </>
          ) : null}
          {isPrompt ? (
            <>
              <p>
                안녕하세요, 당신은 이제부터 영한 번역 서비스를 위한
                번역로봇입니다. 사용자가 입력하는 영문에 대해 문장마다 끊어
                영문을 출력하고 한 줄을 띄고 한글로 번역해주세요. 또한 영문은
                굵음 처리를 하여 출력하고 한글은 소괄호 안에 넣어 출력해주세요.
              </p>
              <h1>히히</h1>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PromptDetail;
