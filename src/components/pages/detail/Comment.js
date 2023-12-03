/** @format */

import React from "react";
import Modal from "react-modal";
import axios from "axios";
import formatDateTime from "../../FormatDateTime";
import { useState } from "react";
import "./Comment.css";

const Comment = ({
  comments,
  refresh,
  setRefresh,
  error,
  setError,
  prompt_id,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sendComment, setSendComment] = useState("");
  const [loading, setLoading] = useState(true); // axios에서 정보를 받아오고 랜더링하기 위한 상태 state
  const [editing, setEditing] = useState(false);
  const [editedComment, setEditedComment] = useState("");

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async (comment_id, e) => {
    e.preventDefault();
    console.log(editedComment);
    console.log(comment_id);
    try {
      await axios
        .put(`https://a-hi-prompt.com/prompt/comment/update/${comment_id}`, {
          context: editedComment,
        })
        .then(() => {
          setEditing(false);
          console.log("Comment successfully edited.");
        });
    } catch {
      console.error("Comment Edit Failed!");
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSendComment(value);
  };

  const onSendComment = (prompt_id, event) => {
    event.preventDefault();
    try {
      setLoading(true);
      axios
        .post(
          `https://a-hi-prompt.com/prompt/comment/${prompt_id}`,
          { comment: sendComment },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            setRefresh((refresh) => refresh * -1);
          }
        });
    } catch (error) {
      setError(error);
      console.error("Error fetching sending comment:", error);
    }
  };

  function onDeleteComment(comment_id, event) {
    event.preventDefault();
    try {
      setLoading(true);
      axios
        .get(`https://a-hi-prompt.com/prompt/comment/delete/${comment_id}`)
        .then((res) => {
          setLoading(false);
          setModalIsOpen(false);
          if (res.data) {
            console.log(res.data);
            setRefresh((refresh) => refresh * -1);
          }
        });
    } catch (error) {
      setError(error);
      console.error("Error fetching deleting comment:", error);
    }
  }

  return (
    <div className='desContainer' style={{ marginTop: "50px" }}>
      <h3 style={{ marginTop: "0px", fontWeight: "400", fontSize: "20px" }}>
        댓글 {comments.length}
      </h3>

      <form className='commentInput'>
        <textarea onChange={onChange}></textarea>
        <button
          onClick={(e) => {
            onSendComment(prompt_id, e);
          }}
        >
          등록
        </button>
      </form>

      {comments.map((comment) => (
        <div
          style={{
            borderBottom: "solid",
            display: "flex",
            flexDirection: "column",
            marginBlock: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              className='profilePic'
              src={comment.member_profile_img}
              style={{ width: "30px", height: "30px", margin: "0" }}
            />
            <p style={{ margin: "6px", marginLeft: "15px" }}>
              {comment.member_nickname}
            </p>
            <div
              style={{
                display: "flex",
                margin: "0",
                marginLeft: "40%",
              }}
            >
              {comment.permissioned ? (
                <>
                  <button className='commentEdit' onClick={handleEditClick}>
                    수정
                  </button>
                  <button
                    className='commentEdit'
                    onClick={() => {
                      setModalIsOpen(true);
                    }}
                  >
                    삭제
                  </button>
                  <Modal className='modal' isOpen={modalIsOpen}>
                    <p>정말 삭제하시겠습니까?</p>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ display: "inline-block" }}>
                        <button
                          className='modal-button'
                          style={{ backgroundColor: "red" }}
                          onClick={(e) => {
                            onDeleteComment(comment.comment_id, e);
                          }}
                        >
                          예
                        </button>
                      </div>
                      <div style={{ display: "inline-block" }}>
                        <button
                          className='modal-button'
                          onClick={() => {
                            setModalIsOpen(false);
                          }}
                        >
                          아니오
                        </button>
                      </div>
                    </div>
                  </Modal>
                </>
              ) : null}
            </div>
          </div>
          {editing ? (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <textarea
                  style={{
                    width: "70%",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <button
                  style={{ alignSelf: "center", width: "50px", height: "50px" }}
                  className='commentEdit'
                  onClick={(e) => {
                    handleSaveClick(comment.comment_id, e);
                  }}
                >
                  저장
                </button>
              </div>
            </>
          ) : (
            <>
              <p style={{ marginLeft: "42px" }}>{comment.content}</p>
            </>
          )}
          <p style={{ fontSize: "13px" }}>
            {formatDateTime(comment.create_time)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Comment;
