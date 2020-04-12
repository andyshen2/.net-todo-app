import React, { Component } from 'react';
import { loginUser } from ".././actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class Login extends Component {
//   static displayName = Counter.name;

constructor(props) {
  super(props);
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this)
;
}

  state = {
      username: "",
      password: "",
  }

  handleChange = event => {
      this.setState({
      [event.target.name]: event.target.value
      });
      
  }
  handleSubmit = event => {
      event.preventDefault()
      this.props.loginUser(this.state).then(() => {
          // this.props.history.push("/login")
      });
  }


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
                  placeholder='Username'
                  value={this.state.username}
                  onChange={this.handleChange}/>
          </label><br/>
          <label>
              Password:
              <input 
                  name="password"
                  type="password"
                  placeholder='Password'
                  value={this.state.password}
                  onChange={this.handleChange}/>
          </label><br/>
          <input type="submit" />
      </form>
    </div>
  );
}
}
const mapDispatchToProps = dispatch => ({
    
  loginUser: userInfo => dispatch(loginUser(userInfo))
})

export default connect(null, mapDispatchToProps)(withRouter(Login));