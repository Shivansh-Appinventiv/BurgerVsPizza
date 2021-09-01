import { Breadcrumbs, Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyle = makeStyles((theme) => ({
  breadWrapper: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    //backgroundColor: "lightgrey"
  },
  linkItems: {
    color: "rgba(245, 104, 48, 0.7)",
    //fontWeight: "bold",
    fontFamily: `"Acme",sans-serif`,
    "&:hover": {
      textDecoration: "none",
      //color: "rgba(245, 104, 48, 1))",
      //fontWeight: "normal",
    },
  },
  currentLink: {
    color: "rgba(245, 104, 48, 1)",
    fontWeight: "bold",
    fontFamily: `"Acme",sans-serif`,
  },
  separator: {
    fontWeight: "bold",
    //color: "black",
  },
}));

export default function Navigator(props) {
  const classes = useStyle();
  const { currentLink } = props;
  return (
    <div className={classes.breadWrapper}>
      <Breadcrumbs
        separator={
          <NavigateNextIcon fontSize="small" className={classes.separator} />
        }
        aria-label="breadcrumb"
      >
        <Link color="inherit" href="/home" className={classes.linkItems}>
          {"Home"}
        </Link>
        <Typography color="textPrimary" className={classes.currentLink}>
          {currentLink}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
