import React from "react";
import {
  Grid,
  Typography,
  Box,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import { GoTrashcan } from "react-icons/go";
import { useContextTypes } from "../customHooks/useContextTypes";
import { IItemProps } from "../types";
import { useSnackbar } from "notistack";

const ItemCheckoutCard: React.FC<IItemProps> = ({ id, title, price }) => {
  const { setItems } = useContextTypes();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    //  updateting local storage
    const localStorageList = localStorage.getItem("itemsList") || "[]";
    let itemsList = JSON.parse(localStorageList);
    itemsList = itemsList.filter((obj: IItemProps) => obj.id !== id);
    localStorage.setItem("itemsList", JSON.stringify(itemsList));

    // updateting App state
    setItems((items) => items.filter((obj: IItemProps) => obj.id !== id));

    // alerting about success
    enqueueSnackbar(`Товар ${title} был удален из корзины :(`, {
      variant: "info",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          width: "100%",
          p: 1,
          mb: 1,
        },
      }}
    >
      <Paper elevation={3}>
        <Grid
          direction="row"
          container
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item sx={{ pl: 1 }}>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="body2" align="left">
              {price} rub.
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Удалить из корзины" placement="right">
              <IconButton
                size="large"
                color="inherit"
                aria-label="trash-bin"
                onClick={handleClick}
              >
                <GoTrashcan size="0.8em" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ItemCheckoutCard;
