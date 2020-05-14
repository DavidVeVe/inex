import React from "react";

import "./Layout.css";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

const Layout = (props) => {
  return (
    <section className="layout_container">
      <Toolbar
        showMenu={props.showMenu}
        showIncome={props.showIncomeComponent}
        showExpenses={props.showExpenseComponent}
      />
      {props.children}
    </section>
  );
};

export default Layout;
