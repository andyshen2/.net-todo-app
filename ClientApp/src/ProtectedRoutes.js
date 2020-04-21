

import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import  Login  from './components/Login';
import { checkAuth } from './actions';

export default function(Component) {
  class Authenticate extends React.Component {
    componentDidMount() {
            if(!this.props.isAuthenticated && !sessionStorage.getItem('jwt')){
                this.props.history.push("/login");
            }
    }
    render() {
        return <Component {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.user.isAuthenticated
    };
  }
  return connect(mapStateToProps)(Authenticate);
}