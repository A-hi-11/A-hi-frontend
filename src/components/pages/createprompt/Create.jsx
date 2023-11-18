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
    const [tags,setTags]=useState([])
    const [exms,setExms]=useState([])
    const [kind,setKind]=useState(1)
    const [exm1,setExm1]=useState(false)
    const [exm2,setExm2]=useState(false)
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
          <ul className="kindForm">
            <div className={"kind"+(kind==1 ? "active" : "")} onClick={()=>{setKind(1);}}>chatGPT</div>
            <div className={"kind"+(kind==2 ? "active" : "")} onClick={()=>{setKind(2)}}>Image</div>
            </ul>
            <br/>
            <h4 style={{margin:"10px"}}>프롬포트 제목</h4> <input className="name" /><br/><br/><br/>
            <h4 style={{margin:"10px"}}>프롬포트 내용</h4> <textarea className="contents"  placeholder="프롬포트 내용(명령어)을 적어주세요"/><br/><br/><br/>
            <h4 style={{margin:"10px"}}>프롬포트 설명</h4> <textarea className="explain"  placeholder="프롬포트에 대한 설명을 적어주세요"/><br/><br/><br/>
            <h4 style={{margin:"10px"}}>카테고리 </h4>
            <label>
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
            </label>
            <br/><br/><br/>
            <h4 style={{margin:"10px"}}>태그</h4> 
            <div><input className="name" placeholder="태그를 입력하세요(최대 5개)"/>
            <button type="button" className="btn" onClick={()=>{if (tags.length<4) {setTags([...tags,1])}}}>+</button></div>

            {tags.map(()=>{
                return (
                    <div><input className="name" placeholder="태그를 입력하세요(최대 5개)"/>
                    <button type="button" className="btn" onClick={()=>{if (tags.length<4) {setTags([...tags,1])}}}>+</button></div>
                );
            })}
            
            <br/><br/><br/>
            <h4 style={{margin:"10px"}}>예시질문 생성 (최대 2개)</h4>
            {kind==1 ? <div className="chat"><Chat/></div> : ""}
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
            <label>
                <label>
                <input type="radio" name="open" value="open" defaultChecked />
                <span>공개  </span>
                </label>

                <label>
                <input type="radio" name="open" value="private"  />
                <span>비공개</span>
                </label>
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