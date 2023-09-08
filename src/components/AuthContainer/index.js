import styled from "styled-components";

export const AuthPageContent = styled.div`
  height: 100vh;
  display: flex;
  width: 100%;
  max-width: 600px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a{
    padding-top: 30px;
    font-size: 15px;
    color: white;
    font-family: 'Raleway';
    :hover {
      text-decoration: underline;
    }
  }

`

export const AuthPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`