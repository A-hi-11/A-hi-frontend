import { useState, useEffect } from "react";
import React from "react";
import { useParams } from 'react-router-dom';
import "./Signupform.css";
import Navigation from "../../Navigation";
import axios from 'axios';
const Signupform = () => {
 const params = useParams();
 // 초기값 세팅 - 아이디, 닉네임, 비밀번호, 비밀번호확인, 이메일, 전화번호, 생년월일
 const [email,setEmail] = useState(params.email)
 const [nickName, setNickName] = React.useState("");
 const [password, setPassword] = React.useState("");
 const [passwordConfirm, setPasswordConfirm] = React.useState("");
 const [profile_img, setProfile_img] = React.useState("");


 // 오류메세지 상태 저장

 const [nickNameMessage, setNickNameMessage] = React.useState("");
 const [passwordMessage, setPasswordMessage] = React.useState("");
 const [passwordConfirmMessage, setPasswordConfirmMessage] = React.useState("");
 const [profile_imgMessage, setProfile_imgMessage] = React.useState("");


 // 유효성 검사
 const [isNickName, setIsNickName] = React.useState(false);
 const [isPassword, setIsPassword] = React.useState(false);
 const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);
 const [isProfile_img, setIsProfile_img] = React.useState(false);

 const onChangeNickName = (e) => {
    const currentNickName = e.target.value;
    setNickName(currentNickName);
    if (currentNickName.length==0) {
        setNickNameMessage("");
        setIsNickName(false);
    }
    else if (currentNickName.length < 2 || currentNickName.length > 10) {
      setNickNameMessage("닉네임은 2글자 이상 10글자 이하로 입력해주세요!");
      setIsNickName(false);
    } else {
      setNickNameMessage("사용가능한 닉네임 입니다.");
      setIsNickName(true);
    }
  };

 const onChangePassword = (e) => {
   const currentPassword = e.target.value;
   setPassword(currentPassword);
   const passwordRegExp =
     /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
   if (!passwordRegExp.test(currentPassword)) {
     setPasswordMessage(
       "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
     );
     setIsPassword(false);
   } else {
     setPasswordMessage("안전한 비밀번호 입니다.");
     setIsPassword(true);
   }
 };
 const onChangePasswordConfirm = (e) => {
   const currentPasswordConfirm = e.target.value;
   setPasswordConfirm(currentPasswordConfirm);
   if (currentPasswordConfirm.length==0) {
    setPasswordConfirmMessage("");
    setIsPasswordConfirm(false);
   }
   if (password !== currentPasswordConfirm) {
     setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
     setIsPasswordConfirm(false);
   } else {
     setPasswordConfirmMessage("확인완료");
     setIsPasswordConfirm(true);
   }
 };
 const onChangeProfile_img = (e) => {
   const currentProfile_img = e.target.value;

   setProfile_img(currentProfile_img);
   
 };

 const onClickSignup = async () => {
  try {
    const res = await (axios.post("https://a-hi-prompt.com/user/signup",{
        "member_id": email,
        "password": password,
        "nickname": nickName,
        "profile_image": profile_img
    }))
    console.log(res)
  }
catch(error) {
  console.log(error);
}
}
 return (
  
    <div>
    <Navigation />
    <div className="outer">
   <div className="outerCont">
     <h3 >Sign Up</h3>
     <div className="form">
        <div className="form-el">
         <label htmlFor="email">Email</label> <br />
         <input id="email" name="email" value={email} disabled={true} />
        
       </div>
       <br/>

       <div className="form-el">
         <label htmlFor="nickName">Nick Name</label> <br />
         <input id="nickName" name="nickName" value={nickName} onChange={onChangeNickName} />
         <p className="message">{nickNameMessage}</p>
       </div>
       <div className="form-el">
         <label htmlFor="password">Password</label> <br />
         <input
           id="password"
           name="password"
           value={password}
           onChange={onChangePassword}
         />
         <p className="message">{passwordMessage}</p>
       </div>
       <div className="form-el">
         <label htmlFor="passwordConfirm">Password Confirm</label> <br />
         <input
           id="passwordConfirm"
           name="passwordConfirm"
           value={passwordConfirm}
           onChange={onChangePasswordConfirm}
         />
         <p className="message">{passwordConfirmMessage}</p>
       </div>
       <div className="form-el">
         <label htmlFor="profile_img">profile_image</label> <br/>
         <input type="file" onChange={e=>setProfile_img(e.target.files)} onClick={()=>{console.log(profile_img)}}/>
         <div className="profile_img" accept='image/*'/>
       </div>
       <br />
       <button type="button" onClick={()=>{onClickSignup()}} className="subBtn">Submit</button>
     </div>
   </div>
   </div>
   </div>
 );
};

export default Signupform;