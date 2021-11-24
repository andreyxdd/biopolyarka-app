import React from "react";
import styled from "@emotion/styled";
import { Divider, Typography } from "@mui/material";
import { FaInstagram } from "react-icons/fa";
import { IAboutFields } from "../@types/generated/contentful";
import ClientOnlyDiv from "./ClientOnlyDiv";
import { useMediaQuery } from "@react-hook/media-query";

const StyledFooter = styled.footer`
  text-align: center;
  padding: 3px;
  background-color: #000000;
  color: white;
  position: relative;
`;

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;

type IFooterProps = OptionalExceptFor<IAboutFields, "navbarTitle">;

const Footer: React.FC<IFooterProps> = ({ navbarTitle }) => {
  const onMobile: boolean = useMediaQuery("only screen and (max-width: 750px)");
  return (
    <ClientOnlyDiv>
      <StyledFooter>
        <p
          className="customFont"
          style={{
            fontSize: onMobile ? "1.6em" : "2.0em",
            margin: "4px -2px -2px -2px",
            color: "#ff9e01",
            position: "absolute",
            left: "14px",
          }}
        >
          <a href="." style={{ textDecoration: "none", color: "inherit" }}>
            {navbarTitle}
          </a>
        </p>

        <a
          href="https://www.instagram.com/biopolyarka.a/"
          style={{
            textDecoration: "none",
            color: "inherit",
            position: onMobile ? "absolute" : "static",
            right: onMobile ? "14px" : "0px",
          }}
        >
          <FaInstagram size="3em" style={{ margin: "6px 10px 4px 10px" }} />
        </a>

        <Divider
          variant="middle"
          sx={{ m: 1, color: "secondary", pt: onMobile ? "50px" : "0px" }}
        >
          <Typography variant="caption">
            Copyright @ {new Date().getFullYear()}
          </Typography>
        </Divider>

        <Typography variant="caption">
          Proudly created by{" "}
          <a
            href="https://linktr.ee/andreyxdd"
            style={{ textDecoration: "none", color: "grey" }}
          >
            Andrey Volkov
          </a>
        </Typography>
      </StyledFooter>
    </ClientOnlyDiv>
  );
};

export default Footer;
