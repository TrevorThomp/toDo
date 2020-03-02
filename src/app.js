import React from "react";
import Header from "./components/header/header";
// State Only
import ToDo from "./components/todo/todo.js";
import SettingsContext from "./context/settings";
import Login from "./auth/login";

export default class App extends React.Component {
  render() {
    return (
      <>
        <SettingsContext>
          <Login />
          <Header />
          <ToDo />
        </SettingsContext>
      </>
    );
  }
}
