import styled from "@emotion/styled";
import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Grid, Container, Typography } from "@mui/material";
import { IAboutFields } from "../@types/generated/contentful";
import { useNavlink } from "../customHooks/useNavlink";
import { IoDiamond } from "react-icons/io5";

const StyledSection = styled.section`
  width: 100%;
  height: 100vh;
  background-color: grey;
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

const AboutUsSection: React.FC<IAboutFields> = ({
  aboutUsTitle,
  aboutUsImage,
  aboutUsDescription,
}) => {
  const aboutUsRef = useNavlink("About us");

  const svgSize = aboutUsImage?.fields?.file?.details?.image?.width! + 400;
  const svgCircleRadius =
    (aboutUsImage?.fields?.file?.details?.image?.height! + 380) / 2;

  return (
    <StyledSection ref={aboutUsRef} id="aboutUsSectionId">
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
              <div className="svg-container">
                <svg
                  className="svg-content"
                  viewBox={`0 0 ${svgSize} ${svgSize}`}
                  version="1.1"
                >
                  <IoDiamond
                    className="fade-in"
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
                    href={"https:" + aboutUsImage.fields.file.url}
                    clipPath="url(#clip)"
                  />
                </svg>
              </div>
              <style jsx>{`
                .fade-in > path {
                  animation-name: fadeIn;
                  animation-iteration-count: 1;
                  animation-timing-function: ease-in;
                  animation-duration: 2s;
                }

                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                  }
                }

                image {
                  width: 100%;
                  border-radius: 50%;
                }

                .half-circle {
                  cx: ${svgSize / 2};
                  cy: ${svgSize / 2};
                  r: ${svgCircleRadius};
                  stroke: yellow;
                  fill: transparent;
                  stroke-width: 8;
                }

                .half-circle-forward {
                  stroke-dasharray: ${2 * 3.145 * svgCircleRadius};
                  stroke-dashoffset: ${2 * 3.145 * svgCircleRadius};
                  animation: drawForward 2s linear forwards;
                }

                @keyframes drawForward {
                  to {
                    stroke-dashoffset: ${3.145 * svgCircleRadius + 80};
                  }
                }

                .half-circle-backward {
                  stroke-dasharray: ${2 * 3.145 * svgCircleRadius};
                  stroke-dashoffset: ${-2 * 3.145 * svgCircleRadius};
                  animation: drawBackwards 2s linear forwards;
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
              <Typography variant="h4">{aboutUsTitle}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="div">
                {documentToReactComponents(aboutUsDescription)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default AboutUsSection;
