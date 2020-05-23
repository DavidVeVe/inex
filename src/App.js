import React, { useState } from "react";

import "./App.css";

import Manager from "./components/Manager/Manager";
import Layout from "./hoc/Layout/Layout";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  const showMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Layout showMenu={showMenu}>
      <Manager menuClicked={showMenuHandler} />
    </Layout>
  );
}

export default App;
