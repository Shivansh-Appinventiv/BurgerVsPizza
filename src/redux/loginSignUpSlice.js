import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../authentication/firebase";

export const userLogin = createAsyncThunk(
  "loginSignUp/userLogin",
  async ({ email, password }) => {
    const res = await auth.signInWithEmailAndPassword(email, password);
    //console.log(res.user.uid);
    return res.user.uid;
  }
);

export const userRegister = createAsyncThunk(
  "loginSignUp/userRegister",
  async ({ email, password }, { dispatch }) => {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    if (res.user.uid) {
      dispatch(addUserFields({ user: res.user.uid }));
    }
    return res.user.uid;
  }
);

export const addUserFields = createAsyncThunk(
  "loginSignUp/addUserFiels",
  async ({ user }) => {
    await db
      .collection("users")
      .doc(user)
      .set({
        cart: {},
        orders: [],
        userInfo: {
          firstName: "",
          lastName: "",
          phoneNo: "",
          address: "",
          email: "",
          city: "",
          state: "",
          zip: "",
        },
      });
  }
);

const loginSignUpSlice = createSlice({
  name: "loginSignUp",
  initialState: {
    user: null,
    registerStatus: null,
    loginStatus: null,
    addUserFieldStatus: null,
    error: null,
  },
  extraReducers: {
    [userRegister.pending]: (state, action) => {
      state.registerStatus = "loading";
    },
    [userRegister.fulfilled]: (state, action) => {
      state.registerStatus = "success";
      //state.user = action.payload.error.message;
    },
    [userRegister.rejected]: (state, action) => {
      state.registerStatus = "failed";
    },
    [userLogin.pending]: (state, action) => {
      state.loginStatus = "loading";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loginStatus = "success";
      //state.user = action.payload.error.message;
    },
    [userLogin.rejected]: (state, action) => {
      state.loginStatus = "failed";
      state.error = action.error.message;
    },
    [addUserFields.pending]: (state, action) => {
      state.addUserFieldStatus = "loading";
    },
    [addUserFields.fulfilled]: (state, action) => {
      state.addUserFieldStatus = "success";
    },
    [addUserFields.rejected]: (state, action) => {
      state.addUserFieldStatus = "failed";
    },
  },
  reducers: {
    userSession: (state, action) => {
      state.user = action.payload.user;
      state.loginStatus = action.payload.status;
    },
    userLogout: (state, action) => {
      state.user = null;
      state.loginStatus = null;
      state.registerStatus = null;
    },
  },
});

export const { userSession, userLogout } = loginSignUpSlice.actions;

export default loginSignUpSlice.reducer;
