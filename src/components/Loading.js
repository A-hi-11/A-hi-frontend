/** @format */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Loading.css";
//Loding.js
import React from "react";
function Loading() {
  return (
    <div
      className='loading'
      style={{
        margin: "500px",
        position: "absolute",
        right: "13rem",
        bottom: "-50px",
      }}
    >
      <FontAwesomeIcon
        icon={faSpinner}
        style={{ color: "#04364a", fontSize: "40px" }}
      />
    </div>
  );
}

export default Loading;
