import React from "react";
import styled from "@emotion/styled";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Grid, Container, Typography } from "@mui/material";
import { IAboutFields } from "../@types/generated/contentful";
import { useNavlink } from "../customHooks/useNavlink";
import Image from "next/image";

const StyledSection = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  padding-top: 8vh;
  padding-bottom: 1.2vh;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 950px) {
    height: 100%;
    padding-top: 12.5vh;
    padding-bottom: 10px;
  }
`;

const AboutSection: React.FC<IAboutFields> = ({
  navbarTitle,
  title,
  image,
  description,
}) => {
  const aboutRef = useNavlink("Brand");

  return (
    <StyledSection ref={aboutRef} id="aboutSectionId">
      <Container>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container item xs={12} justifyContent="center">
            <p
              className="customFont"
              style={{
                fontSize: "11vw",
                paddingRight: "4vh",
                color: "rgba(255, 158, 1, 0.8)",
                margin: "4px -2px -2px -2px",
                textShadow: "3.3vh -3.1vw rgba(255, 158, 1, 0.3)",
              }}
            >
              {navbarTitle}
            </p>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Image
              src={"https:" + image.fields.file.url}
              alt={`Boss Venera ${title}`}
              width={image?.fields?.file?.details?.image?.width}
              height={image?.fields?.file?.details?.image?.height}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item>
              <Grid item>
                <Typography
                  variant="body1"
                  component="div"
                  style={{ color: "black" }}
                >
                  {documentToReactComponents(description)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default AboutSection;
