import React from "react";
import { LoginContext } from "./context.js";
import superagent from "superagent";

const API = `https://api-js401.herokuapp.com`;

const If = props => {
  return !!props.condition ? props.children : null;
};

class Login extends React.Component {
  static contextType = LoginContext;
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    //use the uid, pw, and superagent an API call to server for authentication
    //and capabilities
    e.preventDefault();
    superagent
      .post(`${API}/signin`)
      .auth(this.state.username, this.state.password)
      .set("mode", "cors")
      .then(response => {
        console.log(response.text);
        let token = response.text;
        this.context.login(token);
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <>
        {/* use the If component and conditionally render the login prpmpts */}
        <If condition={this.context.loggedIn}>
          <button onClick={this.context.logout}>Log Out </button>
        </If>
        <If condition={!this.context.loggedIn}>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="username"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              name="password"
              onChange={this.handleChange}
            />
            <input type="submit" value="login" />
          </form>
        </If>
      </>
    );
  }
}

export default Login;
