/** @format */
// ChatGPT 대화창 재사용 컴포넌트
import { useState } from "react";
import styles from "./Chat.module.css";
import { useRef } from "react";

const Chat = ({ width, margin, fontSize, welcomeMsg }) => {
  const [colorInput, setColorInput] = useState("");
  const [result, setResult] = useState();

  const messageEndRef = useRef();

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function onSendMsg(event) {
    event.preventDefault();
    const ul = document.getElementById("msgList");
    const li = document.createElement("li");
    li.className = styles.quest;
    li.innerText = colorInput;
    ul.appendChild(li);
    scrollToBottom(messageEndRef);
  }

  function onUploadEx() {
    const ul = document.getElementById("msgList");
    const li = document.createElement("li");
    li.className = styles.quest;
    li.innerText = colorInput;
    ul.appendChild(li);
    scrollToBottom(messageEndRef);
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color: colorInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setColorInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
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
          <form onSubmit={onSendMsg} style={{ width: width }}>
            <textarea
              type='text'
              name='color'
              placeholder='에이 하이에게 무엇이든 물어보세요'
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
            />
            <input type='submit' value='전송' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
