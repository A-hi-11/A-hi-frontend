/** @format */
// ChatGPT 대화창 재사용 컴포넌트
import styles from "../pages/chat/Chat.module.css";
import { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import "./PromptStableDiffusion.css";

const PromptStableDiffusion = ({
  width,
  margin,
  fontSize,
  content,
  welcome_msg,
  prompt_id,
}) => {
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const storedJwtToken = localStorage.getItem("jwtToken");
  const [chatRoomId, setChatRoomId] = useState(-1);

  useEffect(() => {
    if (result != undefined) {
      const img = document.createElement("img");
      img.className = "quest";
      img.src = result;
      document.getElementById("msgList").appendChild(img);
      setMsg("");
    }
  }, [result]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setIsLoading(true);
        await axios
          .post(
            `https://a-hi-prompt.com/diffusion/${prompt_id}`,
            {
              prompt: "",
              model_type: "image",
              chat_room_id: -1,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + storedJwtToken,
              },
            },
          )
          .then((res) => {
            setResult(res.data.response);
            setChatRoomId(res.data.chat_room_id);
            console.log(res.data);
            setIsLoading(false);
          });
      } catch (error) {
        // Consider implementing your own error handling logic here
        console.error(error);
        alert(error.message);
      }
    };

    fetchImage();
  }, []);

  const onSendMsg = async (event) => {
    event.preventDefault();
    try {
      const li = document.createElement("li");
      li.className = styles.quest;
      li.innerText = msg;
      document.getElementById("msgList").appendChild(li);
      setIsLoading(true);
      await axios
        .post(
          `https://a-hi-prompt.com/diffusion/${prompt_id}`,
          {
            prompt: msg,
            model_type: "image",
            chat_room_id: chatRoomId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + storedJwtToken,
            },
          },
        )
        .then((res) => {
          setResult(res.data.response);
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
    <div>
      <div className={styles.main} style={{ margin }}>
        <div
          className={styles.result}
          style={{ width: width, fontSize: fontSize }}
        >
          <div id='msgList'>
            <p
              className='response'
              style={{ backgroundColor: "#4997B0", marginLeft: "0px" }}
            >
              {welcome_msg}
            </p>
            {isLoading ? (
              <Loading color='fff' pos='-15px' rightPos='335px' />
            ) : null}
          </div>
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
              style={{
                marginLeft: "10px",
                marginTop: "20px",
                padding: "0px",
                height: "60px",
              }}
              value='생성'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PromptStableDiffusion;
