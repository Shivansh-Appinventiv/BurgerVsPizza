import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import homeBanner from "../../assets/images/homeBanner.jpg";

const useStyles = makeStyles((theme) => ({
  screenContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: "80px",
  },
  homeBannerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  bannerImage: {
    borderRadius: "10px",
    width: "100%",
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.screenContainer}>
      <Container maxWidth={"lg"}>
        <div className={classes.homeBannerContainer}>
          <img
            src={homeBanner}
            alt={"bannerPhoto"}
            height={"auto"}
            width={"auto"}
            className={classes.bannerImage}
          />
          <div>
            <Typography variant={"h5"}>
              {"This is Home Component still working on this.."}
            </Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}
