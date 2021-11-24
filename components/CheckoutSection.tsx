import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Container, Typography, Divider } from "@mui/material";
import { useNavlink } from "../customHooks/useNavlink";
import CheckoutForm from "./CheckoutForm";
import { VariantType, useSnackbar } from "notistack";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 20px 10px 120px 10px;
`;

const CheckoutSection = () => {
  const checkoutRef = useNavlink("Checkout");
  const { enqueueSnackbar } = useSnackbar();

  // Alert state
  const [alert, setAlert] = useState({ opened: false, status: "" });

  useEffect(() => {
    if (alert.opened) {
      let notificationText =
        "Заказ успешно оформлен. Скоро мы с вами свяжемся!";
      if (alert.status === "error") {
        notificationText =
          "При оформлении заказа произошла внутрення ошибка сайта. Пожалуйста, обратитесь к нам через инстаграм";
      }

      enqueueSnackbar(notificationText, {
        variant: alert.status as VariantType,
      });
    }
  }, [alert]);

  return (
    <StyledSection ref={checkoutRef} id="checkoutSectionId">
      <Divider variant="middle" sx={{ m: 4 }} />
      <Container>
        <Typography variant="h4">Checkout</Typography>
        <Typography variant="body1" sx={{ mt: 2, pb: 4 }}>
          Вы можете оформить заказ, заполнив форму ниже. Выберите вид связи
          Укажите либо номер телефона для звонка или для связи в конкртеном
          мессенджере, либо email.
        </Typography>
        <CheckoutForm alert={alert} setAlert={setAlert} />
      </Container>
    </StyledSection>
  );
};

export default CheckoutSection;
