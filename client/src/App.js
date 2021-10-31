import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
//Redux
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Navbar />
        <Route path="/" exact>
          <Landing />
        </Route>
        <section className="container">
          <Switch>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </section>
      </Fragment>
    </Provider>
  );
}

export default App;
