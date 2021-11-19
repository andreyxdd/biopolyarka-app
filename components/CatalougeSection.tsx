import React from "react";
import styled from "@emotion/styled";
import ItemCard from "./ItemCard";
import { Grid, Container, Typography, Divider } from "@mui/material";
import { IRing } from "../@types/generated/contentful";
import { useContextTypes } from "../customHooks/useContextTypes";
import { useNavlink } from "../customHooks/useNavlink";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255);
  background-image: linear-gradient(#773344, #ffffff);
  padding: 100px 10px 100px 10px;
`;

interface ICatalougeSectionProps {
  catalougeContent: Array<IRing>;
}

const CatalougeSection: React.FC<ICatalougeSectionProps> = ({
  catalougeContent,
}) => {
  const { setItems } = useContextTypes();
  const catalougeRef = useNavlink("Catalouge");

  return (
    <StyledSection ref={catalougeRef} id="CatalougeSectionId">
      <Container>
        <Typography variant="h4" style={{ color: "rgb(255,255,255)" }}>
          Каталог
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 2 }}
          style={{ color: "rgb(255,255,255,0.8)" }}
        >
          Nam molestie volutpat orci, eget iaculis erat ullamcorper a. Sed
          volutpat tellus diam, ac tempor turpis elementum ut. Proin aliquet,
          lectus non hendrerit bibendum, mauris massa condimentum metus, eu
          facilisis magna justo sed arcu.
        </Typography>
        <Divider variant="middle" sx={{ m: 4 }} />
        <Grid
          container
          spacing={2}
          justifyContent="space-evenly"
          alignItems="stretch"
        >
          {catalougeContent.map((catalougeItem: IRing, idx: number) => (
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

export default CatalougeSection;
