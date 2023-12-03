/** @format */

import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Navigation";
import "./PromptDetail.css";
import "../chat/Chat.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Loading";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import formatDateTime from "../../FormatDateTime";
import PromptStableDiffusion from "../../stablediffusion/PromptStableDiffusion";
import PromptGpt from "../chat/PromptGpt";
import LoginButton from "./LoginButton";
const storedJwtToken = localStorage.getItem("jwtToken");

const PromptDetail = () => {
  const { prompt_id } = useParams();
  const [detail, setDetail] = useState([]);
  const [isUse, setUse] = useState(true);
  const [isPrompt, setPrompt] = useState(false);
  const [isHowto, setHowto] = useState(false);
  const [loading, setLoading] = useState(true); // axios에서 정보를 받아오고 랜더링하기 위한 상태 state
  const [error, setError] = useState(null); // 에러발생시 에러를 저장할 수 있는 state
  const [refresh, setRefresh] = useState(1);
  const navigate = useNavigate();
  const loginStatus = localStorage.getItem("memberId");

  const messageEndRef = useRef();
  const [Input, setInput] = useState("");

  const onClickEdit = () => {
    navigate("/prompt_edit", { state: { detail } });
    // 수정을 수행하는 로직을 추가하세요.
    console.log("Edit button clicked!");
  };

  const onClickDelete = async () => {
    try {
      await axios
        .delete(
          `https://a-hi-prompt.com/prompt/my-page/${prompt_id}`,
          {
            data: {
              prompt_id: prompt_id,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + storedJwtToken,
            },
          },
        )
        .then(() => {
          console.log(" button clicked!");
          navigate(-1);
        });
    } catch {
      console.error("Delete Prompt Error");
    }
  };

  const onClickLike = (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      axios
        .post(
          `https://a-hi-prompt.com/prompt/like`,
          { member_id: "test@gmail.com", prompt_id: prompt_id, status: "like" },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          {
            headers: {
              Authorization: "Bearer " + storedJwtToken,
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
    const storedMemberId = localStorage.getItem("memberId");

    try {
      axios
        .get(
          `https://a-hi-prompt.com/prompt/view/info?prompt_id=${prompt_id}&member_id=${storedMemberId}`,
          {
            headers: {
              Authorization: "Bearer " + storedJwtToken,
            },
          },
        )
        .then((res) => {
          setLoading(false);
          if (res.data) {
            setDetail(res.data);
          } else {
            // 데이터가 없을 경우 이전 페이지로 이동
            navigate(-1);
          }
          console.log(res.data);
        });
    } catch (error) {
      setError(error);
      console.error("Error fetching prompt details:", error);
    }
  }, [refresh, navigate, prompt_id]);

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
          {loading ? (
            <Loading color='white' pos='0px' rightPos='0px' />
          ) : (
            <>
              <h2 color='FFF'>{detail.title}</h2>
              <h4 style={{ marginTop: "60px", fontWeight: "400" }}>
                프롬프트 설명
              </h4>
              <div className='desContainer'>
                <p>{detail.description}</p>
              </div>
              {loading ? (
                <Loading color='#04364A' pos='0px' rightPos='0px' />
              ) : (
                <>
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
                </>
              )}
              <div className='tagsContainer' style={{ display: "flex" }}>
                {detail.tags.map((tag) => (
                  <p className='tag'>#{tag}</p>
                ))}
                {detail.myPrompt && ( // detail.myPrompt 값이 true일 때만 버튼을 표시
                  <>
                    <button className='myBtn' onClick={onClickEdit}>
                      수정
                    </button>
                    <button className='myBtn' onClick={onClickDelete}>
                      삭제
                    </button>
                  </>
                )}
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
              <p className='date'>
                게시일 : {formatDateTime(detail.create_time)}
              </p>
              <p className='date'>
                최근 수정일 : {formatDateTime(detail.update_time)}
              </p>

              {loading ? (
                <Loading color='white' pos='0px' rightPos='0px' />
              ) : (
                <>
                  <Comment
                    comments={detail.comments}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    error={error}
                    setError={setError}
                    prompt_id={prompt_id}
                  />
                </>
              )}
            </>
          )}
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
              {detail.mediaType === "image" ? (
                // mediaType이 "image"인 경우에 대한 컴포넌트 또는 렌더링
                <PromptStableDiffusion
                  width='530px'
                  margin='10px'
                  fontSize='14px'
                  content={detail.content}
                  welcome_msg={detail.welcome_message}
                />
              ) : (
                // mediaType이 "image"가 아닌 경우에 대한 컴포넌트 또는 렌더링
                <PromptGpt
                  width='530px'
                  margin='10px'
                  fontSize='14px'
                  welcomeMsg={detail.welcome_message}
                  prompt_id={detail.prompt_id}
                />
              )}
            </>
          ) : null}

          {isPrompt ? (
            <>
              {detail.permission ? (
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
              ) : (
                <>
                  <p
                    style={{
                      marginLeft: "13px",
                      lineHeight: "28px",
                      wordBreak: "keep-all",
                      fontSize: "16px",
                      filter: "blur(4px)", // 블러 처리 스타일을 추가
                    }}
                  >
                    조회 권한이 없는 컨텐츠입니다.
                  </p>
                  {loginStatus ? <LoginButton /> : null}
                </>
              )}
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
                    <ul id='msgList' style={{ paddingLeft: "18px" }}>
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
