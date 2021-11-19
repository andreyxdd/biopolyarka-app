import React from "react";
import styled from "@emotion/styled";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Grid, Container, Typography, Slide, Fade } from "@mui/material";
import { IAboutFields } from "../@types/generated/contentful";
import { useNavlink } from "../customHooks/useNavlink";
import { IoDiamond } from "react-icons/io5";

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;

type IAboutSectionProps = OptionalExceptFor<
  IAboutFields,
  "title" | "image" | "description"
>;

const StyledSection = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #773344;
  /*background-image: linear-gradient(#773344 20%, #ffffff 81%);*/
  padding: 50px 10px 50px 10px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 650px) {
    height: 100%;
    padding-top: 120px;
    padding-bottom: 100px;
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
  const aboutRef = useNavlink("About us");

  const svgSize = image?.fields?.file?.details?.image?.width! + 400;
  const svgCircleRadius =
    (image?.fields?.file?.details?.image?.height! + 380) / 2;

  return (
    <StyledSection ref={aboutRef} id="aboutUsSectionId">
      <Container>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item sm={6} xs={12}>
            <Fade in={true} timeout={3222}>
              <StyledDiv>
                <div className="svg-container">
                  <svg
                    className="svg-content"
                    viewBox={`0 0 ${svgSize} ${svgSize}`}
                    version="1.1"
                  >
                    <IoDiamond
                      x={`${svgCircleRadius - 16}`}
                      y="-5px"
                      size="3.5em"
                      color="white"
                    />

                    <circle
                      className="half-circle half-circle-forward"
                      transform={`rotate(90, ${svgSize / 2}, ${svgSize / 2})`}
                    />
                    <circle
                      className="half-circle half-circle-backward"
                      transform={`rotate(90, ${svgSize / 2}, ${svgSize / 2})`}
                    />

                    <defs>
                      <circle
                        id="round"
                        cx={`${svgSize / 2}`}
                        cy={`${svgSize / 2 + 20}`}
                        r={`${svgCircleRadius - 50}`}
                      />
                      <clipPath id="clip">
                        <use xlinkHref="#round" />
                      </clipPath>
                    </defs>

                    <use xlinkHref="#round" strokeWidth="2" stroke="black" />
                    <image
                      href={"https:" + image.fields.file.url}
                      clipPath="url(#clip)"
                    />
                  </svg>
                </div>
                <style jsx>{`
                  image {
                    width: 100%;
                    border-radius: 50%;
                  }

                  .half-circle {
                    cx: ${svgSize / 2};
                    cy: ${svgSize / 2};
                    r: ${svgCircleRadius};
                    stroke: #f0bd6a;
                    fill: transparent;
                    stroke-width: 14;
                  }

                  .half-circle-forward {
                    stroke-dasharray: ${2 * 3.145 * svgCircleRadius};
                    stroke-dashoffset: ${2 * 3.145 * svgCircleRadius};
                    animation: drawForward 3s linear forwards;
                  }

                  @keyframes drawForward {
                    to {
                      stroke-dashoffset: ${3.145 * svgCircleRadius + 80};
                    }
                  }

                  .half-circle-backward {
                    stroke-dasharray: ${2 * 3.145 * svgCircleRadius};
                    stroke-dashoffset: ${-2 * 3.145 * svgCircleRadius};
                    animation: drawBackwards 3s linear forwards;
                  }

                  @keyframes drawBackwards {
                    to {
                      stroke-dashoffset: ${-3.145 * svgCircleRadius - 80};
                    }
                  }

                  .svg-container {
                    display: inline-block;
                    position: relative;
                    width: 100%;
                    padding-bottom: 100%;
                    vertical-align: middle;
                    overflow: hidden;
                  }

                  .svg-content {
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    left: 0;
                  }
                `}</style>
              </StyledDiv>
            </Fade>
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
              <Slide in={true} timeout={3000} direction="left">
                <Typography variant="h4" style={{ color: "white" }}>
                  {title}
                </Typography>
              </Slide>
            </Grid>
            <Grid item>
              <Slide in={true} timeout={3500} direction="left">
                <Typography
                  variant="body1"
                  component="div"
                  style={{ color: "rgb(255,255,255,0.8)" }}
                >
                  {documentToReactComponents(description)}
                </Typography>
              </Slide>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default AboutSection;
