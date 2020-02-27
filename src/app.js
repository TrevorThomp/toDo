import React from "react";
import Header from "./components/header/header";
// State Only
import ToDo from "./components/todo/todo.js";
import SettingsContext from "./context/settings";
import Auth from "./auth/auth";
import Login from "./auth/login";

// API Connected (Live Data)

// const Read = props => {
//   return <Auth />;
// };

// const Create = props => {
//   return (
//     <Auth capability="create">
//       <h2>You can Create!</h2>
//     </Auth>
//   );
// };

// const Update = props => {
//   return (
//     <Auth capability="update">
//       <h2>You can Update!</h2>
//     </Auth>
//   );
// };

// const Delete = props => {
//   return (
//     <Auth capability="delete">
//       <h2>You can Delete!</h2>
//     </Auth>
//   );
// };

export default class App extends React.Component {
  render() {
    return (
      <>
        <SettingsContext>
          <Login />
          {/* <Read />
          <Create />
          <Update />
          <Delete /> */}
          <Header />
          <ToDo />
        </SettingsContext>
      </>
    );
  }
}
