import { useEffect, useState, useCallback } from "react";
import { getRandomNumber } from "./utils";
import { INotButton, IResponseStatus } from "./interface";
import {
  ButtonsContainer,
  CardContainer,
  NotButton,
  QuestionContainer,
  ResponseTitle,
} from "./style";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { questionData } from "../../data";

export const Question = () => {
  const [resetTimer, setResetTimer] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  const [notButtonStatus, setNotButtonStatus] = useState<INotButton>({
    position: "relative",
    left: 0,
    top: 0,
  });
  const [responseStatus, setResponseStatus] = useState<IResponseStatus>({
    afirmativeOrNegative: "negative",
    index: 0,
    response: "",
  });

  const setAfirmativeOrNegativeResponse = (
    afirmativeOrNegative: "afirmative" | "negative"
  ) => {
    const { afirmativeButtonResponseList, negativeButtonResponseList } =
      questionData;
    const updateResponseStatus: IResponseStatus = {
      afirmativeOrNegative: afirmativeOrNegative,
      index: 0,
      response: "",
    };
    if (afirmativeOrNegative === "afirmative") {
      const afirmativeReponseLength = afirmativeButtonResponseList.length;
      const randonIndex = getRandomNumber(0, afirmativeReponseLength - 1);
      const randonAfirmativeReponse = afirmativeButtonResponseList[randonIndex];

      updateResponseStatus.index = randonIndex;
      updateResponseStatus.response = randonAfirmativeReponse;
    } else if (afirmativeOrNegative === "negative") {
      const negativeReponseLength = negativeButtonResponseList.length;
      const randonIndex = getRandomNumber(0, negativeReponseLength - 1);
      const randomNegativeResponse = negativeButtonResponseList[randonIndex];

      updateResponseStatus.index = randonIndex;
      updateResponseStatus.response = randomNegativeResponse;
    }
    setResponseStatus(updateResponseStatus);
  };

  const resetButtonPosition = () => {
    setNotButtonStatus({ position: "relative", left: 0, top: 0 });
  };

  const resetResponseStatus = () => {
    setResponseStatus({
      afirmativeOrNegative: "afirmative",
      index: 0,
      response: "",
    });
  };

  const notButtonHandleHover = () => {
    const { width, height } = pageSize;
    const randonLeft = getRandomNumber(0, width);
    const randonTop = getRandomNumber(0, height);

    if (resetTimer) {
      clearTimeout(resetTimer);
    }

    setResetTimer(
      setTimeout(() => {
        resetButtonPosition();
        resetResponseStatus();
        if (resetTimer) {
          clearTimeout(resetTimer);
        }
        setResetTimer(null);
      }, 5000)
    );

    setAfirmativeOrNegativeResponse("negative");
    setNotButtonStatus({ position: "fixed", left: randonLeft, top: randonTop });
  };

  const updatePageSize = useCallback(() => {
    const pageWidth = document.documentElement.scrollWidth - 100;
    const pageHeight = document.documentElement.scrollHeight - 50;

    setPageSize({ width: pageWidth, height: pageHeight });
  }, []);

  useEffect(() => {
    updatePageSize();
    window.addEventListener("resize", updatePageSize);

    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  return (
    <QuestionContainer>
      <CardContainer>
        <h3>{questionData.questionText}</h3>
        <ButtonsContainer>
          <a href={questionData.afirmativeButtonUrlLink} target="_blank">
            <input
              type="button"
              value={questionData.afirmativeButtonText}
              onMouseEnter={() => setAfirmativeOrNegativeResponse("afirmative")}
            />
          </a>
          <StyleSheetManager shouldForwardProp={isPropValid}>
            <NotButton
              notButtonStatus={notButtonStatus}
              type="button"
              value={questionData.negativeButtonText}
              onMouseEnter={notButtonHandleHover}
            />
          </StyleSheetManager>
        </ButtonsContainer>
        <ResponseTitle responseStatus={responseStatus}>
          {responseStatus.response}
        </ResponseTitle>
      </CardContainer>
    </QuestionContainer>
  );
};
