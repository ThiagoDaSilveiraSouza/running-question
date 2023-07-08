import { useEffect, useState } from "react";
import { styled } from "styled-components";

const QuestionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  h3 {
    margin: 0;
    text-align: center;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

type INotButton = {
  position: "relative" | "absolute";
  left: number;
  top: number;
};
const NotButton = styled.input<INotButton>``;

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const Question = () => {
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  const [notButtonStatus, setNotButtonStatus] = useState<INotButton>({
    position: "relative",
    left: 0,
    top: 0,
  });

  const notButtonHandleHover = () => {
    const { width, height } = pageSize;
    const randonWidth = getRandomNumber(0, width);
    const randonHeight = getRandomNumber(0, height);
    console.log("EixoX: ", randonWidth);
    console.log("EixoY: ", randonHeight);
  };

  useEffect(() => {
    const pageWidth = document.documentElement.scrollWidth;
    const pageHeigth = document.documentElement.scrollHeight;

    setPageSize({ width: pageWidth, height: pageHeigth });
  }, []);
  return (
    <QuestionContainer>
      <CardContainer>
        <h3>Question?</h3>
        <ButtonsContainer>
          <input type="button" value="Sim" />
          <NotButton
            type="button"
            value="Não"
            onMouseEnter={notButtonHandleHover}
          />
        </ButtonsContainer>
      </CardContainer>
    </QuestionContainer>
  );
};
