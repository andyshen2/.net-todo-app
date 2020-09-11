import React, { Component } from "react";
import { Router, Route, Redirect, Switch } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import Login from "./components/Login";
import Register from "./components/Register";
import ToDo from "./components/ToDo";
import Protected from "./ProtectedRoutes";
import "./custom.css";
import { checkAuth } from "./actions";
import { connect } from "react-redux";
import { withRouter, BrowserRouter } from "react-router-dom";

class App extends Component {
  static displayName = App.name;
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/counter" component={Counter} />
            <Route path="/fetch-data" component={FetchData} />
            <Route
              path="/register"
              component={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/to-do"
              component={Protected((props) => (
                <ToDo {...props} />
              ))}
            />
            <Route
              exact
              path="/login"
              component={(props) => <Login {...props} />}
            />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  checkAuth: () => dispatch(checkAuth()),
});

const mapStateToProps = function (state) {
  return {
    state: state.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
