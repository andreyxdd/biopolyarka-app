import React from "react";
import styled from "@emotion/styled";
import ItemCard from "./ItemCard";
import { Grid, Container, Typography } from "@mui/material";
import { IRing } from "../@types/generated/contentful";
import { useContextTypes } from "../customHooks/useContextTypes";
import { useNavlink } from "../customHooks/useNavlink";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  background-color: white;
  padding-top: 100px;
`;

interface ICollectionSectionProps {
  collectionContent: Array<IRing>;
}

const CollectionSection: React.FC<ICollectionSectionProps> = ({
  collectionContent,
}) => {
  const { setItems } = useContextTypes();
  const collectionRef = useNavlink("Collection");

  return (
    <StyledSection ref={collectionRef} id="collectionSectionId">
      <Container>
        <Typography variant="h4" style={{ color: "black" }}>
          Collection
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 2, pb: 4 }}
          style={{ color: "black" }}
        >
          Nam molestie volutpat orci, eget iaculis erat ullamcorper a. Sed
          volutpat tellus diam, ac tempor turpis elementum ut. Proin aliquet,
          lectus non hendrerit bibendum, mauris massa condimentum metus, eu
          facilisis magna justo sed arcu.
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="space-evenly"
          alignItems="stretch"
        >
          {collectionContent.map((catalougeItem: IRing, idx: number) => (
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
