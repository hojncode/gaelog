import styled from "styled-components";

export const StBtn = styled.button`
  width: ${(props) => props.width || "5rem"};
  height: 2rem;

  cursor: pointer;

  border-radius: 20px;
  background-color: ${(props) => props.backgroundColor || "transparent"};
  color: ${(props) => props.color || "black"};
  border: ${(props) => props.border || "none"};

  &:hover {
    color: ${(props) => props.hoverColor};
    background-color: ${(props) => props.hoverBackgroundColor};
  }
`;
