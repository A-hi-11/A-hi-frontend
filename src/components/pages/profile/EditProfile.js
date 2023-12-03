/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios"; // axios 라이브러리 추가

function EditProfile({
  setStoredNickname,
  setEditingProfile,
  userId,
  storedProfileImage,
  setStoredProfileImage,
  setRefresh,
}) {
  const [newImg, setNewImg] = useState("");
  const [nowImg, setNowImg] = useState(storedProfileImage);
  const [nameEdit, setNameEdit] = useState("");
  useEffect(() => {
    setNewImg(newImg);
  }, [newImg]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNameEdit(value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setNewImg(selectedFile);
    // 이미지 미리보기
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageUrl = event.target.result;
      console.log(imageUrl);
      setNowImg(imageUrl);
    };

    reader.readAsDataURL(selectedFile);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // 이미지 변경 API 호출
    console.log(newImg);
    const urlParams = new URLSearchParams(window.location.search);
    if (newImg) {
      try {
        const formData = new FormData();
        await formData.append("profileImage", newImg);
        console.log(formData);

        await axios
          .put("https://a-hi-prompt.com/my-page/image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            alert("프로필 이미지 변경이 완료되었습니다.");
            console.log(res.data);
            localStorage.setItem("profileImage", res.data);
            setStoredProfileImage(res.data);
          });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // 닉네임 변경 API 호출
    if (nameEdit) {
      try {
        await axios
          .put(
            `https://a-hi-prompt.com/my-page/nickname`,
            {
              new_nickname: nameEdit,
            },
            {
              headers: { "Content-Type": "application/json" },
            },
          )
          .then((res) => {
            alert("닉네임 변경이 완료되었습니다.");
            localStorage.setItem("nickname", res.data);
            setStoredNickname(res.data);
          });
      } catch (error) {
        console.error("Error :", error);
      }
    }

    // 상태 초기화
    setEditingProfile(false);
    setRefresh((refresh) => refresh * -1);
  };

  return (
    <div className='editInfo'>
      <form onSubmit={onSubmit} id='editForm'>
        {/* 이미지 업로드 부분 */}
        <div style={{ display: "inline-flex" }}>
          <img
            className='profilePic'
            src={nowImg}
            width='100px'
            alt='프로필사진'
          />

          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            style={{
              alignSelf: "center",
              fontSize: "12px",
              fontWeight: "normal",
              padding: "2px 6px",
              width: "120px",
              height: "30px",
            }}
            className='formBtn'
          />
        </div>

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

        <span className='content' style={{ marginLeft: "34%" }}>
          <input type='submit' value='변경' className='formBtn' />
        </span>
      </form>
    </div>
  );
}

export default EditProfile;
