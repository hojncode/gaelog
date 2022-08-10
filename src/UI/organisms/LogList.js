import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/modules/post";
import { StBtn } from "../atoms/StBtn";

const LogList = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const log = useSelector((state) => {
    return state.postSlice.posts;
  });
  const onErrorImg = (e) => {
    e.target.src = "/gaelogLogo.png";
  };
  const reverse = [...log].reverse();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <StOne>
      <StIconBox
        onClick={() => {
          navi("/post");
        }}
      >
        <StBtn
          border="2px solid black"
          hoverColor="white"
          hoverBackgroundColor="black"
          width="6rem"
        >
          글작성 하기
        </StBtn>
      </StIconBox>
      <StTempBoxOutline>
        {reverse.map((x) => {
          return (
            <StTempBox
              key={x.id}
              onClick={() => {
                navi(`/detail/${x.id}`);
              }}
            >
              <StImg src={x.img} onError={onErrorImg} />
              <LayoutBox>
                {" "}
                <TitleBox>{x.title}</TitleBox>
                <StBody>{x.body}</StBody>
                <div style={{ margin: "0 auto 5px auto" }}>
                  <StBtn color="white" backgroundColor="#b8b8b8" width="6rem">
                    내용 더보기
                  </StBtn>
                </div>
              </LayoutBox>
            </StTempBox>
          );
        })}
      </StTempBoxOutline>
    </StOne>
  );
};

const StOne = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  align-content: center;
  justify-content: center;
  flex-direction: column;
`;
const StIconBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StTempBoxOutline = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const StTempBox = styled.div`
  padding: 12px;
  width: 90%;
  height: 26rem;
  margin: auto;
  margin-top: 10px;

  background-color: #fafafa;
  cursor: pointer;
  &:hover {
    border: 5px solid transparent;
  }
`;

const StImg = styled.img`
  background-size: cover;
  margin: auto;
  width: 99%;
  height: 200px;
  border: 3px solid #fafafa;
  margin: auto;
`;
const TitleBox = styled.h2`
  margin: 2px 5px 2px 5px;
  width: 15rem;
  height: 3rem;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* 출처: https://jos39.tistory.com/211 [JOS39 블로그:티스토리] */
`;

const StBody = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: box;
  margin-top: 1px;
  max-height: 80px;
  overflow: hidden;
  vertical-align: top;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const StbtnStyle = styled.button`
  color: black;
  padding: 0.375rem 0.75rem;
  border: 1px;
  border-radius: 5px;
  cursor: pointer;
  width: 9rem;
  height: 2rem;
  margin: auto;
`;

const LayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 18rem;
  height: 12rem;
`;
export default LogList;
