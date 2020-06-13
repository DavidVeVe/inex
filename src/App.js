import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./store/actions";

import "./App.css";

import Home from "./components/Home/Home.js";
import Manager from "./components/Manager/Manager";
import Auth from "./containers/Auth/Auth";
import Layout from "./hoc/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
  state = {
    showMenu: true,
  };

  componentDidMount() {
    this.props.autoLogin();
  }

  showMenuHandler = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    let routes = (
      <Fragment>
        <Route path="/auth" component={Auth} />
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Fragment>
    );

    if (this.props.authenticated) {
      routes = (
        <Fragment>
          <Route path="/manager" component={Manager} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={Home} />
          <Redirect to="/manager" />
        </Fragment>
      );
    }

    return (
      <Layout showMenu={this.state.showMenu}>
        <Switch>{routes}</Switch>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    authenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
