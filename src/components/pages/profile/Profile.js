import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Myprompt from "./Myprompt";
import "./Profile.css";

function Profile() {
  const [myPrompts, setMyprompts] = useState([]);
  const userId = 2; //임시 사용자 id
  const [name, setName] = useState();
  const [editing, setEditing] = useState(false);
  const [nameEdit, setNameEdit] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const getName = async () => {
      await axios
        .get(`http://localhost:3001/User/${userId}`)
        .then((res) => setName(res.data.name));
    };

    const getMyPrompts = async () => {
      await axios
        .get("http://localhost:3001/MyPrompts")
        .then((res) => setMyprompts(res.data));
    };

    getName();
    getMyPrompts();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsPending(true);

    let newName = { name: nameEdit };

    fetch(`http://localhost:3001/User/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newName),
    })
      .then(() => {
        console.log("new name added");
        setIsPending(false);
      })
      .catch((error) => console.error("Error :", error));
    setEditing(false);
    setName(nameEdit);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNameEdit(value);
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  return (
    <div className="container">
      <div display="inline-flex">
        <div className="info">
          <span className="innerInfo">
            <img
              className="profilePic"
              src="img/profile_exm.png"
              width="100px"
            />
            <span className="nameEmail">
              <h2>{name}</h2>
              <h4>mail@gmail.com</h4>
            </span>
          </span>
          <button className="editBtn" onClick={toggleEditing}>
            정보 수정
          </button>
        </div>
        {editing ? (
          <>
            <form className="editInfo" onSubmit={onSubmit}>
              <span className="content">
                <p>닉네임</p>
                <input
                  onChange={onChange}
                  value={nameEdit}
                  required
                  placeholder="변경할 닉네임을 입력하세요"
                  autoFocus
                  className="formInput"
                />
              </span>
              <span className="content">
                <p>비밀번호</p>
                <input
                  onChange={onChange}
                  value={nameEdit}
                  required
                  placeholder="변경할 비밀번호를 입력하세요"
                  autoFocus
                  className="formInput"
                />
              </span>
              <input type="submit" value="변경" className="formBtn" />
            </form>
          </>
        ) : (
          <div />
        )}
      </div>
      <div className="rightSide">
        <span className="menu">
          <p>나의 프롬프트</p>
          <p>좋아요</p>
          <p>채팅 내역</p>
        </span>

        <div className="prompts">
          {myPrompts.map((myPrompt) => (
            <Myprompt
              title={myPrompt.title}
              key={myPrompt.id}
              id={myPrompt.id}
              date={myPrompt.date}
              description={myPrompt.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
