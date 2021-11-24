import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/material";
import ItemCheckoutCard from "./ItemCheckoutCard";
import { IItemProps } from "../types";
import NumberFormatCustom from "./NumberFormatCustom";
import ThemeButton from "./ThemeButton";
import { useContextTypes } from "../customHooks/useContextTypes";
import { postTelegramMessage } from "../lib/api";

interface IAlertProps {
  opened: boolean;
  status: string;
}

interface ICheckoutFormProps {
  alert: IAlertProps;
  setAlert: React.Dispatch<React.SetStateAction<IAlertProps>>;
}

const CheckoutForm: React.FC<ICheckoutFormProps> = ({ alert, setAlert }) => {
  // data from the app
  const { items, setItems } = useContextTypes();

  // form state
  const [formState, setFormState] = useState({
    disabled: false,
    fields: {
      name: {
        value: "",
        error: false,
        helperText: "",
      },
      radio: {
        value: "",
        error: false,
        helperText: "",
      },
      contact: {
        value: "",
        error: false,
        helperText: "",
      },
    },
    focusOnContact: false,
    ItemsTotalPrice: 0,
  });

  // handle methods
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.fields.radio.value) {
      // contact type is not selected
      setFormState({
        ...formState,
        fields: {
          ...formState.fields,
          radio: {
            ...formState.fields.radio,
            error: true,
            helperText: "Пожалуйста выберите вид связи",
          },
        },
        focusOnContact: true,
      });
    } else if (formState.fields.contact.value === "") {
      setFormState({
        ...formState,
        fields: {
          ...formState.fields,
          contact: {
            ...formState.fields.contact,
            error: true,
            helperText: "Пожалуйста, укажите контактную информацию",
          },
        },
      });
    } else {
      // contact type and other fields were fulfilled correctly
      // console.log("Successfully submited");

      const messageText = `👋 *Был получен новый заказ с сайта!*\n\n - Имя заказчика: ${
        formState.fields.name.value
      }\n - Связь через: ${
        formState.fields.radio.value
      }\n - Конактные данные: ${
        formState.fields.radio.value === "Email"
          ? `${formState.fields.contact.value}`
          : `+7${formState.fields.contact.value}`
      }\n - Детали заказа (${items.length} шт.): ${items
        .map((item) => item.title)
        .join(", ")}
      `;

      // sending order details to telegram bot
      postTelegramMessage(messageText)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
        })
        .then((data) => {
          //  updateting local storage
          const localStorageList = localStorage.getItem("itemsList") || "[]";
          let itemsList = JSON.parse(localStorageList);
          itemsList = [];
          localStorage.setItem("itemsList", JSON.stringify(itemsList));

          // updateting App state
          setItems([]);
          setAlert({ ...alert, opened: true, status: "success" });

          // console.log("Cleared state and local storage!");
        })
        .catch((error) => {
          setAlert({ ...alert, opened: true, status: "error" });
          console.log(process.env.TELEGRAM_BOT_TOKEN);
          console.error("Error:", error);
        });

      // console.log("Cleared state and local storage!");
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = (event.target as HTMLInputElement).value;

    if (!/^[a-zA-Zа-яА-Я\s-]*$/.test(currentValue)) {
      setFormState({
        ...formState,
        fields: {
          ...formState.fields,
          name: {
            ...formState.fields.name,
            error: true,
            helperText:
              "Пожалуйста, используйте только буквы в поле 'Ваше Имя'",
          },
        },
      });
    } else {
      setFormState({
        ...formState,
        fields: {
          ...formState.fields,
          name: {
            ...formState.fields.name,
            value: currentValue,
            error: false,
            helperText: "",
          },
        },
      });
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      fields: {
        ...formState.fields,
        radio: {
          ...formState.fields.radio,
          value: (event.target as HTMLInputElement).value,
          error: false,
          helperText: "",
        },
      },
      focusOnContact: true,
    });
  };

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = (event.target as HTMLInputElement).value;

    if (
      formState.fields.radio.value === "Email" &&
      !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        currentValue
      )
    ) {
      setFormState({
        ...formState,
        fields: {
          ...formState.fields,
          contact: {
            ...formState.fields.contact,
            error: true,
            helperText: "E-mail введен некорректно",
          },
        },
      });
    } else if (
      formState.fields.radio.value !== "Email" &&
      !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
        currentValue
      )
    ) {
      setFormState({
        ...formState,
        fields: {
          ...formState.fields,
          contact: {
            ...formState.fields.contact,
            error: true,
            helperText: "Номер телефона введен некорректно",
          },
        },
      });
    } else {
      setFormState({
        ...formState,
        fields: {
          ...formState.fields,
          contact: {
            ...formState.fields.contact,
            value: currentValue,
            error: false,
            helperText: "",
          },
        },
      });
    }
  };

  // on items change
  useEffect(() => {
    if (items.length === 0) {
      setFormState({ ...formState, disabled: true });
    } else {
      setFormState({
        ...formState,
        disabled: false,
        ItemsTotalPrice: items.reduce((a, c) => a + c?.price, 0),
      });
    }
  }, [items]);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        fullWidth
        error={
          formState.fields.name.error ||
          formState.fields.radio.error ||
          formState.fields.contact.error
        }
        component="fieldset"
        disabled={formState.disabled}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={7}>
            <TextField
              required
              fullWidth
              label="Ваше имя"
              onChange={handleNameChange}
              error={formState.fields.name.error}
              helperText={formState.fields.name.helperText}
              autoComplete="name"
              type="text"
              disabled={formState.disabled}
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
                error={formState.fields.radio.error}
                component="legend"
                disabled={formState.disabled}
                required
              >
                Связаться через:
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
                value={formState.fields.radio.value}
                onChange={handleRadioChange}
              >
                <Grid item>
                  <FormControlLabel
                    value="Telegram"
                    control={<Radio />}
                    label="Telegram"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    value="Whatsapp"
                    control={<Radio />}
                    label="Whatsapp"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    value="Звонок"
                    control={<Radio />}
                    label="Звонок"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    value="Email"
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
                formState.fields.radio.value === "Email"
                  ? "E-mail"
                  : "Мобильный телефон"
              }
              onChange={handleContactChange}
              error={formState.fields.contact.error}
              helperText={formState.fields.contact.helperText}
              autoComplete={
                formState.fields.radio.value === "Email" ? "email" : "tel-local"
              }
              InputProps={
                formState.fields.radio.value !== "Email"
                  ? {
                      inputComponent: NumberFormatCustom as any,
                    }
                  : {}
              }
              placeholder={
                formState.fields.radio.value === "Email"
                  ? "sample@email.com"
                  : ""
              }
              disabled={formState.disabled}
              type={formState.fields.radio.value === "Email" ? "email" : "tel"}
              autoFocus={formState.focusOnContact}
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
                    color: formState.disabled
                      ? "text.disabled"
                      : "text.secondary",
                  }}
                >
                  Детали заказа:
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
              {!formState.disabled && (
                <Grid item xs={12} md={7}>
                  <Typography
                    component="legend"
                    sx={{
                      color: formState.disabled
                        ? "text.disabled"
                        : "text.secondary",
                    }}
                  >
                    Итоговая сумма, руб.: {formState.ItemsTotalPrice}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={10} md={5}>
            {Object.keys(formState.fields).map((k: string, idx: number) => {
              if (formState.fields[k as keyof typeof formState.fields].error) {
                return (
                  <FormHelperText
                    key={`${Math.random() * idx}-helpertext`}
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    {
                      formState.fields[k as keyof typeof formState.fields]
                        .helperText
                    }
                  </FormHelperText>
                );
              }

              return;
            })}
            <ThemeButton fullWidth type="submit" disabled={formState.disabled}>
              Сделать заказ
            </ThemeButton>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
};

export default CheckoutForm;
