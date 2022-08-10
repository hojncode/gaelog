import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StBtn } from "../../UI/atoms/StBtn";

const Header = () => {
  const navi = useNavigate();
  return (
    <Headerbox>
      <Logo src="/gaelogLogo.png" onClick={() => navi("/")}></Logo>
    </Headerbox>
  );
};
export default Header;

const Headerbox = styled.header`
  display: flex;
  /* justify-content: space-around; */
  align-items: left;

  margin: 50px auto;
`;
const Logo = styled.img`
  width: 10rem;
  cursor: pointer;
`;
