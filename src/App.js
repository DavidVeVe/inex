import React, { useState } from "react";

import "./App.css";

import ItemsManager from "./containers/ItemsManager/ItemsManager";
import Layout from "./hoc/Layout/Layout";

function App() {
  const [option, setOption] = useState({
    income: true,
    expense: false,
  });

  const [showMenu, setShowMenu] = useState(false);

  const showIncomeHandler = () => {
    setOption({
      income: true,
      expense: false,
    });
  };

  const showExpensesHandler = () => {
    setOption({
      income: false,
      expense: true,
    });
  };

  const showMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Layout
      showMenu={showMenu}
      showIncomeComponent={showIncomeHandler}
      showExpenseComponent={showExpensesHandler}
    >
      <ItemsManager
        menuClicked={showMenuHandler}
        incomeVersion={option.income}
      />
    </Layout>
  );
}

export default App;
