import React, { Component } from "react";
import { loginUser } from ".././actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser(this.state).then(() => {
      this.props.history.push("/to-do");
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <br />
          Not registered? Register <Link to="/register">Here</Link>
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  loginUser: (userInfo) => dispatch(loginUser(userInfo)),
});

export default withRouter(connect(null, mapDispatchToProps)(Login));
