import { BiExit } from "react-icons/bi"
import styled from "styled-components"

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
export const Header = styled.header`
  display: flex;
  height: 70px;
  align-items: center;
  justify-content: space-between;
  font-size: 26px;
  font-weight: 700;
  color: white;
`
export const TransactionsContainer = styled.article`
  flex-grow: 1;
  height: calc(100vh - 300px);
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  li {
    padding: 7px 0;
  }
  >div {
    overflow: auto;
    padding: 0 5px;
  }
  article {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 10px 16px;
    border-radius: 0 0 5px 5px;
    box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.2);
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
export const ButtonsContainer = styled.section`
  margin: 15px 0 15px 0;
  display: flex;
  padding: 0;
  gap: 15px;
  
  button {
    width: calc(50vw - 33px);
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
  a{
    padding: 0;
  }
`
export const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "income" || props.total >= 0 ? "green" : "red")};
`
export const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  div {
    display: flex;
  }
  div span {
    color: #c6c6c6;
    margin: 0 10px;
  }
`

export const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

export const Modal = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  min-width: 250px;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: #fff;
  background-color: black;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  p {
    margin-bottom: 15px;
  }
  button {
    width: 90%;
    margin-top: 10px;
  }
`;

export const LogoutButton = styled(BiExit)`
  cursor: pointer;
`;
