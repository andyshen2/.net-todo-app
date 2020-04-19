import React, { Component } from 'react';
import {registerUser} from ".././actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import './css/Register.css';
class Register extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    state = {
        username: "",
        password: "",
        lastName: "",
        firstName: "",
        errors: {
            firstname: '',
            lastname:'',
            username:'',
            password: '',
            general: ''
          }
    }

    handleChange = event => {

        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {

            case 'firstName': 
            errors.firstname = 
                value.length < 1
                    ? 'First name cannot be empty'
                    : '';
            break;
            case 'lastName': 
            errors.lastname = 
                value.length < 1
                    ? 'Last name can not be empty'
                    : '';
            break;
            case 'username': 
            errors.username = 
                value.length < 1
                    ? 'Username can not be empty'
                    : '';
            break;
            case 'password':
                errors.password = 
                    value.length < 1
                    ? 'Password can not be empty'
                    : '';
            
          default:
            break;
        }
      
        this.setState({errors, [name]: value});

        this.setState({
        [event.target.name]: event.target.value
        });
        
    }
    handleSubmit = event => {

        event.preventDefault()
        const { name, value } = event.target;

        let errors = this.state.errors;


        this.props.registerUser(this.state).then(e => {
            this.props.history.push("/login")
        }).catch((error) => {
            if(this.props.reg.user.message){
                errors.general = this.props.reg.user.message;
            }else{
                errors.general = "There has been an error"
            }


            this.setState({errors, [name]: value});
        });
        
    }

  render() {
      console.log(this.props)
      const {errors} = this.state;
    return (
      <div>
        <h1>Register</h1>
        {errors.general.length > 0 &&  <span  className = {'error'}>{errors.general} </span>}

        <form onSubmit={this.handleSubmit}>
            <div>
            <label>
                First Name:
                <input className = { errors.firstname.length > 0  ?   'error' : {}} 
                    name="firstName" 
                    placeholder='First Name'
                    value={this.state.firstname}
                    onChange={this.handleChange}
                    onBlur={this.handleChange} />
                    {errors.firstname.length > 0 && 
                <span  className = {'error'}>{errors.firstname} </span>}
           
            </label><br/>
            </div>
            <label>
                Last Name:
                <input className = { errors.lastname.length > 0  ?   'error' : {}} 
                    name="lastName" 
                    placeholder='Last Name'
                    value={this.state.lastname}
                    onChange={this.handleChange}
                    onBlur={this.handleChange}/>
                     {errors.lastname.length > 0 && 
                <span  className = {'error'}>{errors.lastname} </span>}
            </label><br/>
            <label>
                Username:
                <input className = { errors.username.length > 0  ?   'error' : {}} 
                    name="username" 
                    placeholder='Username'
                    value={this.state.username}
                    onChange={this.handleChange}
                    onBlur={this.handleChange}/>
                     {errors.username.length > 0 && 
                <span  className = {'error'}>{errors.username} </span>}
            </label><br/>
            <label>
                Password:
                <input className = { errors.password.length > 0  ?   'error' : {}} 
                    name="password"
                    type="password"
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    onBlur={this.handleChange}/>
                     {errors.password.length > 0 &&  <span  className = {'error'}>{errors.password} </span>}
            </label><br/>
            <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    registerUser: userInfo => dispatch(registerUser(userInfo)),
  })

  const mapStateToProps = function(state) {
      console.log("state", state)
    return {

      reg: state
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Register);