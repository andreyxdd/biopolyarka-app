import React from "react";
import styled from "@emotion/styled";
import { Divider, Typography } from "@mui/material";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";

const StyledFooter = styled.footer`
  text-align: center;
  padding: 3px;
  background-color: #0b0014;
  color: white;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant="body2" sx={{ p: 2 }}>
        Подписывайтесь на нас:
      </Typography>
      <a
        href="https://www.instagram.com/biopolyarka.a/"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <FaFacebookSquare size="3em" style={{ margin: "4px 10px 4px 10px" }} />
      </a>
      <a
        href="https://www.instagram.com/biopolyarka.a/"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <FaInstagram size="3em" style={{ margin: "4px 10px 4px 10px" }} />
      </a>
      <Divider variant="middle" sx={{ m: 1 }} />
      <Typography variant="caption">
        Copyright @ {new Date().getFullYear()}
      </Typography>
      <br />
      <Typography variant="caption">
        Proudly created by{" "}
        <a
          href="mailto: andreyxdd@yandex.ru"
          style={{ textDecoration: "none", color: "grey" }}
        >
          Andrey Volkov
        </a>
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
