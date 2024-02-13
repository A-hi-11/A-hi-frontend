/** @format */

import React, { useState } from "react";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function EditInfo({ setEditingPass, setRefresh }) {
  const [newPassword, setNewPassword] = useState("");
  const storedJwtToken = localStorage.getItem("jwtToken");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (newPassword) {
      try {
        await axios.put(
          `/my-page/password/update`,
          {
            new_password: newPassword,
          },
          {
            headers: {
              Authorization: "Bearer " + storedJwtToken,
            },
          },
        );
        alert("비밀번호 변경이 완료되었습니다.");
      } catch (error) {
        console.error("Error :", error);
      }
    }

    setEditingPass(false);

    setNewPassword("");

    setRefresh((refresh) => refresh * -1);
  };

  return (
    <div className='editInfo'>
      <form onSubmit={onSubmit}>
        <span className='content' style={{ marginTop: "25%" }}>
          <p>비밀번호</p>
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            placeholder='변경할 비밀번호를 입력하세요'
            autoFocus
            className='formInput'
          />
        </span>
        <span className='content' style={{ marginLeft: "34%" }}>
          <input type='submit' value='변경' className='formBtn' />
        </span>
      </form>
    </div>
  );
}

export default EditInfo;
