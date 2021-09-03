import React from "react";
import { Container, Divider, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

const useStyles = makeStyles((theme) => ({
  screenContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: "80px",
  },
  orderContainer: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    margin: "10px 0",
    border: "1px solid lightgrey",
  },
  itemContainer: {
    display: "flex",
    margin: "2px 0",
    borderBottom: "2px solid orange",
  },
}));

export default function Orders() {
  const classes = useStyles();
  const { orders, getUserDataStatus } = useSelector((state) => state.user);

  //console.log([...orders].reverse());
  return (
    <div className={classes.screenContainer}>
      {getUserDataStatus === "success" ? (
        <Container maxWidth={"lg"}>
          {[...orders]?.reverse()?.map((order, index) => {
            //console.log(order, Object.values(order));
            return (
              <div className={classes.orderContainer} key={`order_${index}`}>
                <div>{`OrderId: ${order?.orderId}`}</div>
                <Divider style={{ margin: "10px 0" }} />
                {Object.values(order?.items).map((item) => {
                  //console.log(item);
                  return (
                    <div className={classes.itemContainer} key={item?.name}>
                      <div style={{ marginRight: "10px" }}>
                        <img
                          src={item?.photo}
                          alt={item?.name}
                          height={50}
                          width={50}
                        />
                      </div>
                      <div>
                        <div>{item?.name}</div>
                        <div>{item?.price}</div>
                        <div>
                          {"Qty : "}
                          {item?.quantity}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "10px 0",
                  }}
                >
                  <div>{`Order Price: ${order?.orderPrice}`}</div>
                  <div>{order?.orderDate}</div>
                </div>
              </div>
            );
          })}
        </Container>
      ) : (
        <Loader />
      )}
    </div>
  );
}
