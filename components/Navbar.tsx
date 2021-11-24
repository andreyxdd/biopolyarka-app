import React from "react";
import { useMediaQuery } from "@react-hook/media-query";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMobileMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          position: "fixed",
          paddingBottom: "10px",
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
              <a href="." style={{ textDecoration: "none", color: "inherit" }}>
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
                    onMobile={false}
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
              <>
                <Tooltip title="Меню">
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleMobileMenuClick}
                    sx={{ ml: 1 }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  style={{ marginTop: "15px", marginLeft: "11px" }}
                >
                  {navLinks.map(({ navLinkId, scrollToId }) => (
                    <MenuItem
                      key={`${navLinkId}-${scrollToId}-mobile`}
                      dense
                      onClick={handleClose}
                    >
                      <NavLink
                        navLinkId={navLinkId}
                        scrollToId={scrollToId}
                        onMobile={true}
                      />
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </ClientOnlyDiv>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
