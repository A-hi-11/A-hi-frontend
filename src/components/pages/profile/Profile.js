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
      <img src="img/profile_exm.png" width="100px" />
      <h2>{name}</h2>
      <button onClick={toggleEditing}>회원 정보 수정</button>
      {editing ? (
        <>
          <form className="container nweetEdit" onSubmit={onSubmit}>
            <input
              onChange={onChange}
              value={nameEdit}
              required
              placeholder="변경할 닉네임을 입력하세요"
              autoFocus
              className="formInput"
            />
            <input type="submit" value="변경" className="formBtn" />
          </form>
        </>
      ) : (
        <div />
      )}
      <h2>등록한 프롬프트 모아보기</h2>
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
  );
}

export default Profile;
