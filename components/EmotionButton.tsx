/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";

const buttonStyle = css({
  padding: "32px",
  backgroundColor: "hotpink",
  ":hover": {
    color: "white",
  },
});

const EmotionButton = () => {
  return <div css={buttonStyle}>Hover over me</div>;
};

export default EmotionButton;
