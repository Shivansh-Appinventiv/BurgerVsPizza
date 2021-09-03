import React from "react";
import Images from "../../assets";
import MenuIcon from "@material-ui/icons/Menu";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ViewListIcon from "@material-ui/icons/ViewList";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  AppBar,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  appBar: {
    background: "white",
    boxShadow: "none",
    fontFamily: `"Acme",sans-serif`,
    fontSize: "1.5rem",
    color: "rgba(245, 104, 48, 0.7)",
    borderBottom: "1px solid rgba(245, 104, 48, 0.7)",
    height: "75px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  gridDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    height: "100%",
    padding: "0 16px",
  },
  menuIcon: {
    display: "block",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  navContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  navLinks: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderBottom: "1px solid rgba(245, 104, 48, 1)",
    padding: "5px 10px",
    [theme.breakpoints.up("sm")]: {
      borderBottom: "none",
      padding: "0px",
      height: "100%",
    },
  },
  showNav: {
    background: "white",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  hideNav: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  navText: {
    fontFamily: `"Acme",sans-serif`,
    fontSize: "18px",
  },
}));

const navLinkItems = [
  {
    linkName: "menu",
    icon: <RestaurantMenuIcon />,
    linkText: "Menu",
  },
  {
    linkName: "orders",
    icon: <ViewListIcon />,
    linkText: "Orders",
  },
  {
    linkName: "cart",
    icon: <ShoppingCartIcon />,
    linkText: "Cart",
  },
  {
    linkName: "profile",
    icon: <AccountCircleIcon />,
    linkText: "Profile",
  },
];

export default function Header(props) {
  const classes = useStyle();
  const { currentLink } = props;
  const [isNav, setIsNav] = React.useState(false);
  const history = useHistory();
  const theme = useTheme();
  const smallUp = useMediaQuery(theme.breakpoints.up("sm"));

  const openNav = () => {
    setIsNav(!isNav);
  };

  const handleLink = (link) => {
    history.push(`/${link}`);
    openNav();
  };

  return (
    <AppBar position={"fixed"} className={classes.appBar}>
      <Container
        maxWidth={smallUp ? "lg" : "xl"}
        disableGutters
        style={{ height: "100%" }}
      >
        <Grid container style={{ height: "100%" }}>
          <Grid item xs={12} sm={7} className={classes.gridDiv}>
            <div className={classes.logoDiv} onClick={() => handleLink("menu")}>
              <img
                src={Images.HeaderImages.headerLogo}
                alt={`header_logo`}
                height={50}
                width={120}
              />
              <span style={{ marginLeft: "5px" }}>{`BurgerVsPizza`}</span>
            </div>
            <MenuIcon
              fontSize={"large"}
              className={classes.menuIcon}
              onClick={openNav}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            className={isNav ? classes.showNav : classes.hideNav}
          >
            <Grid container className={classes.navContainer}>
              {navLinkItems?.map((navItem) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    className={classes.navLinks}
                    onClick={() => handleLink(navItem.linkName)}
                    key={navItem.linkName}
                    style={
                      navItem.linkName === currentLink
                        ? { borderBottom: "3px solid rgba(245, 104, 48, 1)" }
                        : { borderBottom: "3px solid transparent" }
                    }
                  >
                    {navItem.icon}
                    <Typography
                      variant={"body1"}
                      component={"div"}
                      className={classes.navText}
                    >
                      {navItem.linkText}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
}
