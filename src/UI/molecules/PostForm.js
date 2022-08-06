import { useState, useEffect } from "react";
import styled from "styled-components";
import { PostSuccessBtn } from "../atoms/PostSuccessBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  //!여기부터 변수
  const initialState = {
    id: 0,
    nickname: "",
    title: "",
    body: "",
    img: "",
  };
  const [logData, setLogData] = useState(initialState);
  let navigate = useNavigate();
  const REGNICKNAME = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
  const [toggle, setToggle] = useState(false);
  let [dbData, setDbData] = useState();
  let [idNumber, setIdNumber] = useState(0);
  //!then버전
  //useEffect(() => {
  //   axios.get("http://localhost:4000/gaebalog").then((res) => {
  //     setDbData(res.data);
  //     console.log(res.data);
  //     setIdNumber(res.data.length + 1);
  //   });
  // }, []);
  //!async버전
  async function getData() {
    try {
      const res = await axios.get("http://localhost:4000/gaebalog");
      setDbData(res.data);
      setIdNumber(res.data.length + 1);
    } catch (error) {
      alert("네트워크오류입니다");
    }
  }
  getData();

  //!여기부터 이벤트
  const onChange = (event) => {
    const { name, value } = event.target;
    setLogData({ ...logData, [name]: value, id: idNumber });
    if (name === "nickname" && !REGNICKNAME.test(value)) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(logData);
    axios.post("http://localhost:4000/gaebalog", logData);
    setLogData(initialState);
    alert("작성완료!");
    navigate("/");
  };

  return (
    <Form onSubmit={onSubmit}>
      <Label>제목</Label>
      <Input
        name="title"
        placeholder="title..."
        value={logData.title}
        onChange={onChange}
        required
      />
      <Label>닉네임 </Label>

      <Input
        name="nickname"
        placeholder="nickname..."
        onChange={onChange}
        value={logData.nickname}
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
        placeholder="body..."
        onChange={onChange}
        value={logData.body}
        required
      />
      <Label>사진올리기</Label>
      <Input
        name="img"
        value={logData.img}
        type="file"
        accept="image/*"
        onChange={onChange}
      />
      <PostSuccessBtn />
    </Form>
  );
};
export default PostForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 45rem;
  margin: auto;
`;
const Label = styled.label`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 43rem;
`;
const Error = styled.span`
  color: red;
  font-size: small;
`;
const Input = styled.input`
  height: 3em;
  width: 43rem;
`;
const Text = styled.textarea`
  height: 10rem;
  width: 43rem;
`;