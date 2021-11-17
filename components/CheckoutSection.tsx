import styled from "@emotion/styled";
import React from "react";
import { Grid, Container, Typography, Divider, TextField } from "@mui/material";
import { useContextTypes } from "../customHooks/useContextTypes";
import { useNavlink } from "../customHooks/useNavlink";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  background-color: lightgreen;
  padding: 100px 10px 100px 10px;
`;

const CheckoutSection = () => {
  const { items } = useContextTypes();
  const checkoutRef = useNavlink("Checkout");

  return (
    <StyledSection ref={checkoutRef} id="CheckoutSectionId">
      <Container>
        <Typography variant="h4">Сделать заказ</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Вы можете оформить заказ, заполнив форму ниже. Выберите вид связи
          Укажите либо номер телефона для звонка или для связи в конкртеном
          мессенджере, либо email.
        </Typography>
        <Divider variant="middle" sx={{ m: 4 }} />
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              required
              defaultValue="Ваше имя"
              fullWidth
              label="Ваше имя"
            />
          </Grid>
          <Grid item xs={12}>
            {items.length}
          </Grid>
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default CheckoutSection;
