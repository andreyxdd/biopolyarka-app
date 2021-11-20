import React from "react";
import { useMediaQuery } from "@react-hook/media-query";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BsBag } from "react-icons/bs";
import NavLink from "./NavLink";
import ClientOnlyDiv from "./ClientOnlyDiv";
import { useContextTypes } from "../customHooks/useContextTypes";
import { scrollTo } from "../utils";
import { IAboutFields } from "../@types/generated/contentful";

const navLinks = [
  { navLinkId: "Brand", scrollToId: "aboutSectionId" },
  { navLinkId: "Collection", scrollToId: "collectionSectionId" },
  { navLinkId: "Checkout", scrollToId: "checkoutSectionId" },
];

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;

type INavbarProps = OptionalExceptFor<IAboutFields, "navbarTitle">;

const Navbar: React.FC<INavbarProps> = ({ navbarTitle }) => {
  const onMobile: boolean = useMediaQuery("only screen and (max-width: 750px)");

  const { items } = useContextTypes();

  const handleOnCartClick = () => {
    scrollTo({ id: "checkoutSectionId", duration: 2000 });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          position: "fixed",
          paddingBottom: "8px",
        }}
      >
        <Toolbar>
          <ClientOnlyDiv>
            <p
              className="customFont"
              style={{
                fontSize: onMobile ? "1.6em" : "2.0em",
                margin: "4px -2px -2px -2px",
              }}
            >
              <a
                href="https://www.instagram.com/biopolyarka.a/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {navbarTitle}
              </a>
            </p>
          </ClientOnlyDiv>

          <ClientOnlyDiv style={{ float: "none", marginLeft: "auto" }}>
            {!onMobile && (
              <>
                {navLinks.map(({ navLinkId, scrollToId }) => (
                  <NavLink
                    key={`${navLinkId}-${scrollToId}`}
                    navLinkId={navLinkId}
                    scrollToId={scrollToId}
                  />
                ))}
              </>
            )}
          </ClientOnlyDiv>

          <ClientOnlyDiv style={{ marginLeft: "auto", paddingTop: "5px" }}>
            <Tooltip title="Корзина">
              <Badge
                badgeContent={items.length}
                color="info"
                showZero
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="cart"
                  onClick={handleOnCartClick}
                  style={{
                    backgroundColor: "white",
                    marginBottom: "-6px",
                  }}
                >
                  <BsBag size={onMobile ? "0.8em" : "1.0em"} />
                </IconButton>
              </Badge>
            </Tooltip>

            {onMobile && (
              <Tooltip title="Меню">
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}
          </ClientOnlyDiv>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
