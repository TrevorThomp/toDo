import React from "react";
import ReactDOM from "react-dom";
import LoginContext from "./auth/context";
import App from "./app.js";

function Main() {
  return (
    <>
      <LoginContext>
        <App />
      </LoginContext>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
