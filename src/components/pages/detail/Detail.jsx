import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from "../../../assets/Strings";

const Detail = () => {
    const { idx } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const navigate = useNavigate();
    const moveToUpdate = () => {
        navigate('/update/' + idx);
    };
    const deleteBoard = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
          await axios.delete(`BASE_URL/${idx}`).then((res) => {
            alert('삭제되었습니다.');
            navigate('/board');
          });
        }
      };
    const moveToList = () => {
        navigate('/board');
      };
    const getBoard = async () => {
    const resp = await (await axios.get(`//localhost:8080/board/${idx}`)).data;
    setBoard(resp.data);
    setLoading(false);
    };
    
    useEffect(() => {
    getBoard();
    }, []);

    return (
    <div>
        {loading ? (
        <h2>loading...</h2>
        ) : (
        <div>
            <h2>{board.title}</h2>
            <h5>{board.createdBy}</h5>
            <p>{board.contents}</p>
            <button onClick={moveToUpdate}>수정</button>
            <button onClick={deleteBoard}>삭제</button>
            <button onClick={moveToList}>목록</button>
        </div>
        
        )}
    </div>
    );
    };

export default Detail;