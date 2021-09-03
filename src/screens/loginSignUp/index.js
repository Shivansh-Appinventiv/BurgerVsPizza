import React from "react";
import Images from "../../assets";
import ReactCardFlip from "react-card-flip";
import { makeStyles } from "@material-ui/core";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

const useStyle = makeStyles((theme) => ({
  screenContainer: {
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    [theme.breakpoints.up("md")]: {
      padding: "3rem 2rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "5rem 0",
      width: "auto",
    },
  },
  outlineContainer: {
    padding: "2rem",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: "2rem",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
      maxWidth: "1400px",
      margin: "0 auto",
    },
  },
  leftWrapper: {
    width: "100%",
    marginBottom: "2rem",
    [theme.breakpoints.up("md")]: {
      marginBottom: "2rem",
      marginRight: "1rem",
    },
    [theme.breakpoints.up("lg")]: {
      width: "70%",
      marginRight: "1rem",
      marginBottom: "0",
    },
  },
  rightWrapper: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "30%",
    },
  },
  coverImg: {
    borderRadius: "2rem",
    width: "100%",
    minHeight: "100%",
    [theme.breakpoints.up("lg")]: {
      maxWidth: "100%",
    },
  },
}));

export default function Login() {
  const classes = useStyle();

  const { error, loginStatus } = useSelector((state) => state.loginSignUp);

  const [flip, setFlip] = React.useState(false);

  const handleFlip = () => {
    setFlip(!flip);
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [error]);

  return (
    <div className={classes.screenContainer}>
      {loginStatus !== "loading" ? (
        <div className={classes.outlineContainer}>
          <div className={classes.leftWrapper}>
            <img
              src={Images.LoginImages.coverBurgerVsPizza}
              alt={"coverBurgerVsPizza"}
              width={"auto"}
              height={"auto"}
              className={classes.coverImg}
            />
          </div>
          <div className={classes.rightWrapper}>
            <ReactCardFlip isFlipped={flip} containerStyle={{ height: "100%" }}>
              <LoginForm handleFlip={handleFlip} />
              <RegisterForm handleFlip={handleFlip} />
            </ReactCardFlip>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
