import { styled } from "styled-components";
import { INotButton, IResponseStatus } from "./interface";

export const QuestionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 10px;
  height: 150px;
  h3 {
    margin: 0;
    text-align: center;
    font-size: 30px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 215px;
  input {
    width: 100px;
    height: 50px;
    box-sizing: border-box;
    font-size: 20px;
  }
`;

type INotButtonElement = {
  notButtonStatus: INotButton;
};

export const NotButton = styled.input<INotButtonElement>`
  position: ${({ notButtonStatus }) => notButtonStatus.position};
  top: ${({ notButtonStatus }) => notButtonStatus.top}px;
  left: ${({ notButtonStatus }) => notButtonStatus.left}px;
  transition: 0.3s;
`;

type IResponseTitle = {
  responseStatus: IResponseStatus;
};

export const ResponseTitle = styled.h4<IResponseTitle>`
  margin: 0;
  text-align: center;
  transition: 0.3s;
  color: ${({ responseStatus }) =>
    responseStatus.afirmativeOrNegative === "afirmative"
      ? "#00988d"
      : "#fc1a1a"};
`;
