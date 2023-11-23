/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios"; // axios 라이브러리 추가

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
  setRefresh,
}) {
  const [newPassword, setNewPassword] = useState(""); // 새로운 비밀번호 상태 추가
  const [newImg, setNewImg] = useState("");

  useEffect(() => {
    console.log("new img");
    setUploadedImage(newImg);
  }, [newImg]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNameEdit(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // 이미지 변경 API 호출
    if (newImg) {
      try {
        console.log(newImg);
        console.log(newImg.type);

        const response = await axios.put(
          `http://43.201.240.250:8080/my-page/image`,
          { new_profileImg: newImg },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        // API에서 반환한 이미지 URL 사용 (response.data.imageUrl 예시)
        const imageUrl = response.data.imageUrl;
        // 나머지 로직...
      } catch (error) {
        console.error("Error :", error);
      }
    }

    // 닉네임 변경 API 호출
    if (nameEdit) {
      try {
        await axios.put(`http://43.201.240.250:8080/my-page/nickname`, {
          new_nickname: nameEdit,
        });
        alert("닉네임 변경이 완료되었습니다.");
      } catch (error) {
        console.error("Error :", error);
      }
    }

    // 비밀번호 변경 API 호출
    if (newPassword) {
      try {
        await axios.put(`http://localhost:8080/my-page/password/update`, {
          new_password: newPassword,
        });
        alert("비밀번호 변경이 완료되었습니다.");
      } catch (error) {
        console.error("Error :", error);
      }
    }

    // 상태 초기화
    setEditing(false);
    setName(nameEdit);
    setNewPassword("");
    setUploadedImage(newImg);
    setRefresh((refresh) => refresh * -1);
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setNewImg(imageUrl);
    setUploadedImage(newImg);
  };

  return (
    <div className='editInfo'>
      {/* 이미지 업로드 부분 */}
      <div style={{ display: "inline-flex" }}>
        <img
          className='profilePic'
          src={uploadedImage}
          width='100px'
          alt='프로필사진'
        />

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

      {/* 폼 부분 */}
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
