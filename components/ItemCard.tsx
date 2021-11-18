import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { IRing } from "../@types/generated/contentful";
import { IItemProps } from "../types";

interface IItemCardProps {
  data: IRing;
  setItems: React.Dispatch<React.SetStateAction<Array<IItemProps>>>;
  id: string;
}

const ItemCard: React.FC<IItemCardProps> = ({ data, setItems, id }) => {
  const { title, price, description, cardImage } = data.fields;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    //  updateting local storage
    const localStorageList = localStorage.getItem("itemsList") || "[]";
    let itemsList = JSON.parse(localStorageList);
    itemsList = [...itemsList, { title, price, id }];
    localStorage.setItem("itemsList", JSON.stringify(itemsList));

    // updateting App state
    setItems((items) => [...items, { title, price, id }]);
  };

  return (
    <Card
      sx={{ width: "100%", borderRadius: 4 }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        margin: "3px",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="300"
        image={`https:${cardImage.fields.file.url}`}
      />
      <CardContent>
        <Typography variant="h6" component="div" align="center">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Стоимость: {price} руб.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Описание: {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button onClick={handleClick}>Добавить в корзину</Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
