import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../authentication/firebase";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res = await db.collection("products").get();
    var products = [];
    res.forEach((cat) => {
      products.push({ id: cat.id, data: cat.data() });
    });
    //console.log(products);
    return products;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    getProductStatus: null,
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.getProductStatus = "loading";
    },
    [getProducts.fulfilled]: (state, action) => {
      console.log(action);
      state.getProductStatus = "success";
      state.products = [...action.payload];
    },
    [getProducts.rejected]: (state, action) => {
      state.getProductStatus = "failed";
    },
  },
});

export default productSlice.reducer;
