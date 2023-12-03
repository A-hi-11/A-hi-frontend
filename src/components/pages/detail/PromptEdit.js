/** @format */

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../createprompt/Create.css";
import Navigation from "../../Navigation";
import Chat from "../chat/ChatFrame";
const Create = () => {
  const location = useLocation().state.detail;
  console.log(location);
  const [tags, setTags] = useState([]);
  const [exms, setExms] = useState([]);
  const [kind, setKind] = useState({});
  const [exm1, setExm1] = useState(false);
  const [exm2, setExm2] = useState(false);
  //post할 원소들
  const [title, setTitle] = useState(location.title);
  const [desc, setDesc] = useState(location.description);
  const [content, setContent] = useState(location.content);

  const [cate, setCate] = useState(location.category);
  const [permission, setPermission] = useState(location.permission);
  const [useWelcomeM, setUseWelcomeM] = useState("yes");
  const [welcomeM, setWelcomeM] = useState(location.welcome_message);
  const [example, setExample] = useState(location.example);
  const [tagCont, setTagCont] = useState(location.tags);
  const navigate = useNavigate();
  const storedJwtToken = localStorage.getItem("jwtToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      member_id: location.member_id,
      title: title ? title : location.title,
      description: desc ? desc : location.desc,
      content: content ? content : location.content,
      mediaType: location.mediaType,
      category: cate ? cate : location.category,
      permission: permission,
      welcome_message: welcomeM ? welcomeM : location.welcomeM,
      example: location.example,
      tags: tagCont ? tagCont : location.tags,
      ...(location.mediaType != "image" && {
        gptConfigInfo: {
          model_name: "gpt-3.5-turbo",
          temperature: 0.7,
          maximum_length: 200,
          stop_sequence: "\\n",
          top_p: 0.9,
          frequency_penalty: 0.2,
          presence_penalty: 0.6,
        },
      }),
    });
    try {
      await axios
        .put(
          `https://a-hi-prompt.com/prompt/my-page/${location.prompt_id}`,
          {
            member_id: location.member_id,
            title: title ? title : location.title,
            description: desc ? desc : location.desc,
            content: content ? content : location.content,
            mediaType: location.mediaType,
            category: cate ? cate : location.category,
            permission: permission,
            welcome_message: welcomeM ? welcomeM : location.welcomeM,
            example: location.example,
            tags: tagCont ? tagCont : location.tags,
            ...(location.mediaType != "image" && {
              gptConfigInfo: {
                model_name: "gpt-3.5-turbo",
                temperature: 0.7,
                maximum_length: 200,
                stop_sequence: "\\n",
                top_p: 0.9,
                frequency_penalty: 0.2,
                presence_penalty: 0.6,
              },
            }),
          },
          {
            headers: {
              Authorization: "Bearer " + storedJwtToken,
            },
          },
        )
        .then((res) => {
          console.log(res);
          navigate(`/promptdetail/${location.prompt_id}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className='submitform'>
        <form action='BASE_URL' method='POST' onSubmit={handleSubmit}>
          <br />
          <ul className='kindForm'>
            <div
              className={"kind" + (kind == "gpt" ? "active" : "")}
              onClick={() => {
                setKind("gpt");
              }}
            >
              chatGPT
            </div>
            <div
              className={"kind" + (kind == "image" ? "active" : "")}
              onClick={() => {
                setKind("image");
              }}
            >
              Image
            </div>
          </ul>
          <br />
          <h4 style={{ margin: "10px" }}>프롬프트 제목</h4>{" "}
          <input
            onChange={(e) => setTitle(e.target.value)}
            className='name'
            placeholder={title}
          />
          <br />
          <br />
          <br />
          <h4 style={{ margin: "10px" }}>프롬프트 내용</h4>{" "}
          <textarea
            onChange={(e) => setContent(e.target.value)}
            className='contents'
            placeholder={content}
          />
          <br />
          <br />
          <br />
          <h4 style={{ margin: "10px" }}>프롬프트 설명</h4>{" "}
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            className='explain'
            placeholder={desc}
          />
          <br />
          <br />
          <br />
          <h4 style={{ margin: "10px" }}>시작 메세지</h4>
          <ul className='kindForm'>
            <div
              className={"kind" + (useWelcomeM == "yes" ? "active" : "")}
              onClick={() => {
                setUseWelcomeM("yes");
              }}
            >
              사용
            </div>
            <div
              className={"kind" + (useWelcomeM == "no" ? "active" : "")}
              onClick={() => {
                setUseWelcomeM("no");
              }}
            >
              사용 안함
            </div>
          </ul>
          {useWelcomeM == "yes" ? (
            <textarea
              onChange={(e) => setWelcomeM(e.target.value)}
              className='explain'
              placeholder={welcomeM}
            />
          ) : (
            ""
          )}
          <br />
          <br />
          <br />
          <h4 style={{ margin: "10px" }}>카테고리 </h4>
          <ul className='kindForm'>
            <div
              className={"kind" + (cate == "etc" ? "active" : "")}
              onClick={() => {
                setCate("etc");
              }}
            >
              기타
            </div>
            <div
              className={
                "kind" + (cate == "task" || cate == "human" ? "active" : "")
              }
              onClick={() => {
                kind == "gpt" ? setCate("task") : setCate("human");
              }}
            >
              {kind == "gpt" ? "업무용" : "인물"}
            </div>
            <div
              className={
                "kind" + (cate == "life" || cate == "animal" ? "active" : "")
              }
              onClick={() => {
                kind == "gpt" ? setCate("life") : setCate("animal");
              }}
            >
              {kind == "gpt" ? "생활" : "동물"}
            </div>
            <div
              className={
                "kind" +
                (cate == "programming" || cate == "sight" ? "active" : "")
              }
              onClick={() => {
                kind == "gpt" ? setCate("programming") : setCate("sight");
              }}
            >
              {kind == "gpt" ? "프로그래밍" : "풍경"}
            </div>
            <div
              className={
                "kind" + (cate == "creative" || cate == "obj" ? "active" : "")
              }
              onClick={() => {
                kind == "gpt" ? setCate("creative") : setCate("obj");
              }}
            >
              {kind == "gpt" ? "창의" : "사물"}
            </div>
            <div
              className={
                "kind" + (cate == "edu" || cate == "character" ? "active" : "")
              }
              onClick={() => {
                kind == "gpt" ? setCate("edu") : setCate("character");
              }}
            >
              {kind == "gpt" ? "교육" : "캐릭터"}
            </div>
          </ul>
          <br />
          <br />
          <br />
          <h4 style={{ margin: "10px" }}>태그</h4>
          <div>
            <input
              className='name'
              onChange={(e) => {
                let newArr = [...tagCont];
                newArr[tags.length] = e.target.value;
                setTagCont(newArr);
                console.log(tagCont);
              }}
              placeholder='태그를 입력하세요(최대 5개)'
            />
            <button
              type='button'
              className='btn'
              onClick={() => {
                if (tags.length < 4) {
                  setTags([...tags, 1]);
                }
              }}
            >
              +
            </button>
          </div>
          {tags.map(() => {
            return (
              <div>
                <input
                  className='name'
                  onChange={(e) => {
                    let newArr = [...tagCont];
                    newArr[tags.length] = e.target.value;
                    setTagCont(newArr);
                    console.log(tagCont);
                  }}
                  placeholder='태그를 입력하세요(최대 5개)'
                />
                <button
                  type='button'
                  className='btn'
                  onClick={() => {
                    if (tags.length < 4) {
                      setTags([...tags, 1]);
                    }
                  }}
                >
                  +
                </button>
              </div>
            );
          })}
          <br />
          <br />
          <br />
          <h4 style={{ margin: "10px" }}>예시질문 생성 (최대 2개)</h4>
          {kind == "gpt" ? (
            <div className='chat'>
              <Chat />
            </div>
          ) : (
            ""
          )}
          <br />
          <button
            type='button'
            className='exmBtn'
            onClick={() => {
              if (exms.length < 2) {
                setExms([...exms, exms.length + 1]);
              }
            }}
          >
            예시 생성
          </button>
          <div className='exmList'>
            {exms.map((i) => {
              return (
                <div className='exm'>
                  사용예시{i}
                  <div
                    className='view'
                    onClick={() => {
                      if (i == 1) {
                        setExm1(true);
                      } else {
                        setExm2(true);
                      }
                    }}
                  >
                    상세보기
                  </div>
                  <div
                    className='delete'
                    onClick={() => {
                      exms.pop();
                      setExms([...exms]);
                    }}
                  >
                    삭제
                  </div>
                </div>
              );
            })}
          </div>
          {exm1 ? (
            <div
              className='exmChat'
              onClick={() => {
                setExm1(false);
                setExm2(false);
              }}
            >
              <Chat />
            </div>
          ) : (
            ""
          )}
          {exm2 ? (
            <div
              className='exmChat'
              onClick={() => {
                setExm1(false);
                setExm2(false);
              }}
            >
              <Chat />
            </div>
          ) : (
            ""
          )}
          <br />
          <br />
          <h4 style={{ margin: "10px" }}>비회원 공개여부 </h4>
          <ul className='kindForm'>
            <div
              className={"kind" + (permission == true ? "active" : "")}
              onClick={() => {
                setPermission(true);
              }}
            >
              공개
            </div>
            <div
              className={"kind" + (permission == false ? "active" : "")}
              onClick={() => {
                setPermission(false);
              }}
            >
              비공개
            </div>
          </ul>
          <br />
          <br />
          <br />
          <input className='subBtn' type='submit' />
          <br />
          <br />
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};

export default Create;
