import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Divider,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import { useContextTypes } from "../customHooks/useContextTypes";
import { useNavlink } from "../customHooks/useNavlink";
import ItemCheckoutCard from "./ItemCheckoutCard";
import { IItemProps } from "../types";
import NumberFormatCustom from "./NumberFormatCustom";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  background-color: lightgreen;
  padding: 100px 10px 100px 10px;
`;

const CheckoutSection = () => {
  const { items } = useContextTypes();
  const checkoutRef = useNavlink("Checkout");

  // state and methods to controll the form

  const [radioValue, setRadioValue] = useState("");
  const [helperTextRadio, setHelperTextRadio] = useState("");
  const [errorRadio, setErrorRadio] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!radioValue) {
      // contact type is not selected
      setHelperTextRadio("Please select a conact type.");
      setErrorRadio(true);
    } else {
      // contact type and other fields were fulfilled
      console.log("Successfully submited");
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    setHelperTextRadio(" ");
    setErrorRadio(false);
  };

  const [helperTextName, setHelperTextName] = useState("");
  const [errorName, setErrorName] = useState(false);
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^[a-zA-Z\s]*$/.test(event.target.value)) {
      setHelperTextName("Your name field can only contain letters");
      setErrorName(true);
    } else {
      setHelperTextName("");
      setErrorName(false);
    }
  };

  const [helperTextContact, setHelperTextContact] = useState("");
  const [errorContact, setErrorContact] = useState(false);
  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
        event.target.value
      )
    ) {
      setHelperTextContact("Entered phone number is incorrect");
      setErrorContact(true);
    } else {
      setHelperTextContact("");
      setErrorContact(false);
    }
  };

  const [disabledForm, setDisabledForm] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (items.length === 0) {
      setDisabledForm(true);
    } else {
      setDisabledForm(false);
      setTotalPrice(items.reduce((a, c) => a + c?.price, 0));
    }
  }, [items]);

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
        <form onSubmit={handleSubmit}>
          <FormControl
            fullWidth
            error={errorName || errorContact || errorRadio}
            component="fieldset"
            disabled={disabledForm}
          >
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} md={7}>
                <TextField
                  required
                  fullWidth
                  label="Ваше имя"
                  onChange={handleNameChange}
                  error={errorName}
                  helperText={helperTextName}
                  autoComplete="name"
                  type="text"
                  disabled={disabledForm}
                />
              </Grid>
              <Grid
                item
                direction="row"
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                xs={12}
              >
                <Grid item xs={12} md={7}>
                  <FormLabel
                    error={errorRadio}
                    component="legend"
                    disabled={disabledForm}
                    required
                  >
                    Connect via:
                  </FormLabel>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="space-around"
                  alignItems="center"
                  xs={12}
                >
                  <RadioGroup
                    aria-label="contact-type"
                    row
                    name="controlled-radio-buttons-group"
                    value={radioValue}
                    onChange={handleRadioChange}
                  >
                    <Grid item>
                      <FormControlLabel
                        value="telegram"
                        control={<Radio />}
                        label="Telegram"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value="whatsapp"
                        control={<Radio />}
                        label="Whatsapp"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value="call"
                        control={<Radio />}
                        label="Phone Call"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value="email"
                        control={<Radio />}
                        label="E-mail"
                      />
                    </Grid>
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid item xs={12} md={7}>
                <TextField
                  required
                  fullWidth
                  label={
                    radioValue === "email" ? "E-mail" : "Мобильный телефон"
                  }
                  onChange={handleContactChange}
                  error={errorContact}
                  helperText={helperTextContact}
                  autoComplete={radioValue === "email" ? "email" : "tel-local"}
                  InputProps={{
                    inputComponent:
                      radioValue !== "email" && (NumberFormatCustom as any),
                  }}
                  placeholder={radioValue === "email" ? "sample@email.com" : ""}
                  disabled={disabledForm}
                  type={radioValue === "email" ? "email" : "tel"}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  xs={12}
                >
                  <Grid item xs={12} md={7}>
                    <Typography
                      component="legend"
                      sx={{
                        color: disabledForm
                          ? "text.disabled"
                          : "text.secondary",
                      }}
                    >
                      Order Details:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {items.map((cartItem: IItemProps) => (
                      <ItemCheckoutCard
                        key={cartItem.id}
                        id={cartItem?.id}
                        title={cartItem?.title}
                        price={cartItem?.price}
                      />
                    ))}
                  </Grid>
                  {!disabledForm && (
                    <Grid item xs={12} md={7}>
                      <Typography
                        component="legend"
                        sx={{
                          color: disabledForm
                            ? "text.disabled"
                            : "text.secondary",
                        }}
                      >
                        Итоговая сумма, руб.: {totalPrice}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={10} md={5}>
                {errorName && (
                  <FormHelperText
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    {helperTextName}
                  </FormHelperText>
                )}
                {errorContact && (
                  <FormHelperText
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    {helperTextContact}
                  </FormHelperText>
                )}
                {errorRadio && (
                  <FormHelperText
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    {helperTextRadio}
                  </FormHelperText>
                )}
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={disabledForm}
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </Container>
    </StyledSection>
  );
};

export default CheckoutSection;
