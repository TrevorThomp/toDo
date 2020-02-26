import React from "react";
import ToDo from "./components/todo/todo.js";
import SettingsProvider from "./context/context";
import Header from "./components/header/header";

export default function App() {
  return (
    <SettingsProvider>
      <Header />
      <ToDo />
    </SettingsProvider>
  );
}
