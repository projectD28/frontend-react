import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import setAuthorizationHeader from "configs/axios/setAuthorizationHeader";

import "assets/css/style.css";

import GeustRoutes from "components/Routes/GeustRoutes";
import MemberRoute from "components/Routes/MemberRoute";

import NotFound from "pages/404";
import Unauthenticated from "pages/401";

import Login from "pages/Login";
import Register from "pages/Register";

import MyClass from "pages/MyClass";
import Joined from "pages/Joined";
import DetailsClass from "pages/DetailsClass";
import Settings from "pages/Settings";
import Transactions from "pages/Transactions";

import { populateProfile } from "store/actions/users";
import users from "constants/api/users";

function App() {
  const dispatch = useDispatch();
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

  useEffect(() => {
    let session = null;
    if (localStorage.getItem("BWAMICRO:token")) {
      session = JSON.parse(localStorage.getItem("BWAMICRO:token"));
      setAuthorizationHeader(session.token);

      users.details().then((details) => {
        dispatch(populateProfile(details.data));
      });
    }
  }, [dispatch]);
  return (
    <>
      <Router history={history}>
        <Switch>
          <GeustRoutes path="/login" component={Login}></GeustRoutes>
          <GeustRoutes path="/register" component={Register}></GeustRoutes>
          <GeustRoutes
            path="/private"
            component={Unauthenticated}
          ></GeustRoutes>

          <MemberRoute exact path="/" component={MyClass}></MemberRoute>
          <MemberRoute
            exact
            path="/joined/:class"
            component={Joined}
          ></MemberRoute>

          <MemberRoute
            exact
            path="/courses/:class/:chapter/:uid"
            component={DetailsClass}
          ></MemberRoute>
          <MemberRoute
            exact
            path="/courses/:class/"
            component={DetailsClass}
          ></MemberRoute>

          <MemberRoute path="/settings" component={Settings}></MemberRoute>
          <MemberRoute
            path="/transactions"
            component={Transactions}
          ></MemberRoute>

          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
