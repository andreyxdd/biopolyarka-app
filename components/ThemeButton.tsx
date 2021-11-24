import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)`
  &:hover {
    background-color: #edae49;
  },
`;

const ThemeButton = ({ ...props }) => {
  return <StyledButton variant="contained" color="primary" {...props} />;
};

export default ThemeButton;
