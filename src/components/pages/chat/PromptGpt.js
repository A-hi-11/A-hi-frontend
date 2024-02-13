/** @format */
// ChatGPT 대화창 재사용 컴포넌트
import styles from "./Chat.module.css";
import { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Loading";
const storedJwtToken = localStorage.getItem("jwtToken");
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const PromptGpt = ({ width, margin, fontSize, welcomeMsg, prompt_id }) => {
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState("");
  const [existLi, setExistLi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (existLi != null) {
      existLi.innerText = result;
    }
  }, [result]);

  const onSendMsg = async (event) => {
    event.preventDefault();
    const li = document.createElement("li");
    li.className = styles.quest;
    li.innerText = msg;
    const ul = document.getElementById("msgList");
    ul.appendChild(li);

    await fetch(process.env.REACT_APP_API_URL + `/gpt/use/${prompt_id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + storedJwtToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: msg,
      }),
    }).then(async (response) => {
      setMsg("");

      console.log("response body", response.body);

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      const li = document.createElement("li");
      li.className = styles.response;

      setExistLi(li);

      document.getElementById("msgList").appendChild(li);
      setMsg("");
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        let str = JSON.stringify(value);
        str = str.replace(/\n/gi, "\\r\\n");
        let json = JSON.parse(str);

        const cleanedStr = json.replace(/data:|\n/g, "").trim();

        let simpleText;
        simpleText = cleanedStr.replace(/\\r\\n/g, "").trim();
        const cleanedText = simpleText.replace(/chat_room_id:.*/, "");

        console.log("Simple Text:", cleanedText);

        setResult((prev) => prev + cleanedText);
      }
      setResult("");
      setExistLi(null);
    });
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onSendMsg(e);
    }
  };

  return (
    <div>
      <div className={styles.main} style={{ margin }}>
        <div
          className={styles.result}
          style={{ width: width, fontSize: fontSize }}
        >
          <ul id='msgList'>
            <li className={styles.response}>{welcomeMsg}</li>

            {isLoading ? (
              <Loading color='fff' pos='-15px' rightPos='335px' />
            ) : null}
          </ul>
        </div>

        <div className={styles.under} margin-top='200px'>
          <form
            onSubmit={onSendMsg}
            onKeyDown={handleOnKeyPress}
            style={{ width: width }}
          >
            <textarea
              type='text'
              name='color'
              placeholder='에이 하이에게 무엇이든 물어보세요'
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <input
              type='submit'
              value='전송'
              style={{
                marginLeft: "10px",
                marginTop: "20px",
                padding: "0px",
                height: "60px",
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PromptGpt;
