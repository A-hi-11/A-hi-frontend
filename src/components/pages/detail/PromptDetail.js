/** @format */

import React, { useEffect } from "react";
import { useRef, useState } from "react";
import Navigation from "../../Navigation";
import "./PromptDetail.css";
import "../chat/Chat.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Loading";
import Chat from "../chat/ChatFrame";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import formatDateTime from "../../FormatDateTime";

const PromptDetail = () => {
  const { prompt_id } = useParams();
  const [detail, setDetail] = useState([]);
  const [user, setUser] = useState([]);
  const [isUse, setUse] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [isPrompt, setPrompt] = useState(false);
  const [isHowto, setHowto] = useState(false);
  const [loading, setLoading] = useState(true); // axios에서 정보를 받아오고 랜더링하기 위한 상태 state
  const [error, setError] = useState(null); // 에러발생시 에러를 저장할 수 있는 state
  const [refresh, setRefresh] = useState(1);

  const messageEndRef = useRef();
  const [Input, setInput] = useState("");

  const onClickLike = (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      axios
        .post(
          `http://43.201.240.250:8080/prompt/like`,
          { member_id: "test@gmail.com", prmopt_id: prompt_id, status: "like" },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            setRefresh((refresh) => refresh * -1);
          }
        });
    } catch (error) {
      setError(error);
      console.error("Error fetching sending likes:", error);
    }
  };

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
    setLoading(true);
    try {
      axios
        .get(`http://43.201.240.250:8080/prompt/view/${prompt_id}`)
        .then((res) => {
          setLoading(false);
          if (res.data) {
            setDetail(res.data);
          }
          console.log(res.data);
        });
    } catch (error) {
      setError(error);
      console.error("Error fetching prompt details:", error);
    }
  }, [refresh]);

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

  if (loading) return <Loading />;
  if (error) return <div>에러 발생..{error}</div>;
  if (!detail) return null;

  return (
    <div className='detailMain'>
      <Navigation />
      <div style={{ display: "inline-flex" }}>
        <div
          className='detailDiv'
          style={{
            marginRight: "27px",
            flexShrink: "0",
            padding: "25px",
          }}
        >
          <h2 color='FFF'>{detail.title}</h2>
          <h4 style={{ marginTop: "60px", fontWeight: "400" }}>
            프롬프트 설명
          </h4>
          <div className='desContainer'>
            <p>{detail.description}</p>
          </div>
          <p className='likes'>
            <FontAwesomeIcon
              icon={faHeart}
              style={{
                color: "#e63b7a",
                cursor: "pointer",
                marginRight: "5px",
                fontSize: "20px",
              }}
              onClick={onClickLike}
            />{" "}
            {detail.likes} 개의 좋아요
          </p>
          <div className='tagsContainer' style={{ display: "flex" }}>
            {detail.tags.map((tag) => (
              <p className='tag'>#{tag}</p>
            ))}
          </div>
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
              {detail.nickname ? detail.nickname : "비어있는 사용자 이름"}
            </p>
          </div>
          <p className='date'>게시일 : {formatDateTime(detail.create_time)}</p>
          <p className='date'>
            최근 수정일 : {formatDateTime(detail.update_time)}
          </p>
          <Comment
            comments={detail.comments}
            refresh={refresh}
            setRefresh={setRefresh}
            error={error}
            setError={setError}
            prompt_id={prompt_id}
          />
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
              <Chat
                width='530px'
                margin='10px'
                fontSize='14px'
                welcomeMsg={detail.welcome_message}
              />
            </>
          ) : null}
          {isPrompt ? (
            <>
              <p
                style={{
                  marginLeft: "13px",
                  lineHeight: "28px",
                  wordBreak: "keep-all",
                  fontSize: "16px",
                }}
              >
                {detail.content}
              </p>
              <h1>히히</h1>
            </>
          ) : null}
          {isHowto && (
            <>
              {detail.example.map((chatGroup, groupIndex) => (
                <div>
                  <h3 style={{ marginLeft: "25px", marginTop: "25px" }}>
                    예시 사용 {groupIndex + 1}
                  </h3>

                  <div
                    key={groupIndex}
                    className='detailResult'
                    style={{ width: "530px", fontSize: "14px" }}
                  >
                    <ul id='msgList'>
                      {chatGroup.map((chat, chatIndex) => (
                        <li
                          key={`${groupIndex}-${chatIndex}`}
                          className={chat.question ? "quest" : "response"}
                          style={{ maxWidth: "400px" }}
                        >
                          {chat.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptDetail;
