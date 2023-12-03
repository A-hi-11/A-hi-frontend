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
}) => {
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef();
  const [chatRoomId, setChatRoomId] = useState(-1);
  const storedJwtToken = localStorage.getItem("jwtToken");

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log("result:" + result);
    if (result != undefined) {
      // setResult(data.answer);
      const img = document.createElement("img");
      img.className = "quest";
      img.src = result;
      document.getElementById("msgList").appendChild(img);
      scrollToBottom(messageEndRef);
      setMsg("");
    }
  }, [result]);

  useEffect(() => {
    setIsLoading(true);
    console.log(JSON.stringify({ prompt: msg }));
    const getStableImage = async () => {
      await axios
        .post(
          "https://a-hi-prompt.com/diffusion",
          {
            prompt: content,
            member_id: "test@gmail.com",
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
          setChatRoomId(res.chat_room_id);
          console.log(result);
          setIsLoading(false);
        });
    };

    const fetchData = async () => {
      await getStableImage();
    };

    fetchData();
  }, []);

  const onSendMsg = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await axios
        .post(
          "https://a-hi-prompt.com/diffusion",
          {
            prompt: msg,
            member_id: "test@gmail.com",
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
          console.log(result);
          setIsLoading(false);
        });

      // if (response.status !== 200) {
      //   throw new Error(`Request failed with status ${response.status}`);
      // }
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onSendMsg(e); // Enter 입력이 되면 클릭 이벤트 실행
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
          <div ref={messageEndRef}></div>
        </div>

        <div className={styles.under} margin-top='200px'>
          <form onSubmit={onSendMsg} style={{ width: width }}>
            <textarea
              type='text'
              name='color'
              placeholder='에이 하이에게 무엇이든 물어보세요'
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <input type='submit' value='생성' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PromptStableDiffusion;
