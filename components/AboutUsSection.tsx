import styled from "@emotion/styled";
import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { Grid, Container, Typography } from "@mui/material";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  background-color: grey;
  padding: 50px 10px 50px 10px;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
  padding: 10px !important;
  border: 10px solid red !important;
`;

interface iAboutUsSectionProps {
  abouUstContent: any;
}

const AboutUsSection: React.FC<iAboutUsSectionProps> = ({ abouUstContent }) => {
  const { aboutUsTitle, aboutUsImage, aboutUsDescription } =
    abouUstContent.fields;

  return (
    <StyledSection>
      <Container>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item sm={5}>
            <StyledImage
              src={"https:" + aboutUsImage.fields.file.url}
              width={aboutUsImage.fields.file.details.image.width}
              height={aboutUsImage.fields.file.details.image.height}
              alt="Venera About Us Image"
            />
          </Grid>
          <Grid
            item
            sm={7}
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
