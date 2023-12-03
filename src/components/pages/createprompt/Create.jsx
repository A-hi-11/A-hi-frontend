import React,{useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../../assets/Strings";
import "./Create.css";
import Navigation from "../../Navigation";
import Chat from "../chat/Chat";
//import cookie from 'react-cookies';
const Create = () => {
    const [tags,setTags]=useState([])
    const [exms,setExms]=useState([])
    const [kind,setKind]=useState("text")
    const [exm1,setExm1]=useState(false)
    const [exm2,setExm2]=useState(false)
    //post할 원소들
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [content,setContent]=useState("")

    const [cate,setCate]=useState("etc")
    const [permission,setPermission]=useState(true) // useState("yes") -> useState(true) 로 변경함.
    const [useWelcomeM,setUseWelcomeM]=useState("yes")
    const [welcomeM,setWelcomeM]=useState("")
    const [example,setExample]=useState("")
    const [tagCont,setTagCont]=useState(["","","","",""])
    const storedJwtToken = localStorage.getItem("jwtToken")



    const handleSubmit = async () => {

      try {
        const res = await (axios.post("https://a-hi-prompt.com/prompt/create",{
          "member_id": "test@gmail.com",
          "title": title,
          "description": desc,
          "content": content,
          "mediaType": kind,
          "category": cate,
          "permission": permission,
          "welcome_message": welcomeM,
          "example": [
            [
                {
                    "message": "test msg1",
                    "question": true,
                    "chat_order": 0
                },
                {
                    "message": "test msg2",
                    "question": false,
                    "chat_order": 0
                }
            ],
            [
                {
                    "message": "1 test msg1",
                    "question": true,
                    "chat_order": 1
                },
                {
                    "message": "2 test msg2",
                    "question": false,
                    "chat_order": 1
                },
                {
                    "message": "3 test msg3",
                    "question": true,
                    "chat_order": 1
                },
                {
                    "message": "4 test msg4",
                    "question": false,
                    "chat_order": 1
                }
            ]
        ],
          "tags": tagCont,
          "gptConfigInfo": {
          "model_name": "gpt-3",
          "temperature": 0.7,
          "maximum_length": 200,
          "stop_sequence": "\\n",
          "top_p": 0.9,
          "frequency_penalty": 0.2,
          "presence_penalty": 0.6
          }
        },{
          headers:{Authorization: "Bearer " + storedJwtToken},
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
        <div className="submitform">

        <br/>
          <ul className="kindForm">
            <div className={"kind"+(kind=="text" ? "active" : "")} onClick={()=>{setKind("text");}}>chatGPT</div>
            <div className={"kind"+(kind=="image" ? "active" : "")} onClick={()=>{setKind("image")}}>Image</div>
            </ul>
            <br/>
            <h4 style={{margin:"10px"}}>프롬프트 제목</h4> <input onChange={e=>setTitle(e.target.value)} className="name" required/><br/><br/><br/>
            <h4 style={{margin:"10px"}}>프롬프트 내용</h4> <textarea onChange={e=>setContent(e.target.value)} className="contents"  placeholder="프롬프트 내용(명령어)을 적어주세요" required/><br/><br/><br/>
            <h4 style={{margin:"10px"}}>프롬프트 설명</h4> <textarea onChange={e=>setDesc(e.target.value)} className="explain"  placeholder="프롬프트에 대한 설명을 적어주세요" required/><br/><br/><br/>
            <h4 style={{margin:"10px"}}>시작 메세지</h4>
            <ul className="kindForm">
              <div className={"kind"+(useWelcomeM=="yes" ? "active" : "")} onClick={()=>{setUseWelcomeM("yes");}}>사용</div>
              <div className={"kind"+(useWelcomeM=="no" ? "active" : "")} onClick={()=>{setUseWelcomeM("no")}}>사용 안함</div>
            </ul>
            {useWelcomeM=="yes"?<textarea onChange={e=>setWelcomeM(e.target.value)} className="explain"  placeholder="시작 메세지를 적어주세요" required/>
              :""}
            <br/><br/><br/>
            <h4 style={{margin:"10px"}}>카테고리 </h4>
            <ul className="kindForm">
              <div className={"kind"+(cate=="etc" ? "active" : "")} onClick={()=>{setCate("etc")}}>기타</div>    
              <div className={"kind"+(cate=="task"||cate=="human" ? "active" : "")} onClick={()=>{kind=="text"?setCate("task"):setCate("human")}}>{kind=="text"?"업무용":"인물"}</div>
              <div className={"kind"+(cate=="life"||cate=="animal" ? "active" : "")} onClick={()=>{kind=="text"?setCate("life"):setCate("animal")}}>{kind=="text"?"생활":"동물"}</div>  
              <div className={"kind"+(cate=="programming"||cate=="sight" ? "active" : "")} onClick={()=>{kind=="text"?setCate("programming"):setCate("sight")}}>{kind=="text"?"프로그래밍":"풍경"}</div>  
              <div className={"kind"+(cate=="creative"||cate=="obj" ? "active" : "")} onClick={()=>{kind=="text"?setCate("creative"):setCate("obj")}}>{kind=="text"?"창의":"사물"}</div>  
              <div className={"kind"+(cate=="edu"||cate=="character" ? "active" : "")} onClick={()=>{kind=="text"?setCate("edu"):setCate("character")}}>{kind=="text"?"교육":"캐릭터"}</div>  
            </ul>
            <br/><br/><br/>
            <h4 style={{margin:"10px"}}>태그</h4> 
            <div><input className="name" onChange={e => {let newArr=[...tagCont]; newArr[0]=e.target.value; setTagCont(newArr);console.log(tagCont)}} placeholder="태그를 입력하세요(최대 5개)"/>
            <button type="button" className="btn" onClick={()=>{if (tags.length<4) {setTags([...tags,1])}}}>+</button></div>

            {tags.map(()=>{
                return (
                    <div><input id={tags.length} className="name" onChange={e => {let newArr=[...tagCont]; newArr[e.target.id]=e.target.value; setTagCont(newArr);console.log(tagCont)}} placeholder="태그를 입력하세요(최대 5개)"/>
                    <button type="button" className="btn" onClick={()=>{if (tags.length<4) {setTags([...tags,1])}}}>+</button></div>
                );
            })}
            
            <br/><br/><br/>
            <h4 style={{margin:"10px"}}>예시질문 생성 (최대 2개)</h4>
            {kind=="text" ? <div className="chat"><Chat/></div> : ""}
            <br/>
            <button type="button" className="exmBtn" onClick={()=>{if (exms.length<2) {setExms([...exms,exms.length+1])}}}>예시 생성</button>
            <div className="exmList">
            {exms.map((i)=>{
              return (
                <div className="exm">사용예시{i}
                <div className="view" onClick={()=>{if (i==1) {setExm1(true)} else {setExm2(true)}}}>상세보기</div>
                <div className="delete" onClick={()=>{exms.pop();setExms([...exms])}}>삭제</div>
                </div>
              )
            })}
            </div>
            {exm1 ? <div className="exmChat" onClick={()=>{setExm1(false); setExm2(false)}}><Chat/></div> : ""}
            {exm2 ? <div className="exmChat" onClick={()=>{setExm1(false); setExm2(false)}}><Chat/></div> : ""}
            <br/><br/>
            <h4 style={{margin:"10px"}}>비회원 공개여부 </h4>
            <ul className="kindForm">
              <div className={"kind"+(permission==true ? "active" : "")} onClick={()=>{setPermission(true);}}>공개</div>
              <div className={"kind"+(permission==false ? "active" : "")} onClick={()=>{setPermission(false)}}>비공개</div>
            </ul>

            <br/>
            <br/>
            <br/>
            <input className="subBtn" type="button" value="제출" onClick={()=>handleSubmit()}/>
            <br/>
            <br/>
            <br/>
            <br/>

      </div>
    </div>
  );
};

export default Create;