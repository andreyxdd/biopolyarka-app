import React from "react";
import styled from "@emotion/styled";
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
import ClientOnlyDiv from "./ClientOnlyDiv";

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
interface IItemCardProps {
  data: IRing;
  setItems: React.Dispatch<React.SetStateAction<Array<IItemProps>>>;
  id: string;
}

const StyledButton = styled(Button)`
  &:hover {
    background-color: #edae49;
  },
`;

const ItemCard: React.FC<IItemCardProps> = ({ data, setItems, id }) => {
  const { title, price, description, cardImage, material } = data.fields;

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
      <ClientOnlyDiv>
        <Swiper
          grabCursor
          keyboard={{ enabled: true }}
          pagination={{ clickable: true }}
          navigation
        >
          {[1, 2, 3].map((val, idx) => (
            <SwiperSlide key={val * idx}>
              <CardMedia
                component="img"
                alt={`${title} ${material} ${description}`}
                height="300"
                image={`https:${cardImage.fields.file.url}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ClientOnlyDiv>

      <CardContent>
        <Typography variant="h6" component="div" align="center">
          {title}
        </Typography>
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
        <StyledButton onClick={handleClick} color="primary" variant="contained">
          Добавить в корзину
        </StyledButton>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
