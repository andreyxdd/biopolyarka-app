import styled from "@emotion/styled";
import React from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const StyledSection = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: grey;
  padding: 10px 10px 10px 10px;
`;

interface iAboutUsSection {
  abouUstContent: any;
}

const AboutUsSection: React.FC<iAboutUsSection> = ({ abouUstContent }) => {
  const { aboutUsTitle, aboutUsImage, aboutUsDescription } =
    abouUstContent.fields;

  return (
    <StyledSection>
      <h2>{aboutUsTitle}</h2>
      <Image
        src={"https:" + aboutUsImage.fields.file.url}
        width={aboutUsImage.fields.file.details.image.width / 4}
        height={aboutUsImage.fields.file.details.image.height / 4}
      />
      <div>{documentToReactComponents(aboutUsDescription)}</div>
    </StyledSection>
  );
};

export default AboutUsSection;
