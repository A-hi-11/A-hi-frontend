/** @format */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../chat/Chat.module.css";
import { BiSolidConversation } from "react-icons/bi";
import { useRef } from "react";
import axios from "axios";
import Loading from "../../Loading";
import Navigation from "../../Navigation";
import "../../stablediffusion/PromptStableDiffusion.css";
import { useLocation } from "react-router-dom";

export default function ChatDetail() {
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [chatList, setChatList] = useState([]);
  const messageEndRef = useRef();
  const { chat_room_id } = useParams();
  const navigate = useNavigate();
  const storedJwtToken = localStorage.getItem("jwtToken");

  const [options, setOptions] = useState({
    mode: "text-davinci-002",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    stop_sequences: "",
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (result != undefined) {
      const li = document.createElement("li");
      li.className = styles.response;
      li.innerText = result;
      document.getElementById("msgList").appendChild(li);
      scrollToBottom(messageEndRef);
      setMsg("");
    }
  }, [result]);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        setIsLoading(true);
        await axios
          .get(`https://a-hi-prompt.com/my-page/chat/read/${chat_room_id}`, {
            headers: {
              Authorization: "Bearer " + storedJwtToken,
            },
          })
          .then((response) => {
            setChatList(response.data);
            console.log(chatList);
            setIsLoading(false);
          });
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };

    fetchChatList();
  }, []);

  const onClickDelete = async () => {
    try {
      await axios
        .delete(`https://a-hi-prompt.com/my-page/chat/${chat_room_id}`, {
          headers: {
            Authorization: "Bearer " + storedJwtToken,
          },
        })
        .then(() => {
          alert("채팅 내역이 삭제 되었습니다.");
          console.log(" button clicked!");
          navigate(-1);
        });
    } catch {
      console.error("Delete Chat Error");
    }
  };

  const onSendMsg = async (event) => {
    event.preventDefault();
    try {
      const li = document.createElement("li");
      li.className = styles.quest;
      li.innerText = msg;
      document.getElementById("msgList").appendChild(li);
      scrollToBottom(messageEndRef);
      setIsLoading(true);
      await axios
        .post(
          `https://a-hi-prompt.com/gpt/${chat_room_id}`,
          {
            prompt: msg,
            gptConfigInfo: {
              model_name: "gpt-3.5-turbo",
              temperature: 0.7,
              maximum_length: 200,
              stop_sequence: "\\n",
              top_p: 0.9,
              frequency_penalty: 0.2,
              presence_penalty: 0.6,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + storedJwtToken,
            },
          },
        )
        .then((res) => {
          setResult(res.data.answer);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onSendMsg(e);
    }
  };

  return (
    <div
      className={styles.chatContainer}
      style={{
        marginLeft: "0",
        height: "max-content",
      }}
    >
      <Navigation />
      <div className={styles.main}>
        <div className={styles.title}>
          <BiSolidConversation size='40px' color='#4997B0' />
          <h2>안녕 AI</h2>
          <h3>에이-하이</h3>
        </div>
        <div className={styles.gptMenu}></div>
        <button
          className='editBtn'
          style={{
            marginLeft: "50%",
            fontSize: "14px",
            width: "100px",
            marginBottom: "10px",
          }}
          onClick={onClickDelete}
        >
          채팅 내역 삭제
        </button>
        {isLoading ? <Loading color='white' pos='0px' rightPos='0px' /> : null}
        <div className={styles.result}>
          <ul id='msgList'>
            {chatList.map((chat, chatIndex) =>
              chat.content != "" ? (
                <>
                  {chat.content.startsWith("http") ? (
                    <>
                      <img src={chat.content} className='quest' />
                    </>
                  ) : (
                    <li
                      key={chatIndex}
                      className={chat.question ? styles.quest : styles.response}
                      style={{ maxWidth: "400px" }}
                    >
                      {chat.content != "" ? chat.content : null}
                    </li>
                  )}
                </>
              ) : null,
            )}
          </ul>
          <div ref={messageEndRef}></div>
        </div>

        <div className={styles.under}>
          <form onSubmit={onSendMsg} onKeyDown={handleOnKeyPress}>
            <textarea
              type='text'
              name='color'
              placeholder='에이 하이에게 무엇이든 물어보세요'
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              required
            />
            <input type='submit' value='전송' />
          </form>
        </div>
      </div>
    </div>
  );
}
