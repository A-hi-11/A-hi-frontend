/** @format */

import React, { useState } from "react";
import axios from "axios";

const PassCheck = ({ setPassCheck }) => {
  const [inputPass, setInputPass] = useState("");
  const storedJwtToken = localStorage.getItem("jwtToken");

  const onPassCheck = async (e) => {
    try {
      await axios
        .put(
          "https://a-hi-prompt.com/my-page/password/check",
          {
            cur_password: inputPass,
          },
          { headers: { Authorization: "Bearer " + storedJwtToken } },
        )
        .then((res) => {
          var tempPass = res.data;
          console.log(tempPass);
          if (inputPass == "") {
            document.getElementById("passError").innerText =
              "비밀번호를 입력해주세요.";
            document.getElementById("passError").style.display = "";
          } else if (tempPass == storedJwtToken + "님 안녕하세요") {
            setPassCheck(false);
          } else {
            document.getElementById("passError").innerText =
              "비밀번호가 일치하지 않습니다.";
            document.getElementById("passError").style.display = "";
          }
        });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const onInputClick = (event) => {
    document.getElementById("passError").style.display = "none";
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setInputPass(value);
  };

  return (
    <div
      className='editInfo'
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >
      <span>
        <p style={{ fontSize: "16px", width: "max-content", margin: "0" }}>
          본인 확인을 위해 계정 비밀번호를 입력하세요
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onsubmit='return false;'
        >
          <input
            onClick={onInputClick}
            onChange={onChange}
            placeholder='비밀번호를 입력하세요'
            autoFocus
            className='formInput'
            required
            style={{ marginTop: "10px" }}
          />
          <p
            style={{
              fontSize: "12px",
              color: "red",
              width: "max-content",
              margin: "0",
              marginTop: "10px",
              animation: "fadein 0.5s",
            }}
            id='passError'
          ></p>
          <input
            type='button'
            value='확인'
            className='formBtn'
            style={{ position: "absolute", top: "565px" }}
            onClick={onPassCheck}
          />
        </div>
      </span>
    </div>
  );
};

export default PassCheck;
