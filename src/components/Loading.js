/** @format */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Loading.css";
//Loding.js
import React from "react";
function Loading({ color, pos, rightPos }) {
  return (
    <div
      className='loading'
      style={{
        position: "fixed", // 'fixed'로 변경하여 스크롤에 영향을 받지 않도록 함
        top: `calc(50% - ${pos})`, // 예시로 50px 위로 이동
        left: `calc(50% + ${rightPos})`,
      }}
    >
      <FontAwesomeIcon
        icon={faSpinner}
        style={{ color: color, fontSize: "40px" }}
      />
    </div>
  );
}

export default Loading;
