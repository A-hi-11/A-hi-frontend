/** @format */

import React, { useState } from "react";

const PassCheck = ({ password, setPassCheck }) => {
  const [inputPass, setInputPass] = useState("");
  const onPassCheck = (e) => {
    if (inputPass == password) {
      setPassCheck(false);
    } else {
      document.getElementById("passError").innerText =
        "옳은 비밀 번호가 아닙니다.";
      document.getElementById("passError").style.display = "";
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
        height: "23%",
      }}
    >
      <span>
        <p style={{ fontSize: "16px", width: "max-content", margin: "0" }}>
          본인 확인을 위해 계정 비밀번호를 입력하세요
        </p>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            onClick={onInputClick}
            onChange={onChange}
            placeholder='비밀번호를 입력하세요'
            autoFocus
            className='formInput'
            required
            style={{ marginBottom: "13px" }}
          />
          <p
            style={{
              fontSize: "12px",
              color: "red",
              width: "max-content",
              margin: "0",
              animation: "fadein 0.5s",
            }}
            id='passError'
          ></p>
          <input
            type='button'
            value='확인'
            className='formBtn'
            style={{ position: "absolute", top: "538px" }}
            onClick={onPassCheck}
          />
        </form>
      </span>
    </div>
  );
};

export default PassCheck;
