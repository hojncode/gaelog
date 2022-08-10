import React from "react";
import styled from "styled-components";

import useInputs from "../../hooks/useInput";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/modules/comment";

import { StBtn } from "../atoms/StBtn";
import { StInput } from "../atoms/StInput";

const EditComment = ({ setModal, param, commentId, editComment }) => {
  const dispatch = useDispatch();
  const [{ nickname, comment }, onChange, reset, toggle] = useInputs({
    nickname: editComment.nickname,
    comment: editComment.comment,
  });
  const commentData = { nickname, comment, comment_id: param };
  const updatehandler = (e) => {
    e.preventDefault();
    dispatch(updateComment({ commentId, commentData }));
    setModal(false);
  };
  return (
    <StEditComnt onSubmit={(e) => updatehandler(e)}>
      <div>
        <span style={{ fontSize: "2rem" }}>↳</span>{" "}
        <StInput
          type="text"
          value={nickname}
          placeholder="닉네임"
          name="nickname"
          onChange={onChange}
          required
          width="10rem"
          marginRight="10px"
        />
        <StInput
          type="text"
          value={comment}
          name="comment"
          placeholder="수정할 내용을 입력해주세요"
          onChange={onChange}
          required
          width="30rem"
        />
      </div>
      <StBtnWrapper>
        <StBtn backgroundColor="black" color="white">
          수정완료
        </StBtn>
        <StBtn
          onClick={() => {
            setModal(false);
          }}
          backgroundColor="gainsboro"
          color="white"
          hoverBackgroundColor="#aa1408"
        >
          수정취소
        </StBtn>
      </StBtnWrapper>
    </StEditComnt>
  );
};
export default EditComment;

const StEditComnt = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-left: 25px;
`;
const StBtnWrapper = styled.div`
  display: flex;
  gap: 5px;
`;
