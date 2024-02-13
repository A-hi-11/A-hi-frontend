/** @format */

import { useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Stablediffusion.css";
import axios from "axios";
import Loading from "../Loading";

const Stablediffusion = () => {
  const [result, setResult] = useState();
  const [imageInput, setImageInput] = useState("");
  const [negativeInput, setNegativeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const storedJwtToken = localStorage.getItem("jwtToken");
  const storedMemberId = localStorage.getItem("memberId");

  function onChange(e) {
    setImageInput(e.target.value);
  }

  function onChangeNegative(e) {
    setNegativeInput(e.target.value);
  }

  async function generateImage(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      console.log({
        prompt: imageInput,
        negative: negativeInput,
        member_id: storedMemberId,
        model_type: "image",
        chat_room_id: -1,
      });
      const response = await axios.post(
        "/diffusion",

        {
          prompt: imageInput,
          negative: negativeInput,
          member_id: storedMemberId,
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
      setImageInput("");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert(error.message);
    }
  }

  return (
    <div className='imagePromptContainer'>
      <img
        src='logo.png'
        width={"70px"}
        style={{ margin: "0px", marginTop: "30px" }}
      />
      <h3>안녕 AI</h3>
      <h2>에이-하이</h2>
      <div className='promptbox'>
        <p style={{ margin: "0" }}>프롬프트</p>
      </div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <textarea
          required
          className='ImagePrompt'
          onChange={onChange}
        ></textarea>
        <div className='promptbox'>
          <p style={{ margin: "0" }}>부정 프롬프트</p>
        </div>
        <textarea
          className='ImagePrompt'
          onChange={onChangeNegative}
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
};

export default Stablediffusion;
