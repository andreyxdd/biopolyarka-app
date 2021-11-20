import React from "react";
import styled from "@emotion/styled";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Grid, Container, Typography } from "@mui/material";
import { IAboutFields } from "../@types/generated/contentful";
import { useNavlink } from "../customHooks/useNavlink";
import Image from "next/image";

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;

type IAboutSectionProps = OptionalExceptFor<
  IAboutFields,
  "title" | "image" | "description"
>;

const StyledSection = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  padding: 10px 10px 10px 10px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 650px) {
    height: 100%;
    padding-top: 120px;
    padding-bottom: 10px;
  }
`;

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AboutSection: React.FC<IAboutSectionProps> = ({
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
          <Grid item sm={6} xs={12}>
            <StyledDiv>
              <Image
                src={"https:" + image.fields.file.url}
                alt="Boss Venera Biopolyarka"
                width={image?.fields?.file?.details?.image?.width}
                height={image?.fields?.file?.details?.image?.height}
              />
            </StyledDiv>
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="h4" style={{ color: "black" }}>
                {title}
              </Typography>
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
