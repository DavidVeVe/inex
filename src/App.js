import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import Home from "./components/Home/Home.js";
import Manager from "./components/Manager/Manager";
import Auth from "./containers/Auth/Auth";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
  state = {
    showMenu: false,
    authenticated: false,
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

    this.state.authenticated
      ? (routes = (
          <Fragment>
            <Route path="/manager" component={Manager} />
            <Route exact path="/" component={Home} />
          </Fragment>
        ))
      : (routes = (
          <Fragment>
            <Route path="/auth" component={Auth} />
            <Route exact path="/" component={Home} />
          </Fragment>
        ));
    // routes = (
    //   <Fragment>
    //     <Route path="/auth" component={Auth} />
    //     <Route exact path="/" component={Home} />
    //   </Fragment>
    // );

    return (
      <Layout showMenu={this.state.showMenu}>
        <Switch>{routes}</Switch>
      </Layout>
    );
  }
}

export default App;
