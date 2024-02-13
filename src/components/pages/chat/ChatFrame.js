/** @format */
// ChatGPT 대화창 재사용 컴포넌트
import styles from "./Chat.module.css";
import { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Loading";

const Chat = ({ width, margin, fontSize, welcomeMsg }) => {
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef();
  const storedJwtToken = localStorage.getItem("jwtToken");

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log("result:" + result);
    if (result != undefined) {
      const li = document.createElement("li");
      li.className = styles.response;
      li.innerText = result;
      document.getElementById("msgList").appendChild(li);
      scrollToBottom(messageEndRef);
      setMsg("");
    }
  }, [result]);

  const onSendMsg = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await axios
        .post(
          "/gpt",
          {
            prompt: msg,
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

  if (isLoading) {
    return <Loading color='#04364A' pos='0px' rightPos='0px' />;
  }

  return (
    <div>
      <div className={styles.main} style={{ margin }}>
        <div
          className={styles.result}
          style={{ width: width, fontSize: fontSize }}
        >
          <ul id='msgList'>
            <li className={styles.response}>{welcomeMsg}</li>
          </ul>
          <div ref={messageEndRef}></div>
        </div>

        <div className={styles.under} margin-top='200px'>
          <form
            onSubmit={onSendMsg}
            style={{ width: width }}
            onKeyDown={handleOnKeyPress}
          >
            <textarea
              type='text'
              name='color'
              placeholder='에이 하이에게 무엇이든 물어보세요'
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <input type='submit' value='전송' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
