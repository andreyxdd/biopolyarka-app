import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Container, Typography, Divider } from "@mui/material";
import { useNavlink } from "../customHooks/useNavlink";
import CheckoutForm from "./CheckoutForm";
import { VariantType, useSnackbar } from "notistack";
import { ICheckoutFields } from "../@types/generated/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 20px 10px 120px 10px;
`;

interface ICheckoutSectionProps {
  checkoutContent: ICheckoutFields;
}

const CheckoutSection: React.FC<ICheckoutSectionProps> = ({
  checkoutContent,
}) => {
  const checkoutRef = useNavlink(checkoutContent.title);
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
        <Typography variant="h4">{checkoutContent.title}</Typography>
        <Typography component="div" variant="body1" sx={{ mt: 2, pb: 4 }}>
          {documentToReactComponents(checkoutContent.description)}
        </Typography>
        <CheckoutForm alert={alert} setAlert={setAlert} />
      </Container>
    </StyledSection>
  );
};

export default CheckoutSection;
