import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Myprompt from "./Myprompt";
import "./Profile.css";
import Navigation from "../../Navigation";

function Profile() {
  const [myPrompts, setMyprompts] = useState([]);
  const userId = 9; //임시 사용자 id
  const [name, setName] = useState();
  const [editing, setEditing] = useState(false);
  const [nameEdit, setNameEdit] = useState("");
  const [passEdit, setPassEdit] = useState("");
  const [isPending, setIsPending] = useState(false);

  const [isMine, setMine] = useState(true);
  const [isLike, setLike] = useState(false);
  const [isHistory, setHistory] = useState(false);

  function onClickMine(e) {
    setLike(false);
    setHistory(false);
    setMine(true);
    document.getElementById("mine").style.borderBottom = "3px solid #04364A";
    document.getElementById("like").style.borderBottom = "none";
    document.getElementById("chatHistory").style.borderBottom = "none";
  }
  function onClickLike(e) {
    setLike(true);
    setHistory(false);
    setMine(false);
    document.getElementById("like").style.borderBottom = "3px solid #04364A";
    document.getElementById("chatHistory").style.borderBottom = "none";
    document.getElementById("mine").style.borderBottom = "none";
  }

  function onClickHistory(e) {
    setLike(false);
    setHistory(true);
    setMine(false);
    document.getElementById("chatHistory").style.borderBottom =
      "3px solid #04364A";
    document.getElementById("mine").style.borderBottom = "none";
    document.getElementById("like").style.borderBottom = "none";
  }

  useEffect(() => {
    const getName = async () => {
      await axios
        .get(`http://localhost:3001/User/${userId}`)
        .then((res) => setName(res.data.last_name));
    };

    const getMyPrompts = async () => {
      await axios
        .get("http://localhost:3001/MyPrompts", {
          params: {
            user_id: userId,
          },
        })
        .then((res) => setMyprompts(res.data));
    };

    getName();
    getMyPrompts();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsPending(true);

    let newName = { last_name: nameEdit };

    fetch(`http://localhost:3001/User/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newName),
    })
      .then(() => {
        console.log("new name added");
        setIsPending(false);
      })
      .catch((error) => console.error("Error :", error));
    setEditing(false);
    setName(nameEdit);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNameEdit(value);
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  return (
    <div className="container">
      <Navigation />
      <div className="leftSide">
        <div className="info">
          <span className="innerInfo">
            <img
              className="profilePic"
              src="img/profile_exm.png"
              width="100px"
            />
            <span className="nameEmail">
              <h2>{name}</h2>
              <h4>mail@gmail.com</h4>
            </span>
          </span>
          <button className="editBtn" onClick={toggleEditing}>
            정보 수정
          </button>
        </div>
        {editing ? (
          <>
            <form className="editInfo" onSubmit={onSubmit}>
              <img
                className="profilePic"
                src="img/profile_exm.png"
                width="100px"
              />
              <span className="content">
                <p>닉네임</p>
                <input
                  onChange={onChange}
                  value={nameEdit}
                  placeholder="변경할 닉네임을 입력하세요"
                  autoFocus
                  className="formInput"
                />
              </span>
              <span className="content">
                <p>비밀번호</p>
                <input
                  value={passEdit}
                  placeholder="변경할 비밀번호를 입력하세요"
                  autoFocus
                  className="formInput"
                />
              </span>
              <input type="submit" value="변경" className="formBtn" />
            </form>
          </>
        ) : (
          <div />
        )}
      </div>
      <div className="rightSide">
        <span className="menu">
          <button id="mine" onClick={onClickMine}>
            나의 프롬프트
          </button>
          <button id="like" onClick={onClickLike}>
            좋아요
          </button>
          <button id="chatHistory" onClick={onClickHistory}>
            채팅 내역
          </button>
        </span>

        <div className="prompts">
          {isMine ? (
            <>
              {myPrompts.map((myPrompt) => (
                <Myprompt
                  title={myPrompt.title}
                  key={myPrompt.id}
                  id={myPrompt.id}
                  date={myPrompt.date}
                  description={myPrompt.description}
                  userName={myPrompt.user_id}
                />
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Profile;