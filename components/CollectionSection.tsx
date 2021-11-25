import React from "react";
import styled from "@emotion/styled";
import ItemCard from "./ItemCard";
import { Grid, Container, Typography, Divider } from "@mui/material";
import { IRing } from "../@types/generated/contentful";
import { useContextTypes } from "../customHooks/useContextTypes";
import { useNavlink } from "../customHooks/useNavlink";
import { ICollectionFields } from "../@types/generated/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  background-color: white;
  padding-top: 100px;
`;

interface ICollectionSectionProps {
  collectionContent: ICollectionFields;
  ringContent: Array<IRing>;
}

const CollectionSection: React.FC<ICollectionSectionProps> = ({
  collectionContent,
  ringContent,
}) => {
  const { setItems } = useContextTypes();
  const collectionRef = useNavlink(collectionContent.title);

  return (
    <StyledSection ref={collectionRef} id="collectionSectionId">
      <Divider variant="middle" sx={{ m: 4 }} />
      <Container>
        <Typography variant="h4" style={{ color: "black" }}>
          {collectionContent.title}
        </Typography>
        <Typography
          component="div"
          variant="body1"
          sx={{ mt: 2, pb: 4 }}
          style={{ color: "black" }}
        >
          {documentToReactComponents(collectionContent.description)}
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="space-evenly"
          alignItems="stretch"
        >
          {ringContent.map((catalougeItem: IRing, idx: number) => (
            <Grid
              key={`${catalougeItem.sys.id}-${idx}`}
              item
              style={{ display: "flex", width: "100%" }}
              lg={4}
              md={6}
              sm={6}
              xs={12}
            >
              <ItemCard
                data={catalougeItem}
                id={`${catalougeItem.sys.id}-${Math.random() * idx}`}
                setItems={setItems}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default CollectionSection;
