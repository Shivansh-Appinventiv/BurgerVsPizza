import React from "react";
import Schema from "../../schema";
import { Formik, Form } from "formik";
import Input from "../../components/Controls/Input";
import Button from "../../components/Controls/Button/containedButton";
import { Typography, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/loginSignUpSlice";

const useStyles = makeStyles((theme) => ({
  formStyle: {
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    padding: "0 1rem",
    borderRadius: "2rem",
    minHeight: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    textAlign: "center",
    [theme.breakpoints.up("lg")]: {
      minHeight: "100%",
    },
  },
  logoTitle: {
    textAlign: "center",
    fontFamily: `"Acme", sans-serif`,
    fontSize: "2.5rem",
    background:
      "-webkit-linear-gradient(left, green 20%, rgba(255, 166, 0), red)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1rem",
  },
  loginTitle: {
    textAlign: "center",
    color: "rgba(245, 104, 48, 0.9)",
    fontFamily: `"Acme", sans-serif`,
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  inputDiv: {
    margin: "0.5rem 0",
    "& .MuiInputBase-root": {
      fontSize: "0.80rem",
    },
    "& .MuiFormLabel-root": {
      fontSize: "0.80rem",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "green",
    },
    "& .MuiFormHelperText-root": {
      fontSize: "0.75rem",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
  },
  registerLink: {
    fontSize: "0.80rem",
  },
}));

export default function LoginForm(props) {
  const classes = useStyles();

  const { handleFlip } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const { loginStatus } = useSelector((state) => state.loginSignUp);

  const loginValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    dispatch(userLogin(values));
  };

  React.useEffect(() => {
    if (loginStatus === "success") {
      history.push("/home");
    }
  }, [loginStatus, history]);

  return (
    <Formik
      initialValues={loginValues}
      validationSchema={Schema.LoginSchema}
      onSubmit={onSubmit}
    >
      <Form className={classes.formStyle}>
        <Typography
          variant={`h1`}
          className={classes.logoTitle}
        >{`BurgerVsPizza`}</Typography>
        <Typography
          variant={`h2`}
          className={classes.loginTitle}
        >{`Login`}</Typography>
        <Input name="email" label={"Email"} styleClass={classes.inputDiv} />
        <Input
          name="password"
          label={"Password"}
          styleClass={classes.inputDiv}
        />
        <Button type={"submit"}>{"Login"}</Button>
        <Typography
          variant={`body2`}
          className={classes.registerLink}
        >{`Not a User?`}</Typography>
        <Typography
          variant={`caption`}
          className={classes.registerLink}
          style={{ color: "blue", cursor: "pointer" }}
          onClick={handleFlip}
        >
          {"Register"}
        </Typography>
      </Form>
    </Formik>
  );
}
