import React, { useState } from "react";
import styled from "styled-components";

import { StBtn } from "../atoms/StBtn";
import { useDispatch } from "react-redux";
import { updatePost } from "../../redux/modules/post";
import useInputs from "../../hooks/useInput";
import { StImgBox } from "../atoms/StImgBox";
function EditForm({ logInfo, setModal }) {
  const [editLog, setEditLog] = useState(logInfo); //state에 logInfo(부모로부터 받은 porops)

  const dispatch = useDispatch();
  const [{ nickname, title, body, img }, onChange, reset, toggle] = useInputs({
    nickname: logInfo.nickname,
    title: logInfo.title,
    body: logInfo.body,
    img: logInfo.img,
  });
  let logData = { nickname, title, body, img };

  return (
    <StModal>
      <StModalContainer>
        <Form
          onSubmit={() => {
            let postId = logInfo.id;
            let logData = editLog;
            dispatch(updatePost({ postId, logData }));
            alert("수정이 완료되었습니다");
          }}
        >
          <Input
            name="title"
            placeholder="제목을 입력해주세요"
            onChange={(e) => setEditLog({ ...editLog, title: e.target.value })}
            value={editLog.title}
            required
          />
          <label>By {logInfo.nickname}</label>
          <Text
            name="body"
            placeholder="본문 내용을 입력해주세요"
            onChange={(e) => setEditLog({ ...editLog, body: e.target.value })}
            value={editLog.body}
            required
          />
          <StImgBox src={editLog.img} height="12%" />
          <label>사진올리기</label>
          <Input
            name="img"
            placeholder="이미지 주소를 넣어주세요"
            type="url"
            onChange={(e) => setEditLog({ ...editLog, img: e.target.value })}
            value={editLog.img}
          />
          <BtnContainer>
            <StBtn backgroundColor="black" color="white">
              완료
            </StBtn>
            <StBtn
              onClick={() => {
                setModal(false);
              }}
              type="button"
              backgroundColor="gray"
              color="white"
            >
              취소
            </StBtn>
          </BtnContainer>
        </Form>
      </StModalContainer>
    </StModal>
  );
}

export default EditForm;
const StModal = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
`;
const StModalContainer = styled.div`
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50rem;
  height: 40rem;

  margin: 5% auto;

  border: none;
  border-radius: 44px;
`;

const Form = styled.form`
  margin-top: 5%;
  width: 90%;
  height: 90%;
  & label {
    display: block;
    margin-bottom: 20px;
    padding-left: 5px;
  }
  & label:nth-of-type(2) {
    margin-top: 20px;
  }
`;
const Input = styled.input`
  &:nth-of-type(1) {
    font-size: 3.5rem;
    line-height: 150%;
  }
  &:nth-of-type(2) {
    font-size: 1rem;
    height: 2rem;
    border: 1px solid gainsboro;
    border-radius: 44px;
  }
  &::placeholder {
    color: gainsboro;
  }
  width: 100%;
  margin-bottom: 20px;
  border: none;
  padding-left: 5px;
`;
const Text = styled.textarea`
  min-height: 10rem;
  width: 100%;

  padding-left: 5px;
  margin-bottom: 20px;

  font-size: 1.5rem;
  line-height: 150%;
  border: none;
  overflow-y: auto;
  resize: none;
  &:focus {
    outline: 2px solid black;
  }
`;
const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;
