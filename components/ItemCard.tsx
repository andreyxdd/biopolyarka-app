import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

interface iItemCardProps {
  data: any;
}

const ItemCard: React.FC<iItemCardProps> = ({ data }) => {
  const { title, price, description, cardImage } = data.fields;

  return (
    <Card
      sx={{ width: "100%", borderRadius: 4 }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="400"
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
        <Button>Добавить в корзину</Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
