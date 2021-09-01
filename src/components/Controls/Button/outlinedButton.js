import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  btnStyle: {
    textAlign: "right",
    "& .MuiButton-outlined": {
      borderColor: "rgba(245, 104, 48, 0.7)",
    },
    "& .MuiButton-root": {
      color: "rgba(245, 104, 48, 1)",
      fontFamily: `"Acme",sans-serif`,
    },
  },
}));

export default function OutlinedButton(props) {
  const { children, onClick, ...rest } = props;
  const classes = useStyle();
  const attributes = {
    variant: "outlined",
    color: "default",
    ...rest,
    onClick,
  };
  return (
    <div className={classes.btnStyle}>
      <Button {...attributes}>{children}</Button>
    </div>
  );
}
