import styled from "styled-components";

export const StInput = styled.input`
  font-size: 1rem;
  height: 2rem;
  width: ${(props) => props.width};
  border: 1px solid gainsboro;
  border-radius: 20px;

  padding-left: 20px;
  margin-right: ${(props) => props.marginRight};

  &:focus {
    outline: 2px solid black;
  }

  &::placeholder {
    color: gainsboro;
  }
`;
