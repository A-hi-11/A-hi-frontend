/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
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
import { BuyButton, LoginButton } from "./Button";
import { purchasedCheck } from "./purchasedCheck";

const storedJwtToken = localStorage.getItem("jwtToken");

const PromptDetail = () => {
  const { prompt_id } = useParams();
  const [detail, setDetail] = useState([]);
  const [isUse, setUse] = useState(true);
  const [isPrompt, setPrompt] = useState(false);
  const [isHowto, setHowto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(1);
  const [purchased, setPurchased] = useState(false);

  const navigate = useNavigate();
  const loginStatus = localStorage.getItem("jwtToken");
  const onClickEdit = () => {
    navigate("/prompt_edit", { state: { detail } });
  };

  const onClickDelete = async () => {
    try {
      await axios
        .delete(
          `/prompt/my-page/${prompt_id}`,

          {
            headers: {
              Authorization: "Bearer " + storedJwtToken,
            },
          },
        )
        .then(() => {
          alert("프롬프트 삭제가 완료되었습니다.");
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
          `/prompt/like`,
          { prompt_id: detail.prompt_id, status: "like" },
          {
            headers: {
              "Content-Type": "application/json",
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

  const checkPurchased = async () => {
    const status = await purchasedCheck(prompt_id);
    setPurchased(status);
  };

  useEffect(() => {
    checkPurchased();
  }, []);

  useEffect(() => {
    const fetchPromptDetail = async () => {
      setLoading(true);
      const storedMemberId = localStorage.getItem("memberId");

      try {
        axios
          .get(
            `/prompt/view/info?prompt_id=${prompt_id}&member_id=${
              storedMemberId ? storedMemberId : ""
            }`,
            storedJwtToken
              ? {
                  headers: {
                    Authorization: "Bearer " + storedJwtToken,
                  },
                }
              : null,
          )
          .then((res) => {
            setLoading(false);
            if (res.data) {
              setDetail(res.data);
            } else {
              navigate(-1);
            }
          });
      } catch (error) {
        setError(error);
        console.error("Error fetching prompt details:", error);
      }
    };

    fetchPromptDetail();
  }, [refresh, navigate, prompt_id]);

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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 color='FFF'>{detail.title}</h2>
                {purchased ? <h4 className='purchased'>구매 완료</h4> : null}
              </div>
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
                {detail.tags.length > 1 &&
                  detail.tags.map((tag) => <p className='tag'>#{tag}</p>)}
                {detail.myPrompt && (
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
                  src={process.env.PUBLIC_URL + "/img/base_profile.png"}
                  style={{ width: "60px", height: "60px", margin: "0" }}
                />
                <p
                  style={{
                    textAlign: "end",
                    paddingBottom: "20px",
                    marginLeft: "10px",
                  }}
                >
                  {detail.nickname}
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
            !loginStatus ? (
              <>
                <p
                  style={{
                    marginLeft: "13px",
                    lineHeight: "28px",
                    wordBreak: "keep-all",
                    fontSize: "16px",
                  }}
                >
                  프롬프트 이용하기 기능은 회원 전용입니다.
                  <br />
                  간편하게 가입하고 에이하이의 회원 전용 기능을 이용하세요!
                </p>
                {!loginStatus ? <LoginButton /> : null}
              </>
            ) : (
              <>
                {detail.mediaType === "image" ? (
                  <PromptStableDiffusion
                    width='530px'
                    margin='10px'
                    fontSize='14px'
                    content={detail.content}
                    welcome_msg={detail.welcome_message}
                    prompt_id={detail.prompt_id}
                    chat_room_id={detail.chat_room_id}
                  />
                ) : (
                  <PromptGpt
                    width='530px'
                    margin='10px'
                    fontSize='14px'
                    welcomeMsg={detail.welcome_message}
                    prompt_id={detail.prompt_id}
                  />
                )}
              </>
            )
          ) : null}

          {isPrompt ? (
            <>
              {detail.permission || purchased ? (
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
                    {detail.content}
                  </p>
                  {loginStatus ? (
                    <>
                      <p style={{ color: "#04364A", marginLeft: "38%" }}>
                        구매하여 확인하기
                      </p>
                      <BuyButton promptId={detail.prompt_id} />
                    </>
                  ) : (
                    <>
                      <p style={{ color: "#04364A", marginLeft: "32%" }}>
                        로그인 후 확인 가능합니다.
                      </p>
                      <LoginButton />
                    </>
                  )}
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
                      {chatGroup.map((chat, chatIndex) =>
                        chat.question == "true" ? (
                          <li
                            key={`${groupIndex}-${chatIndex}`}
                            className={chat.question ? "response" : "quest"}
                            style={{ maxWidth: "400px" }}
                          >
                            {chat.message}
                          </li>
                        ) : detail.mediaType == "image" ? (
                          <>
                            <img src={chat.message} className='quest' />
                          </>
                        ) : (
                          <li
                            key={`${groupIndex}-${chatIndex}`}
                            className={chat.question ? "response" : "quest"}
                            style={{ maxWidth: "400px" }}
                          >
                            {chat.message}
                          </li>
                        ),
                      )}
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
