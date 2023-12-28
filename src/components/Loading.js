/** @format */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Loading.css";
import React from "react";
function Loading({ color, pos, rightPos }) {
  return (
    <div
      className='loading'
      style={{
        position: "fixed",
        top: `calc(50% - ${pos})`,
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
