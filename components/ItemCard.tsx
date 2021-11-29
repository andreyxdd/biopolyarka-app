import React from "react";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IRing } from "../@types/generated/contentful";
import { IItemProps } from "../types";
import ClientOnlyDiv from "./ClientOnlyDiv";
import Slider from "react-slick";
import ThemeButton from "./ThemeButton";
import { useSnackbar } from "notistack";
interface IItemCardProps {
  data: IRing;
  setItems: React.Dispatch<React.SetStateAction<Array<IItemProps>>>;
  id: string;
}

const ItemCard: React.FC<IItemCardProps> = ({ data, setItems, id }) => {
  const { title, price, description, cardImages, material } = data.fields;
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    //  updateting local storage
    const localStorageList = localStorage.getItem("itemsList") || "[]";
    let itemsList = JSON.parse(localStorageList);
    itemsList = [...itemsList, { title, price, id }];
    localStorage.setItem("itemsList", JSON.stringify(itemsList));

    // updateting App state
    setItems((items) => [...items, { title, price, id }]);

    // alerting about success
    enqueueSnackbar(`Товар ${title} был успешно добавлен в корзину!`, {
      variant: "success",
    });
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          bottom: "20px",
        }}
      >
        <ul style={{ padding: "0px", margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <Card
      square
      sx={{ width: "100%" }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        margin: "3px",
        backgroundColor: "white",
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h6"
            component="div"
            align="center"
            style={{ fontWeight: 600 }}
          >
            {title}
          </Typography>
        }
      />
      <ClientOnlyDiv>
        <Slider {...settings}>
          {cardImages.map((ringImage, idx) => (
            <CardMedia
              component="img"
              alt={`${title} ${material} ${description}`}
              height="300"
              image={`https:${ringImage?.fields?.file?.url}`}
              key={`${ringImage?.sys?.createdAt}-${idx}`}
            />
          ))}
        </Slider>
      </ClientOnlyDiv>

      <CardContent>
        <Typography variant="body1" color="text.secondary">
          Стоимость: {price} руб.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Материал: {material}
        </Typography>
        {/*
        <Typography variant="body1" color="text.secondary">
          Описание: {description}
        </Typography>
          */}
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <ThemeButton onClick={handleClick}>Добавить в корзину</ThemeButton>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
