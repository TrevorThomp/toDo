import React from "react";
import jwt from "jsonwebtoken";
import { LoginContext } from "./context.js";

const If = props => {
  return !!props.condition ? props.children : null;
};

class Auth extends React.Component {
  static contextType = LoginContext;

  render() {
    let okToRender = false;
    let user = {};

    try {
      user = this.context.token
        ? jwt.verify(this.context.token, `supersecret`)
        : {};
      console.log(user);

      okToRender =
        this.context.loggedIn &&
        (this.props.capability
          ? user.capabilities.includes(this.props.capability)
          : true);
    } catch (e) {}

    //<Auth><div /> </Auth>
    ///are you logged in
    //was there no capability specified?

    //<Auth capability="foo"> <div /> </Auth>
    ///are you logged in?
    ///is there a capability specified and that we care about
    ///do you have it -

    return (
      <If condition={okToRender}>
        <div>{this.props.children}</div>
      </If>
    );
  }
}

export default Auth;
