import React from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//component imports

import Login from "./screens/loginSignUp";
import Home from "./screens/home";
import Header from "./components/Header";
import Menu from "./screens/menu";
import Cart from "./screens/cart";
import Orders from "./screens/orders";
import Profile from "./screens/profile";

//route imports

import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//redux imports

import { auth, db } from "./authentication/firebase";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "./redux/productSlice";
import { userSession } from "./redux/loginSignUpSlice";
import { setUserData, setErrorData, setAdminOrders } from "./redux/userSlice";

function PrivateRoute(props) {
  const { component: Component, currentLink, ...rest } = props;

  //const dispatch = useDispatch();
  const { loginStatus, registerStatus, error } = useSelector(
    (state) => state.loginSignUp
  );

  const history = useHistory();

  React.useEffect(() => {
    history.push(props.path);
  }, [props.path, history]);

  React.useEffect(() => {
    if (loginStatus === "success" || registerStatus === "success") {
      toast.success(loginStatus, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [loginStatus, registerStatus]);

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

  //console.log(loginStatus,registerStatus);

  return (
    <div>
      <Route
        {...rest}
        render={() =>
          loginStatus === "success" ||
          loginStatus === "loggedIn" ||
          registerStatus === "success" ? (
            <>
              <Header currentLink={currentLink} />
              <Component />
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
            </>
          ) : (
            <Redirect to={"/"} />
          )
        }
      />
    </div>
  );
}

function LoginRoute(props) {
  const { component: Component, ...rest } = props;

  const { user, loginStatus } = useSelector((state) => state.loginSignUp);

  return (
    <div>
      <Route
        {...rest}
        render={() =>
          loginStatus !== "loggedIn" && !user ? (
            <>
              {console.log(loginStatus, user)}
              <Component />
            </>
          ) : (
            <Redirect to={"/menu"} />
          )
        }
      />
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginSignUp);

  React.useEffect(() => {
    auth.onAuthStateChanged((isUser) => {
      if (isUser) {
        dispatch(
          userSession({
            user: isUser.uid,
            status: "loggedIn",
          })
        );
      } else {
        //dispatch(userLogout());
      }
    });
  }, [dispatch]);

  React.useEffect(() => {
    if (user) {
      //console.log("App.js");
      dispatch(getProducts());

      //userData

      db.collection("users")
        .doc(user)
        .onSnapshot((doc) => {
          if (!doc.exists) {
            dispatch(setErrorData());
          } else {
            dispatch(setUserData({ ...doc.data() }));
          }
        });

      //adminOrders

      const today = new Date();
      const docId = `${today.getDate()}_${
        today.getMonth() + 1
      }_${today.getFullYear()}`;

      db.collection("orders")
        .doc(docId)
        .onSnapshot((doc) => {
          console.log(doc.data());
          dispatch(setAdminOrders({ ...doc.data() }));
        });
    }
  }, [user, dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <LoginRoute exact path={"/"} component={Login} />
          <PrivateRoute
            exact
            path={"/home"}
            component={Home}
            currentLink={"home"}
          />
          <PrivateRoute
            exact
            path={"/menu"}
            component={Menu}
            currentLink={"menu"}
          />
          <PrivateRoute
            exact
            path={"/cart"}
            component={Cart}
            currentLink={"cart"}
          />
          <PrivateRoute
            exact
            path={"/orders"}
            component={Orders}
            currentLink={"orders"}
          />
          <PrivateRoute
            exact
            path={"/profile"}
            component={Profile}
            currentLink={"profile"}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
