import styled from "@emotion/styled";
import React from "react";

interface IButtonProps {
  backgroundColor: string;
}

const StyledButton = styled.button<IButtonProps>`
  padding: 32px;
  background-color: ${(props) => props.backgroundColor};
  &:hover {
    color: white;
  }
`;

const StyledEmotionButton = () => {
  return (
    <StyledButton backgroundColor="blue">Hover over me stylly</StyledButton>
  );
};

export default StyledEmotionButton;
