import React, { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";
// import styled from "@emotion/styled";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Badge,
  Tabs,
  Tab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { GiDiamondHard, GiShoppingCart } from "react-icons/gi";
import { ICartItemProps } from "../types";
import { scrollTo } from "../utils";

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

interface INavbarProps {
  items: Array<ICartItemProps>;
}

const Navbar: React.FC<INavbarProps> = ({ items }) => {
  const matches = useMediaQuery("only screen and (min-width: 750px)");
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabValue: number
  ) => {
    event.preventDefault();

    setTabValue(newTabValue);

    console.log("hello = ", newTabValue);

    if (newTabValue == 1) {
      scrollTo({ id: "MerchSection", duration: 1500 });
    } else if (newTabValue == 0) {
      scrollTo({ id: "aboutUsSection", duration: 1500 });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ position: "fixed" }}>
        <Toolbar>
          <GiDiamondHard size="2.5em" />
          <Typography variant="h6" component="div" sx={{ ml: 2 }}>
            <a
              href="https://www.instagram.com/biopolyarka.a/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              BIOPOLYARKA
            </a>
          </Typography>

          {matches && (
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
              centered
              indicatorColor="secondary"
              style={{ float: "none", marginLeft: "auto" }}
            >
              <Tab
                style={{ color: "white", marginRight: "35px" }}
                label="Item One"
                {...a11yProps(0)}
              />
              <Tab
                style={{ color: "white" }}
                label="Item Two"
                {...a11yProps(1)}
              />
              <Tab
                style={{ color: "white", marginLeft: "35px" }}
                label="Item Three"
                {...a11yProps(2)}
              />
            </Tabs>
          )}

          <div style={{ marginLeft: "auto", paddingTop: "5px" }}>
            <Tooltip title="Корзина">
              <IconButton size="large" color="inherit" aria-label="cart">
                <Badge badgeContent={items.length} color="secondary" showZero>
                  <GiShoppingCart size="1.2em" />
                </Badge>
              </IconButton>
            </Tooltip>
            {!matches && (
              <Tooltip title="Меню">
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2, ml: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
