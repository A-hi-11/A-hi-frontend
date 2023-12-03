/** @format */

import { useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Stablediffusion.css";
import axios from "axios";
import Loading from "../Loading";

export default function Stablediffusion() {
  const [result, setResult] = useState();
  const [imageInput, setImageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const storedJwtToken = localStorage.getItem("jwtToken");
  const storedMemberId = localStorage.getItem("memberId");

  function onChange(e) {
    setImageInput(e.target.value);
  }

  async function generateImage(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      console.log({
        prompt: imageInput,
        member_id: storedMemberId !== null ? storedMemberId : "test@gmail.com",
        chat_room_id: -1,
      });
      const response = await axios.post(
        "https://a-hi-prompt.com/diffusion",

        {
          prompt: imageInput,
          member_id:
            storedMemberId !== null ? storedMemberId : "test@gmail.com",
          model_type: "image",
          chat_room_id: -1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + storedJwtToken,
          },
        },
      );

      const data = response.data.response;
      console.log(data);
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data);
      console.log(result);
      setImageInput("");
      setIsLoading(false);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      generateImage(e);
    }
  };

  return (
    <div className='imagePromptContainer'>
      <div className='promptbox'>
        <p style={{ margin: "0" }}>프롬프트</p>
      </div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <textarea
          className='ImagePrompt'
          onChange={onChange}
          onKeyDown={handleOnKeyPress}
        ></textarea>
        <button onClick={generateImage} type='button' className='imageBtn'>
          생성하기{" "}
          <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#04364a" }} />
        </button>
      </form>
      {isLoading ? <Loading color='#04364A' pos='55px' rightPos='0px' /> : null}
      <div className='promptbox' style={{ marginLeft: "3px" }}>
        <p style={{ margin: "0" }}>생성 결과</p>
      </div>
      <div className='resultBox'>
        <img src={result} style={{ width: "500px" }}></img>
      </div>
    </div>
  );
}
