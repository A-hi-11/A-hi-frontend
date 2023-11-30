/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios"; // axios 라이브러리 추가

function EditProfile({
  setName,
  setEditingProfile,
  userId,
  profileImage,
  setProfileImage,
  setRefresh,
}) {
  const [newImg, setNewImg] = useState("");
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
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // 이미지 변경 API 호출
    console.log(newImg);

    if (newImg) {
      const handleUpload = async () => {
        try {
          const formData = new FormData();
          formData.append("profileImage", newImg);
          await axios
            .put("https://a-hi-prompt.com/my-page/image", {
              body: formData,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log("Upload successful:", res.data);
            });
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };
    }

    // 닉네임 변경 API 호출
    if (nameEdit) {
      try {
        await axios.put(`https://a-hi-prompt.com/my-page/nickname`, {
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

  return (
    <div className='editInfo'>
      <form onSubmit={onSubmit} id='editForm'>
        {/* 이미지 업로드 부분 */}
        <div style={{ display: "inline-flex" }}>
          <img
            className='profilePic'
            src={newImg ? URL.createObjectURL(newImg) : ""}
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
