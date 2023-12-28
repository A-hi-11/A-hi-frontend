/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import Myprompt from "./Myprompt";
import ChatHistory from "./ChatHistory";
import EditInfo from "./Editinfo";
import "./Profile.css";
import Navigation from "../../Navigation";
import PassCheck from "./PassCheck";
import Loading from "../../Loading";
import LikedPrompt from "./LikedPrompt";
import EditProfile from "./EditProfile";

const Profile = (props) => {
  const storedMemberId = localStorage.getItem("memberId");
  const storedJwtToken = localStorage.getItem("jwtToken");
  const isOAuth = localStorage.getItem("isOAuth");

  const [storedNickname, setStoredNickname] = useState(
    localStorage.getItem("nickname"),
  );
  const [storedProfileImage, setStoredProfileImage] = useState(
    localStorage.getItem("profileImage"),
  );

  const [myPrompts, setMyprompts] = useState([]);

  const [isEditingPass, setEditingPass] = useState(false);
  const [nameEdit, setNameEdit] = useState("");
  const [likedPrompts, setLikedPrompts] = useState([]);
  const [chatHistorys, setChatHistorys] = useState("");
  const [isPassCheck, setPassCheck] = useState(true);
  const [isMine, setMine] = useState(true);
  const [isLike, setLike] = useState(false);
  const [isEditingProfile, setEditingProfile] = useState(false);
  const [isHistory, setHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);

  function onClickMine(e) {
    setLike(false);
    setHistory(false);
    setMine(true);
    document.getElementById("mine").style.borderBottom = "3px solid #04364A";
    document.getElementById("like").style.borderBottom = "none";
    document.getElementById("chatHistory").style.borderBottom = "none";
  }

  async function onClickLike(e) {
    try {
      await axios
        .get(`https://a-hi-prompt.com/my-page/likes`, {
          headers: {
            Authorization: "Bearer " + storedJwtToken,
          },
        })
        .then((response) => {
          setLikedPrompts(response.data);
          setLike(true);
          setHistory(false);
          setMine(false);
          document.getElementById("like").style.borderBottom =
            "3px solid #04364A";
          document.getElementById("chatHistory").style.borderBottom = "none";
          document.getElementById("mine").style.borderBottom = "none";
          setIsLoading(true);
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error fetching getting liked prompts:", error);
    }
  }

  async function onClickHistory(e) {
    try {
      await axios
        .get("https://a-hi-prompt.com/my-page/chat", {
          headers: {
            Authorization: "Bearer " + storedJwtToken,
          },
        })
        .then((response) => {
          setChatHistorys(response.data);
          setLike(false);
          setHistory(true);
          setMine(false);
          document.getElementById("chatHistory").style.borderBottom =
            "3px solid #04364A";
          document.getElementById("mine").style.borderBottom = "none";
          document.getElementById("like").style.borderBottom = "none";
        });
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  }

  useEffect(() => {}, [storedNickname]);

  useEffect(() => {
    const getMyPrompts = async () => {
      return await axios
        .get(`https://a-hi-prompt.com/prompt/my-page`, {
          headers: {
            Authorization: "Bearer " + storedJwtToken,
          },
        })
        .then((response) => {
          setMyprompts(response.data);
        });
    };

    const fetchData = async () => {
      await getMyPrompts();
    };

    fetchData();
  }, [refresh]);
  const toggleEditingPass = () => {
    setEditingPass((prev) => !prev);
    if (isEditingProfile == true) {
      setEditingProfile((prev) => !prev);
    }
  };
  const toggleEditingProfile = () => {
    setEditingProfile((prev) => !prev);
    if (isEditingPass == true) {
      setEditingPass((prev) => !prev);
    }
  };

  if (isLoading) return <Loading color='#04364A' pos='0px' rightPos='0px' />;

  return (
    <div className='container'>
      <Navigation />
      <div className='leftSide'>
        <div className='info'>
          <span className='innerInfo'>
            <img
              className='profilePic'
              src={storedProfileImage}
              width='100px'
              alt='my profile'
            />
            <span className='nameEmail'>
              <h2>
                {storedNickname != undefined
                  ? storedNickname
                  : "프롬프트 제작소"}
              </h2>
              <h4>{storedMemberId}</h4>
            </span>
          </span>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button className='editBtn' onClick={toggleEditingProfile}>
              프로필 변경
            </button>
            {isOAuth ? null : (
              <button className='editBtn' onClick={toggleEditingPass}>
                비밀번호 변경
              </button>
            )}
          </div>
        </div>
        {isEditingPass ? (
          isPassCheck ? (
            <PassCheck setPassCheck={setPassCheck} /> // 확인용 임시 부여 비밀번호
          ) : (
            <>
              <EditInfo
                setEditingPass={setEditingPass}
                userId={storedMemberId}
                setRefresh={setRefresh}
              />
            </>
          )
        ) : null}
        {isEditingProfile ? (
          <>
            <EditProfile
              setEditingProfile={setEditingProfile}
              setNameEdit={setNameEdit}
              setStoredNickname={setStoredNickname}
              nameEdit={nameEdit}
              userId={storedMemberId}
              storedProfileImage={storedProfileImage}
              setStoredProfileImage={setStoredProfileImage}
              setRefresh={setRefresh}
            />
          </>
        ) : null}
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
              {myPrompts
                ? myPrompts.map((myPrompt) => (
                    <Myprompt data={myPrompt} key={myPrompt.prompt_id} />
                  ))
                : null}
            </>
          ) : null}
          {isLike ? (
            <>
              {likedPrompts
                ? likedPrompts.map((likedPrompt) => (
                    <LikedPrompt
                      data={likedPrompt}
                      key={likedPrompt.prompt_id}
                    />
                  ))
                : null}
            </>
          ) : null}
          {isHistory ? (
            <>
              {chatHistorys
                ? chatHistorys.map((chatHistory) => (
                    <ChatHistory data={chatHistory} />
                  ))
                : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
