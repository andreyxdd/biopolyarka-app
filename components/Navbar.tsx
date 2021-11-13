import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { GiDiamondHard, GiShoppingCart } from "react-icons/gi";
import { ICartItemProps } from "../types";

interface INavbarProps {
  items: Array<ICartItemProps>;
}

const Navbar: React.FC<INavbarProps> = ({ items }) => {
  const showMobile = false;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <GiDiamondHard size="2.5em" />
          <Typography variant="h6" component="div" sx={{ ml: 2 }}>
            BIOPOLYARKA
          </Typography>

          <div style={{ marginLeft: "auto", paddingTop: "5px" }}>
            <Tooltip title="Корзина">
              <IconButton size="large" color="inherit" aria-label="cart">
                <Badge badgeContent={items.length} color="secondary" showZero>
                  <GiShoppingCart size="1.2em" />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>

          {showMobile && (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
