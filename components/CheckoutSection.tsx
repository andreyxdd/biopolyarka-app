import React, { useState } from "react";
import styled from "@emotion/styled";
import { Container, Typography, Divider, Snackbar } from "@mui/material";
import { useNavlink } from "../customHooks/useNavlink";
import Alert from "./Alert";
import CheckoutForm from "./CheckoutForm";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 20px 10px 120px 10px;
`;

const CheckoutSection = () => {
  const checkoutRef = useNavlink("Checkout");

  // Alert state
  const [alert, setAlert] = useState({ opened: false, status: "" });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, opened: false });
  };

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
      <Snackbar
        open={alert.opened}
        autoHideDuration={6000}
        onClose={handleClose}
        sx={{ bottom: { xs: 140, sm: 150 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {alert.status === "success" ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Заказ успешно оформлен. Скоро мы с вами свяжемся!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            При оформлении заказа произошла внутрення ошибка сайта. Пожалуйста,
            обратитесь к нам через инстаграмю
          </Alert>
        )}
      </Snackbar>
    </StyledSection>
  );
};

export default CheckoutSection;
