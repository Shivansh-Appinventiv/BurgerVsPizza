import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  btnStyle: {
    margin: "1rem 0",
    "& .MuiButton-contained": {
      backgroundColor: "rgba(245, 104, 48, 0.9)",
      color: "white",
    },
    "& .MuiButton-root": {
      minWidth: "10rem",
      minHeight: "2rem",
    },
    "& .MuiButton-label": {
      fontFamily: `"Acme",sans-serif`,
      fontSize: "1rem",
    },
  },
}));

export default function ContainedButton(props) {
  const { children, type, onClick, ...rest } = props;
  const classes = useStyle();
  const attributes = {
    variant: "contained",
    color: "default",
    type,
    onClick,
    ...rest,
  };
  return (
    <div className={classes.btnStyle}>
      <Button {...attributes}>{children}</Button>
    </div>
  );
}
