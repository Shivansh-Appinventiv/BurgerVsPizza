import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../authentication/firebase";
import uuid from "uuid-random";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async ({ user }, { dispatch }) => {
    await db
      .collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        if (doc.data()) {
          console.log("Hello GetUserDta");
          dispatch(setUserData({ data: doc.data() }));
        } else {
          dispatch(setErrorData());
        }
      });
  }
);

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async ({ key, value, user, cartItems }) => {
    //console.log(orders);
    await db
      .collection("users")
      .doc(user)
      .update({
        cart: {
          ...cartItems,
          [key]: { ...value },
        },
      });
  }
);

export const removeFromCart = createAsyncThunk(
  "user/removeFromCart",
  async ({ user, obj, orders }) => {
    await db
      .collection("users")
      .doc(user)
      .update({
        cart: { ...obj },
      });
  }
);

export const addToOrders = createAsyncThunk(
  "user/addToOrders",
  async ({ user, newOrder, orders, orderPrice }) => {
    console.log(newOrder, orders, user);
    await db
      .collection("users")
      .doc(user)
      .update({
        orders: [
          ...orders,
          {
            orderId: uuid(),
            items: { ...newOrder },
            orderDate: new Date().toLocaleDateString(),
            trackStatus: null,
            orderPrice,
          },
        ],
        cart: {},
      });
  }
);

export const addUserInfo = createAsyncThunk(
  "user/addUserInfo",
  async ({ values, user }) => {
    // const { firstName, lastName, phoneNo, email, address, city, state, zip } =
    //   values;
    await db
      .collection("users")
      .doc(user)
      .update({ userInfo: { ...values } });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    cartItems: {},
    orders: [],
    userInfo: {},
    getUserDataStatus: null,
    addToCartStatus: null,
    removeFromCartStatus: null,
    addToOrdersStatus: null,
    addUserInfoStatus: null,
    error: null,
  },
  extraReducers: {
    [addToCart.pending]: (state, action) => {
      state.addToCartStatus = "loading";
    },
    [addToCart.fulfilled]: (state, action) => {
      state.addToCartStatus = "success";
      state.removeFromCartStatus = null;
    },
    [addToCart.rejected]: (state, action) => {
      state.addToCartStatus = "failed";
    },
    [removeFromCart.pending]: (state, action) => {
      state.removeFromCartStatus = "loading";
    },
    [removeFromCart.fulfilled]: (state, action) => {
      state.removeFromCartStatus = "success";
    },
    [removeFromCart.rejected]: (state, action) => {
      state.removeFromCartStatus = "failed";
    },
    [addToOrders.pending]: (state, action) => {
      state.addToOrdersStatus = "loading";
    },
    [addToOrders.fulfilled]: (state, action) => {
      state.addToOrdersStaus = "success";
    },
    [addToOrders.rejected]: (state, action) => {
      state.addToOrdersStaus = "failed";
    },
    [addUserInfo.pending]: (state, action) => {
      state.addUserInfoStatus = "loading";
    },
    [addUserInfo.fulfilled]: (state, action) => {
      state.addUserInfoStatus = "success";
    },
    [addUserInfo.rejected]: (state, action) => {
      state.addUserInfoStatus = "failed";
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.getUserDataStatus = "success";
      state.cartItems = { ...action.payload?.data?.cart };
      state.orders = [...action.payload?.data.orders];
      state.userInfo = { ...action.payload?.data?.userInfo };
    },
    setErrorData: (state, action) => {
      state.error = "something went wrong....";
    },
  },
});

export const { setUserData, setErrorData } = userSlice.actions;

export default userSlice.reducer;
