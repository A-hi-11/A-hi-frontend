import React,{useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../../assets/Strings";
import "./Create.css";
import Navigation from "../../Navigation";
import Chat from "../chat/ChatFrame";
const Create = () => {
    const navigate=useNavigate();
    const [boardList, setBoardList] = useState([]);
    const [Tags,setTags]=useState([])
    var count=0
    /*const getBoardList = async () => {
        const contents = await (await axios.get(BASE_URL)); // 2) 게시글 목록 데이터에 할당  
        setBoardList(contents.output); // 3) boardList 변수에 할당
      }*/
    /*useEffect(() => {
        getBoardList(); // 1) 게시글 목록 조회 함수 호출
    }, []);*/

    
  return (
    <div>
        <Navigation />
        <div className="submitform">
        <form action="BASE_URL" method="POST" >
        <br/>
            <h4 style={{margin:"10px"}}>프롬포트 제목</h4> <input className="name" /><br/><br/><br/>
            <h4 style={{margin:"10px"}}>프롬포트 내용</h4> <textarea className="contents"  placeholder="프롬포트 내용(명령어)을 적어주세요"/><br/><br/><br/>
            <h4 style={{margin:"10px"}}>프롬포트 설명</h4> <textarea className="explain"  placeholder="프롬포트에 대한 설명을 적어주세요"/><br/><br/><br/>
            <h4 style={{margin:"10px"}}>카테고리 </h4>
            <div>
                <label>
                <input type="radio" name="category" value="work" defaultChecked />
                <span>업무용  </span>
                </label>
                
                <label>
                <input type="radio" name="category" value="life"  />
                <span>생활  </span>
                </label>

                <label>
                <input type="radio" name="category" value="programming"  />
                <span>프로그래밍  </span>
                </label>

                <label>
                <input type="radio" name="category" value="creative"  />
                <span>창의  </span>
                </label>

                <label>
                <input type="radio" name="category" value="edu"  />
                <span>교육  </span>
                </label>

                <label>
                <input type="radio" name="category" value="guitar"  />
                <span>기타</span>
                </label>
            
            </div>
            <br/><br/><br/>
            <h4 style={{margin:"10px"}}>태그</h4> 
            <div><input className="name" placeholder="태그를 입력하세요(최대 5개)"/>
            <button type="button" className="btn" onClick={()=>{if (Tags.length<4) {setTags([...Tags,1]); console.log(Tags.length)}}}>+</button></div>

            {Tags.map(()=>{
                return (
                    <div><input className="name" placeholder="태그를 입력하세요(최대 5개)"/>
                    <button type="button" className="btn" onClick={()=>{if (Tags.length<4) {setTags([...Tags,1]); console.log(Tags.length)}}}>+</button></div>
                );
            })}
            
            <br/><br/><br/>
            <h4 style={{margin:"10px"}}>예시질문 생성</h4> 
            <div className="chat">
            <Chat />
            </div>
            <br/><br/><br/>
            <h4 style={{margin:"10px"}}>비회원 공개여부 </h4>
            <label>
                <input type="radio" name="category" value="edu" defaultChecked />
                <span>공개  </span>
                </label>

                <label>
                <input type="radio" name="category" value="guitar"  />
                <span>비공개</span>
                </label>
            <br/>
            <br/>
            <br/>
            <input className="subbtn" type="submit"/>
            <br/>
            <br/>
            <br/>
            <br/>
      </form>
      </div>
    </div>
  );
};

export default Create;