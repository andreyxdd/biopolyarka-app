import React from "react";
import styled from "@emotion/styled";
import {
  Card,
  CardHeader,
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
import SwiperCore, { Pagination, Scrollbar, A11y } from "swiper";
SwiperCore.use([Pagination, Scrollbar, A11y]);

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
interface IItemCardProps {
  data: IRing;
  setItems: React.Dispatch<React.SetStateAction<Array<IItemProps>>>;
  id: string;
}

const StyledButton = styled(Button)`
  font-size: 13px;
  &:hover {
    background-color: #edae49;
  },
`;

const ItemCard: React.FC<IItemCardProps> = ({ data, setItems, id }) => {
  const { title, price, description, cardImages, material } = data.fields;

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
        <Swiper
          grabCursor
          keyboard={{ enabled: true }}
          pagination={{ clickable: true }}
        >
          {cardImages.map((ringImage, idx) => (
            <SwiperSlide key={`${ringImage.sys.createdAt}-${idx}`}>
              <CardMedia
                component="img"
                alt={`${title} ${material} ${description}`}
                height="300"
                image={`https:${ringImage.fields.file.url}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <style jsx>{`
          .swiper-pagination >>> .swiper-pagination-bullet {
            opacity: 1 !important;
            border: white solid 1px !important;
            background-color: transparent !important;
          }
          .swiper-pagination >>> .swiper-pagination-bullet-active {
            background-color: white !important;
          }
        `}</style>
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
        <StyledButton onClick={handleClick} color="primary" variant="contained">
          Добавить в корзину
        </StyledButton>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
