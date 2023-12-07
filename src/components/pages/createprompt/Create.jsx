import React,{useEffect, useState, useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../../assets/Strings";
import "./Create.css";
import Navigation from "../../Navigation";
import cookie from 'react-cookies';
import Loading from "../../Loading";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Create = () => {
    const ref1=useRef()
    const ref2=useRef()
    const [tags,setTags]=useState(0)
    const [exms,setExms]=useState([])
    const [kind,setKind]=useState("text")
    const [exm1,setExm1]=useState(false)
    const [exm2,setExm2]=useState(false)
    //post할 원소들
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [content,setContent]=useState("")

    const [cate,setCate]=useState("etc")
    const [permission,setPermission]=useState(true)
    const [useWelcomeM,setUseWelcomeM]=useState("yes")
    const [welcomeM,setWelcomeM]=useState("")
    const [example,setExample]=useState("")
    const [tag1,setTag1]=useState("")
    const [tag2,setTag2]=useState("")
    const [tag3,setTag3]=useState("")
    const [tag4,setTag4]=useState("")
    const [tag5,setTag5]=useState("")
    const storedJwtToken = localStorage.getItem("jwtToken");
    const loginStatus = localStorage.getItem("memberId");
    const handleSubmit = async () => {

      try {
        const res = await (axios.post("https://a-hi-prompt.com/prompt/create",{
          
            headers : {
              Authorization: "Bearer " + storedJwtToken
          },
          
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
          "tags": [tag1,tag2,tag3,tag4,tag5],
          "gptConfigInfo": {
            options
          }
        }))
        console.log(res)
      }
    catch(error) {
      console.log(error);
    }
    }
    //chat 부분
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const messageEndRef = useRef();
  const [sendResult1,setSendResult1]=useState([]);
  const [sendResult2,setSendResult2]=useState([]);
  const [options, setOptions] = useState({
    model_name: "gpt-3.5-turbo",
    temperature: 0.7,
    maximum_length: 200,
    stop_sequence: "",
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(options);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (result != undefined) {
      const li = document.createElement("li");
      li.className = "response";
      li.innerText = result;
      document.getElementById("msgList").appendChild(li);
      scrollToBottom(messageEndRef);
      setMsg("");
    }
  }, [result]);
  const chatClear = () => {
    const msgList = document.getElementById("msgList");
    // 모든 li 요소 삭제
    while (msgList.firstChild) {
      msgList.removeChild(msgList.firstChild);
    }
  }
  const delExm1 = () => {

  }
  const delExm2 = () => {

  }
  const onSendMsg = async (event) => {
    event.preventDefault();
    //사용예시 1이 안 만들어진 경우 사용예시1을 만들기 아닌경우 사용예시2를 만들기
    if (exms.length<1) {
      setSendResult1([...sendResult1,{
        "message": msg,
        "question": true,
        "chat_order": 0
    }])
    }
    else {
      setSendResult2([...sendResult2,{
        "message": msg,
        "question": true,
        "chat_order": 1
    }])
    }
    const li = document.createElement("li");
    li.className = "quest";
    li.innerText = msg;
    const ul = document.getElementById("msgList");
    ul.appendChild(li);
    scrollToBottom(messageEndRef);
    try {
      setIsLoading(true);
      await axios
        .post(
          "https://a-hi-prompt.com/gpt/-1",
          {
            prompt: msg,
            gptConfigInfo: options,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + storedJwtToken
            },
          },
        )
        .then((res) => {
          setResult(res.data.answer);
          if (exms.length<1) {
            setSendResult1([...sendResult1,{
              "message": res.data.answer,
              "question": false,
              "chat_order": 0
          }])
          }
          else {
            setSendResult2([...sendResult2,{
              "message": res.data.answer,
              "question": false,
              "chat_order": 1
          }])
          }
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }};

    const handleOnKeyPress = (e) => {
      if (e.key === "Enter") {
        onSendMsg(e);
      }
    };
  
    const handleOptionChange = (e) => {
      const { name, value } = e.target;
      setOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
    };
    const toggleOptions = () => {
      setShowOptions((prevShowOptions) => !prevShowOptions);
    };
  
    
  function Chat() {
    
    return (
    <div
      className="main"
      style={{ marginLeft: "0", height: "max-content" }}
    >
      <div className="chat_outer">
      <div className="chat_container">
      <div className="create_result">
        {isLoading ? <Loading color='white' pos='0px' rightPos='0px' /> : null}
        <ul id='msgList'>
          <li className="response">안녕하세요 ChatGPT 입니다.</li>
        </ul>
        <div ref={messageEndRef}></div>
      </div>

      
      </div>
      <div className="chatgptMenu">
        <div
          className="optionsContainer"
        >
          <div className="optionItem" id='optionBox'>
            <label>
              Model:
              <select
                name='model_name'
                value={options.model_name}
                onChange={handleOptionChange}
              >
                <option value='gpt-3.5-turbo'>GPT-3.5 Turbo</option>
                <option value='gpt-4'>GPT-4</option>
              </select>
            </label>
          </div>
          <div className="optionItem">
            <label>
              Temperature:
              <input
                type='range'
                min='0'
                max='1'
                step='0.1'
                name='temperature'
                value={options.temperature}
                onChange={handleOptionChange}
              />
              {options.temperature}
            </label>
          </div>
          <div className="optionItem">
            <label>
              Maximum_Length:
              <input
                type='range'
                min='1'
                max='1000'
                step='1'
                name='maximum_length'
                value={options.maximum_length}
                onChange={handleOptionChange}
              />
              {options.maximum_length}
            </label>
          </div>
          <div className="optionItem">
            <label>
              Stop Sequence:
              <textarea
                name='stop_sequence'
                value={options.stop_sequence}
                onChange={handleOptionChange}
              />
            </label>
          </div>
          <div className="optionItem">
            <label>
              Top P:
              <input
                type='range'
                min='0'
                max='1'
                step='0.1'
                name='top_p'
                value={options.top_p}
                onChange={handleOptionChange}
              />
              {options.top_p}
            </label>
            <label>
              Frequency Penalty:
              <input
                type='range'
                min='0'
                max='1'
                step='0.1'
                name='frequency_penalty'
                value={options.frequency_penalty}
                onChange={handleOptionChange}
              />
              {options.frequency_penalty}
            </label>
            <label>
              Presence Penalty:
              <input
                type='range'
                min='0'
                max='1'
                step='0.1'
                name='presence_penalty'
                value={options.presence_penalty}
                onChange={handleOptionChange}
              />
              {options.presence_penalty}
            </label>
          </div>
        </div>
      </div>
      
      </div>
    </div>

    );
  }
   //stable부분
   const [stableResult, setStableResult] = useState();
   const [imageInput, setImageInput] = useState("");
 
   async function generateImage(event) {
     event.preventDefault();
     try {
       setIsLoading(true);
       const response = await axios.post(
         "https://a-hi-prompt.com/diffusion",
 
         { prompt: imageInput },
         {
           headers: {
             "Content-Type": "application/json",
           },
         },
       );
 
       const data = response.data;
       if (response.status !== 200) {
         throw (
           data.error ||
           new Error(`Request failed with status ${response.status}`)
         );
       }
 
       setStableResult(data);
       console.log(stableResult);
       setImageInput("");
       setIsLoading(false);
     } catch (error) {
       // Consider implementing your own error handling logic here
       console.error(error);
       alert(error.message);
     }
   }
   useEffect(()=>{
    if (ref2.current!=null) {
      ref2.current.focus()
      ref2.current.setSelectionRange(imageInput.length, imageInput.length); 
    }
  },[imageInput])


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
            <div><input className="name" onChange={e => {setTag1(e.target.value)}} placeholder="태그를 입력하세요(최대 5개)"/></div>
            <div><input className={"name"+(0<tags ? "" : "disable")} id="tag2" onChange={e => {setTag2(e.target.value)}} placeholder="태그를 입력하세요(최대 5개)"/></div>
            <div><input className={"name"+(1<tags ? "" : "disable")} id="tag3" onChange={e => {setTag3(e.target.value)}} placeholder="태그를 입력하세요(최대 5개)"/></div>
            <div><input className={"name"+(2<tags ? "" : "disable")} id="tag4" onChange={e => {setTag4(e.target.value)}} placeholder="태그를 입력하세요(최대 5개)"/></div>
            <div><input className={"name"+(3<tags ? "" : "disable")} id="tag5" onChange={e => {setTag5(e.target.value)}} placeholder="태그를 입력하세요(최대 5개)"/></div>
            <button type="button" className="btn" onClick={()=>{if (tags<4) {setTags(tags+1) ;console.log(tags)}}}>+</button>
            

            
            <br/><br/><br/>
            <h4 style={{margin:"10px"}}>예시질문 생성 (최대 2개)</h4>
            {kind=="text" ? <div className="chat"><Chat/><div className="under">
        <div className="create_form" onSubmit={onSendMsg} onKeyDown={handleOnKeyPress}>
          <textarea
            id="test"
            ref={ref1}
            className="create_textarea"
            type='text'
            placeholder='에이 하이에게 무엇이든 물어보세요'
            value={msg}
            onChange={(e) => {setMsg(e.target.value)}}
            required
          />
          <input className="create_input"type='submit' value='전송' onClick={e=>{onSendMsg(e)}}/>
        </div>
      </div></div> : <div className='imagePromptContainer'>
      <div className='promptbox'>
        <p style={{ margin: "0" }}>프롬프트</p>
      </div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <textarea
          className='ImagePrompt'
          onChange={(e)=>{setImageInput(e.target.value)}}
          onKeyDown={handleOnKeyPress}
          value={imageInput}
          ref={ref2}
        ></textarea>
        <button onClick={generateImage} type='button' className='imageBtn'>
          생성하기{" "}
          <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#04364a" }} />
        </button>
      </form>
      {isLoading ? <Loading color='#04364A' pos='55px' rightPos='0px' /> : null}
      {/*
      <div className='resultBox'>
        <img src={stableResult} style={{ width: "500px" }}></img>
      </div>
    */}
    </div>}
            <br/>
            <button type="button" className="exmBtn" onClick={()=>{if (exms.length<2) {setExms([...exms,exms.length+1])} else {alert("예시는 최대 2개까지 생성 가능합니다.")}; chatClear()}}>예시 생성</button>
            <div className="exmList">

              <div className={"exm"+(exms.length>0 ? "" : "disable")}>사용예시1
              <div className="view" onClick={()=>{setExm1(true)}}>상세보기</div>
              <div className="delete" onClick={()=>{if (exms.length>1) {setSendResult1(sendResult2);setSendResult2([])} else {setSendResult1([])};exms.pop();setExms([...exms])}}>삭제</div>
              </div>
              <div className={"exm"+(exms.length>1 ? "" : "disable")}>사용예시2
              <div className="view" onClick={()=>{setExm2(true)}}>상세보기</div>
              <div className="delete" onClick={()=>{setSendResult2([]);exms.pop();setExms([...exms])}}>삭제</div>
              </div>

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