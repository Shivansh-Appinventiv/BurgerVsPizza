import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
//import { addToCart,removeFromCart } from "../../redux/cartSlice";
import { addToCart, removeFromCart } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    margin: "10px 0",
    //maxWidth: 380,
    boxShadow: "0px 0px 5px 0px rgba(245, 104, 48, 1)",
  },
  media: {
    minHeight: 200,
  },
  title: {
    color: "rgba(245, 104, 48, 1)",
    fontFamily: `"Acme",sans-serif`,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  cardActionArea: {
    background: "transparent",
    "&:hover": {
      background: "transparent",
    },
  },
  cardAction: {
    fontFamily: `"Acme",sans-serif`,
    fontSize: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartBtn: {
    fontFamily: `"Acme",sans-serif`,
    fontSize: "12px",
    color: "rgba(245, 104, 48, 1)",
    borderColor: "rgba(245, 104, 48, 1)",
    "&.MuiButton-outlined": {
      paddingTop: "2px",
      paddingBottom: "2px",
    },
  },
  quantityBtn: {
    color: "rgba(245, 104, 48, 1)",
    fontSize: "20px",
    width: "80px",
    height: "27px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(245, 104, 48, 1)",
    borderRadius: "5px",
  },
  operator: {
    width: "20px",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "rgba(245, 104, 48, 1)",
    fontSize: "18px",
    cursor: "pointer",
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const { name, photo, price, type } = props;

  const dispatch = useDispatch();
  // const { cartItems, cartStatus, removeFromCartStatus } = useSelector(
  //   (state) => state.cart
  // );
  const { user } = useSelector((state) => state.loginSignUp);
  // const { orders } = useSelector((state) => state.orders);

  //console.log(...orders);

  const { cartItems, orders } = useSelector((state) => state.user);

  const handleIncrement = () => {
    dispatch(
      addToCart({
        key: name,
        value: {
          name: name,
          photo: photo,
          price: price,
          quantity: cartItems[name]?.quantity
            ? cartItems[name]?.quantity + 1
            : 1,
        },
        user,
        cartItems,
        orders,
      })
    );
  };

  const handleDecrement = () => {
    if (cartItems[name]?.quantity - 1 === 0) {
      let obj = { ...cartItems };
      delete obj[name];
      dispatch(removeFromCart({ obj: { ...obj }, user: user, orders }));
    } else {
      dispatch(
        addToCart({
          key: name,
          value: {
            name: name,
            photo: photo,
            price: price,
            quantity: cartItems[name]?.quantity
              ? cartItems[name]?.quantity - 1
              : 0,
          },
          user,
          cartItems,
          orders,
        })
      );
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardActionArea}>
        <CardMedia className={classes.media} image={photo} title={name} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardAction}>
        <div
          style={{
            display: "flex",
            width: "70px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>&#x20b9; {price}</div>
          {type && (
            <img src={type.url} alt={type.name} height={20} width={20} />
          )}
        </div>
        {!cartItems[name]?.quantity ? (
          <Button
            variant={"outlined"}
            endIcon={<AddIcon fontSize={"small"} />}
            className={classes.cartBtn}
            onClick={handleIncrement}
          >
            {"Add"}
          </Button>
        ) : (
          <div className={classes.quantityBtn}>
            <button className={classes.operator} onClick={handleDecrement}>
              {"-"}
            </button>
            <span>{cartItems[name]?.quantity}</span>
            <button className={classes.operator} onClick={handleIncrement}>
              {"+"}
            </button>
          </div>
        )}
      </CardActions>
    </Card>
  );
}
