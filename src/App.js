import React from "react";
import AppRoute from './configs/AppRoute'
import { Context } from "./context/Context";

function App() {
  return (
      <Context>
      <AppRoute/>
      </Context>
  );
}
export default App;
