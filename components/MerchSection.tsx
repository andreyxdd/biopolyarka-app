import styled from "@emotion/styled";
import React from "react";
import ItemCard from "./ItemCard";
import { Grid, Container, Typography, Divider } from "@mui/material";
import { IRing } from "../@types/generated/contentful";
import { ICartItemProps } from "../types";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  background-color: pink;
  padding: 50px 10px 50px 10px;
`;

interface IMerchSectionProps {
  merchContent: Array<IRing>;
  setItems: React.Dispatch<React.SetStateAction<Array<ICartItemProps>>>;
}

const MerchSection: React.FC<IMerchSectionProps> = ({
  merchContent,
  setItems,
}) => {
  return (
    <StyledSection>
      <Container>
        <Typography variant="h4">Каталог</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Nam molestie volutpat orci, eget iaculis erat ullamcorper a. Sed
          volutpat tellus diam, ac tempor turpis elementum ut. Proin aliquet,
          lectus non hendrerit bibendum, mauris massa condimentum metus, eu
          facilisis magna justo sed arcu. Morbi egestas sem a elit dignissim
          imperdiet. Ut vel sagittis tellus. In orci mi, finibus a lacus
          imperdiet, dignissim interdum tortor. Fusce hendrerit finibus massa,
          ac pharetra metus iaculis in. Mauris a dapibus nisi.
        </Typography>
        <Divider variant="middle" sx={{ m: 4 }} />
        <Grid
          container
          spacing={2}
          justifyContent="space-evenly"
          alignItems="stretch"
        >
          {merchContent.map((merchItem: IRing) => (
            <Grid
              key={merchItem.sys.id}
              item
              style={{ display: "flex", width: "100%" }}
              lg={4}
              md={6}
              xs={12}
            >
              <ItemCard data={merchItem} setItems={setItems} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default MerchSection;
