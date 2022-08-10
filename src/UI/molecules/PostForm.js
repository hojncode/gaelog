import { useState, useEffect } from "react";
import styled from "styled-components";
import useInputs from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { StBtn } from "../atoms/StBtn";
import { StInput } from "../atoms/StInput";

import { addPost } from "../../redux/modules/post";
const PostForm = () => {
  const [{ nickname, title, body, img }, onChange, reset, toggle] = useInputs({
    nickname: "",
    title: "",
    body: "",
    img: "",
  });
  let logData = { nickname, title, body, img };
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(addPost(logData));
    alert("작성완료!");
    navigate("/");
  };

  return (
    <FormBox>
      <Form onSubmit={onSubmit}>
        <Label>제목</Label>
        <StInput
          name="title"
          placeholder="제목을 입력해주세요"
          // value={logData.title}
          value={title}
          onChange={onChange}
          required
        />
        <Label>닉네임 </Label>

        <StInput
          name="nickname"
          placeholder="닉네임을 입력해주세요"
          onChange={onChange}
          value={nickname}
          required
        />
        {toggle ? (
          <Error>
            닉네임은 2자 이상 16자 이하, 영어 또는 숫자 또는 한글만 가능합니다
          </Error>
        ) : (
          <span></span>
        )}

        <Label>본문</Label>
        <Text
          name="body"
          placeholder="본문 내용을 입력해주세요"
          onChange={onChange}
          value={body}
          required
        />
        <Label>사진올리기</Label>
        <StInput
          name="img"
          placeholder="이미지 주소를 입력해주세요"
          value={img}
          type="url"
          accept="image/*"
          onChange={onChange}
        />
        <StBtnWrapper>
          <StBtn
            color="white"
            backgroundColor="black"
            width="7rem"
            disabled={toggle ? true : false}
          >
            작성완료
          </StBtn>
        </StBtnWrapper>
      </Form>
    </FormBox>
  );
};
export default PostForm;

const FormBox = styled.div`
  /* border-color: rgb(221, 221, 221);
  border-style: solid;
  box-shadow: 0 3px 3px 0 grey; */
  padding-bottom: 30px;
  margin: 0 auto 3rem;
  width: 70%;
  height: 40rem;
  display: flex;
  border-radius: 4px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 45rem;
  margin: auto;
`;
const Label = styled.label`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 43rem;
`;
const Error = styled.span`
  color: red;
  font-size: small;
  margin: 10px 0 0 20px;
`;

const Text = styled.textarea`
  min-height: 10rem;
  width: 100%;

  padding: 20px;
  margin-bottom: 20px;

  border: 1px solid gainsboro;
  border-radius: 20px;

  font-size: 1rem;
  line-height: 150%;
  overflow-y: auto;
  &:focus {
    outline: 2px solid black;
  }
  &::placeholder {
    color: gainsboro;
  }
  resize: none;
`;
const StBtnWrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
`;
