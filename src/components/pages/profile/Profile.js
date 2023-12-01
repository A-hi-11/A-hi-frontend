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

const mockData = [
  {
    chat_room_id: 1,
    chat_room_name: "???",
    create_time: "2023-11-16T23:20:18.436564",
    model_type: "gpt-3.5-turbo",
    last_message:
      "점심에 먹을 수 있는 다양한 옵션이 있지만, 식사 전에 당신의 개인적인 선호도와 식사 시간, 식사 장소 등을 고려해야 합니다. 다음은 점심에 먹을 수 있는 몇 가지 옵션입니다.\n\n1. 밥과 국/찌개/",
  },
];

const Profile = (props) => {
  const storedMemberId = localStorage.getItem("memberId");
  const storedNickname = localStorage.getItem("nickname");
  const storedProfileImage = localStorage.getItem("profileImage");
  const storedJwtToken = localStorage.getItem("jwtToken");

  const [myPrompts, setMyprompts] = useState([]);
  const [name, setName] = useState(storedNickname);
  const [isEditingPass, setEditingPass] = useState(false);
  const [nameEdit, setNameEdit] = useState("");
  const [likedPrompts, setLikedPrompts] = useState([]);
  const [chatHistorys, setChatHistorys] = useState("");
  const [isPassCheck, setPassCheck] = useState(true);
  const [isMine, setMine] = useState(true);
  const [isLike, setLike] = useState(false);
  const [isEditingProfile, setEditingProfile] = useState(false);
  const [isHistory, setHistory] = useState(false);
  const [profileImage, setProfileImage] = useState(storedProfileImage);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);

  const user_id = "test@gmail.com";

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
        .get(`https://a-hi-prompt.com/my-page/likes`)
        .then((response) => {
          console.log(response.data);

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
    const getMyPrompts = async () => {
      return await axios
        .get(`https://a-hi-prompt.com/prompt/my-page/${user_id}`)
        .then((response) => {
          setMyprompts(response.data);
        });
    };

    const getChatHistory = async () => {
      try {
        const response = await axios.get(
          "https://a-hi-prompt.com/my-page/chat",
        );
        setChatHistorys(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    const fetchData = async () => {
      await getMyPrompts();
      await getChatHistory();
    };

    fetchData();
  }, [refresh]); // Added userId as a dependency
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
              src={profileImage}
              width='100px'
              alt='my profile'
            />
            <span className='nameEmail'>
              <h2>{name != undefined ? name : "프롬프트 제작소"}</h2>
              <h4>{storedMemberId}</h4>
            </span>
          </span>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button className='editBtn' onClick={toggleEditingProfile}>
              프로필 변경
            </button>
            <button className='editBtn' onClick={toggleEditingPass}>
              비밀번호 변경
            </button>
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
              setName={setName}
              nameEdit={nameEdit}
              userId={storedMemberId}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
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
          <button
            id='chatHistory'
            onClick={() => {
              setLike(false);
              setHistory(true);
              setMine(false);
              document.getElementById("chatHistory").style.borderBottom =
                "3px solid #04364A";
              document.getElementById("mine").style.borderBottom = "none";
              document.getElementById("like").style.borderBottom = "none";
              setChatHistorys(mockData);
            }}
          >
            채팅 내역
          </button>
        </span>

        <div className='prompts'>
          {isMine ? (
            <>
              {myPrompts.map((myPrompt) => (
                <Myprompt data={myPrompt} key={myPrompt.prompt_id} />
              ))}
            </>
          ) : null}
          {isLike ? (
            <>
              {likedPrompts.map((likedPrompt) => (
                <LikedPrompt data={likedPrompt} key={likedPrompt.prompt_id} />
              ))}
              ;
            </>
          ) : null}
          {isHistory ? (
            <>
              {chatHistorys.map((chatHistory) => (
                <ChatHistory data={chatHistory} />
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
