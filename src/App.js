import React, { useState, Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

import Manager from "./components/Manager/Manager";
import Auth from "./containers/Auth/Auth";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
  state = {
    showMenu: false,
  };
  // const [showMenu, setShowMenu] = useState(false);

  // const showMenuHandler = () => {
  //   setShowMenu(!showMenu);
  // };

  showMenuHandler = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    let routes;

    this.props.authenticated
      ? (routes = <Route path="/" component={Manager} />)
      : (routes = <Route path="/auth" component={Auth} />);

    return (
      <Layout showMenu={this.state.showMenu}>
        <Switch>{routes}</Switch>
      </Layout>
    );
  }
}

export default App;
