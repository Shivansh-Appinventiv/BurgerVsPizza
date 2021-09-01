import React from "react";
import { Container, Divider, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import CButton from "../../components/Controls/Button/containedButton";
import { addToOrders, addToCart, removeFromCart } from "../../redux/userSlice";

const useStyles = makeStyles((theme) => ({
  screenContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: "70px",
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "10px",
    border: "2px solid rgba(245, 104, 48, 0.2)",
    fontFamily: `"Acme",sans-serif`,
    color: "rgba(245, 104, 48, 1)",
  },
  orderLeft: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    fontSize: "20px",
  },
  orderImage: {
    height: "75px",
    width: "75px",
    borderRadius: "10px",
    marginRight: "5px",
  },
  orderText: {
    marginTop: "10px",
    fontSize: "16px",
  },
  orderQuantity: {
    marginTop: "10px",
    fontFamily: `"Acme",sans-serif`,
  },
  quantityBtn: {
    color: "rgba(245, 104, 48, 1)",
    fontSize: "20px",
    width: "90px",
    height: "30px",
    display: "flex",
    justifyContent: "space-evenly",
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
  priceTag: {
    textAlign: "right",
    marginTop: "5px",
    color: "black",
  },
  totalContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0",
    fontFamily: `"Acme",sans-serif`,
  },
  grandTotal: {
    background: "rgba(245, 104, 48, 0.2)",
    padding: "10px",
    borderRadius: "5px",
    margin: "10px 0",
  },
  emptyCartContainer: {
    width: "100%",
    height: "88vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      height: "90vh",
    },
  },
  emptyCartText: {
    padding: "10px 50px",
    border: "2px solid rgba(245, 104, 48, 1)",
    fontFamily: `"Acme",sans-serif`,
    fontSize: "20px",
    color: "rgba(245, 104, 48, 1)",
    borderRadius: "10px",
  },
}));

export default function Cart() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginSignUp);
  const { cartItems, orders } = useSelector((state) => state.user);

  const handleIncrement = ({ name, photo, price }) => {
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

  const handleDecrement = ({ name, photo, price }) => {
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
        })
      );
    }
  };

  let totalPrice = 0;
  let gst = 0;
  let deliveryCharge = 20;
  let grandTotal = 0;

  const handleCheckout = () => {
    dispatch(
      addToOrders({
        user,
        newOrder: cartItems,
        orders: orders,
        orderPrice: grandTotal,
      })
    );
  };

  return (
    <div className={classes.screenContainer}>
      <Container maxWidth={"lg"}>
        {Object.keys(cartItems).length !== 0 ? (
          <>
            {Object.values(cartItems)?.map((item, index) => {
              if (item.quantity === 0) {
                let obj = { ...cartItems };
                delete obj[item.name];
                dispatch(
                  removeFromCart({ obj: { ...obj }, user: user, orders })
                );
                return null;
              }
              totalPrice += Number(item.price) * Number(item.quantity);
              return (
                <div className={classes.orderItem} key={item.name}>
                  <div className={classes.orderLeft}>
                    <img
                      src={item.photo}
                      alt={item.name}
                      height={"auto"}
                      width={"auto"}
                      className={classes.orderImage}
                    />
                    <span className={classes.orderText}>{item.name}</span>
                  </div>
                  <div className={classes.orderQuantity}>
                    <div className={classes.quantityBtn}>
                      <button
                        className={classes.operator}
                        onClick={() =>
                          handleDecrement({
                            name: item.name,
                            photo: item.photo,
                            price: item.price,
                          })
                        }
                      >
                        <RemoveIcon />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className={classes.operator}
                        onClick={() =>
                          handleIncrement({
                            name: item.name,
                            photo: item.photo,
                            price: item.price,
                          })
                        }
                      >
                        <AddIcon />
                      </button>
                    </div>
                    <div className={classes.priceTag}>
                      <img
                        src={
                          "https://iconvulture.com/wp-content/uploads/2017/12/rupee-indian.svg"
                        }
                        alt={"rupee_symbol"}
                        height={"10px"}
                        width={"10px"}
                      />
                      {item.price}
                    </div>
                  </div>
                </div>
              );
            })}
            <Divider />
            <div className={classes.grandTotal}>
              <div className={classes.totalContainer}>
                <div>{"Item Total"}</div>
                <div>
                  <img
                    src={
                      "https://iconvulture.com/wp-content/uploads/2017/12/rupee-indian.svg"
                    }
                    alt={"rupee_symbol"}
                    height={"10px"}
                    width={"10px"}
                  />
                  {totalPrice}
                </div>
              </div>
              <div className={classes.totalContainer}>
                <div>{"Delivery Charge"}</div>
                <div>
                  <img
                    src={
                      "https://iconvulture.com/wp-content/uploads/2017/12/rupee-indian.svg"
                    }
                    alt={"rupee_symbol"}
                    height={"10px"}
                    width={"10px"}
                  />
                  {deliveryCharge}
                </div>
              </div>
              <div className={classes.totalContainer}>
                <div style={{ borderBottom: "1px dashed grey" }}>
                  {"Taxes & charges"}
                </div>
                <div>
                  <img
                    src={
                      "https://iconvulture.com/wp-content/uploads/2017/12/rupee-indian.svg"
                    }
                    alt={"rupee_symbol"}
                    height={"10px"}
                    width={"10px"}
                  />
                  {(gst = (totalPrice * 0.18).toFixed(2))}
                </div>
              </div>
              <div className={classes.totalContainer}>
                <div>{"Grand Total"}</div>
                <div>
                  <img
                    src={
                      "https://iconvulture.com/wp-content/uploads/2017/12/rupee-indian.svg"
                    }
                    alt={"rupee_symbol"}
                    height={"10px"}
                    width={"10px"}
                  />
                  {
                    (grandTotal =
                      Number(totalPrice) + Number(gst) + Number(deliveryCharge))
                  }
                </div>
              </div>
            </div>
            <Divider />
            <CButton
              fullWidth
              onClick={handleCheckout}
            >{`CheckOut (${grandTotal})`}</CButton>
          </>
        ) : (
          <div className={classes.emptyCartContainer}>
            <div className={classes.emptyCartText}>{"Cart is Empty"}</div>
          </div>
        )}
      </Container>
    </div>
  );
}
