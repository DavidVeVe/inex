import React from "react";
import { connect } from "react-redux";

import classes from "./Home.module.css";

const home = (props) => {
  return <div className={classes.home}>This is Home</div>;
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(home);
