/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import Myprompt from "./Myprompt";
import MyChats from "./MyChats";
import ChatHistory from "./ChatHistory";
import EditInfo from "./Editinfo";
import "./Profile.css";
import Navigation from "../../Navigation";
import PassCheck from "./PassCheck";

const Profile = (props) => {
  const [myPrompts, setMyprompts] = useState([]);
  const userId = 9; //임시 사용자 id
  const [name, setName] = useState();
  const [editing, setEditing] = useState(false);
  const [myChats, setMyChats] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [passEdit, setPassEdit] = useState("");
  const [chatHistorys, setChatHistorys] = useState("");
  const [isPassCheck, setPassCheck] = useState(false);
  const [editName, setEditName] = useState("");
  const [isMine, setMine] = useState(true);
  const [isLike, setLike] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isHistory, setHistory] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

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

    const getMyChats = async () => {
      await axios
        .get(`http://localhost:3001/CHAT_ROOM`, {
          params: {
            Member_id: userId,
          },
        })
        .then((res) => setMyChats(res.data));
    };

    const getChatHistory = async () => {
      await axios
        .get(`http://localhost:3001/CHAT_ROOM`, {
          params: {
            Member_id: userId,
          },
        })
        .then((res) => setChatHistorys(res.data));
    };

    getName();
    getMyPrompts();
    getMyChats();
    getChatHistory();
  }, []);

  const toggleEditing = () => setEditing((prev) => !prev);
  return (
    <div className='container'>
      <Navigation />
      <div className='leftSide'>
        <div className='info'>
          <span className='innerInfo'>
            <img
              className='profilePic'
              src='img/profile_exm.png'
              width='100px'
              alt='my profile'
            />
            <span className='nameEmail'>
              <h2>{name}</h2>
              <h4>mail@gmail.com</h4>
            </span>
          </span>
          <button className='editBtn' onClick={toggleEditing}>
            정보 수정
          </button>
        </div>
        {editing ? (
          isPassCheck ? (
            <PassCheck password={1234} /> // 확인용 임시 부여 비밀번호
          ) : (
            <>
              <EditInfo
                setEditing={setEditing}
                setPassEdit={setPassEdit}
                setNameEdit={setNameEdit}
                setName={setName}
                nameEdit={nameEdit}
                passEdit={passEdit}
                userId={userId}
                uploadedImage={uploadedImage}
                setUploadedImage={setUploadedImage}
              />
            </>
          )
        ) : (
          <div />
        )}
      </div>
      <div className='rightSide'>
        <span className='menu'>
          <button
            id='mine'
            onClick={onClickMine}
            style={{ borderBottom: "3px solid #04364A" }}
          >
            나의 프롬프트
          </button>
          <button id='like' onClick={onClickLike}>
            좋아요
          </button>
          <button id='chatHistory' onClick={onClickHistory}>
            채팅 내역
          </button>
        </span>

        <div className='prompts'>
          {isMine ? (
            <>
              {myPrompts.map((myPrompt) => (
                <Myprompt
                  title={myPrompt.title}
                  key={myPrompt.id}
                  id={myPrompt.id}
                  date={myPrompt.created_date}
                  description={myPrompt.description}
                  userName={myPrompt.user_id}
                  likes={myPrompt.likes}
                  comments={myPrompt.comments}
                />
              ))}
            </>
          ) : null}
          {isHistory ? (
            <>
              {chatHistorys.map((chatHistory) => (
                <ChatHistory
                  title={chatHistory.Chat_room_name}
                  key={chatHistory.Chat_room_id}
                  date={chatHistory.Time}
                  lastchat='마지막 대화가 표시됩니다.'
                />
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
