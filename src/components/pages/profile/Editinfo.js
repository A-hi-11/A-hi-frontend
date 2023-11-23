/** @format */

import React from "react";

function EditInfo({
  setName,
  setNameEdit,
  setEditing,
  setPassEdit,
  nameEdit,
  userId,
  passEdit,
  uploadedImage,
  setUploadedImage,
}) {
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNameEdit(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    let newName = { last_name: nameEdit };

    fetch(`http://localhost:3001/User/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newName),
    })
      .then(() => {
        alert("닉네임 변경이 완료되었습니다.");
      })
      .catch((error) => console.error("Error :", error));
    setEditing(false);
    setName(nameEdit);
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  return (
    <div className='editInfo'>
      <div style={{ display: "inline-flex" }}>
        {uploadedImage ? (
          <img src={uploadedImage} alt='프로필 없을때' />
        ) : (
          <img
            className='profilePic'
            src='img/profile_exm.png'
            width='100px'
            alt='프로필사진'
          />
        )}
        <input
          type='file'
          accept='image/gif, image/jpeg, image/png'
          onChange={onChangeImage}
          style={{
            alignSelf: "center",
            fontSize: "12px",
            fontWeight: "normal",
            padding: "2px 6px",
          }}
          className='formBtn'
        />
      </div>
      <form onSubmit={onSubmit}>
        <span className='content'>
          <p>닉네임</p>
          <input
            onChange={onChange}
            value={nameEdit}
            placeholder='변경할 닉네임을 입력하세요'
            autoFocus
            className='formInput'
          />
        </span>
        <span className='content'>
          <p>비밀번호</p>
          <input
            value={passEdit}
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
