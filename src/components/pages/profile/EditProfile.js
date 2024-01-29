/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

const EditProfile = ({
  setStoredNickname,
  setEditingProfile,
  storedProfileImage,
  setStoredProfileImage,
  setRefresh,
}) => {
  const [newImg, setNewImg] = useState("");
  const [nowImg, setNowImg] = useState(storedProfileImage);
  const [nameEdit, setNameEdit] = useState("");
  const storedJwtToken = localStorage.getItem("jwtToken");

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

    if (newImg) {
      try {
        const formData = new FormData();
        formData.append("profileImage", newImg);

        await axios
          .put("https://a-hi-prompt.com/my-page/image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + storedJwtToken,
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

    if (nameEdit) {
      try {
        await axios
          .put(
            `https://a-hi-prompt.com/my-page/nickname`,
            {
              new_nickname: nameEdit,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + storedJwtToken,
              },
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

    setEditingProfile(false);
    setRefresh((refresh) => refresh * -1);
  };

  return (
    <div className='editInfo'>
      <form onSubmit={onSubmit} id='editForm'>
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
};

export default EditProfile;
