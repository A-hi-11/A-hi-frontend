/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios"; // axios 라이브러리 추가

function EditProfile({
  setName,
  setNameEdit,
  setEditingProfile,
  nameEdit,
  userId,
  profileImage,
  setProfileImage,
  setRefresh,
}) {
  const [newImg, setNewImg] = useState(profileImage);

  useEffect(() => {
    setNewImg(newImg);
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

        const response = await axios
          .put(
            `http://43.201.240.250:8080/my-page/image`,
            { new_profileImg: newImg },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          )
          .then(() => {
            setRefresh((refresh) => refresh * -1);
          });
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

    // 상태 초기화
    setEditingProfile(false);
    setName(nameEdit);
    setProfileImage(newImg);
    setRefresh((refresh) => refresh * -1);
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setNewImg(imageUrl);
    console.log(newImg);
  };

  return (
    <div className='editInfo'>
      {/* 이미지 업로드 부분 */}
      <div style={{ display: "inline-flex" }}>
        <img
          className='profilePic'
          src={newImg}
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
            width: "120px",
            height: "30px",
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

        <span className='content' style={{ marginLeft: "34%" }}>
          <input type='submit' value='변경' className='formBtn' />
        </span>
      </form>
    </div>
  );
}

export default EditProfile;
