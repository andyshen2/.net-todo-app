

import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import  Login  from './components/Login';
import { checkAuth } from './actions';

export default function(Component) {
  class Authenticate extends React.Component {
    componentDidMount() {
            if(!this.props.isAuthenticated && sessionStorage.getItem('jwt')){
                // if (!sessionStorage.getItem("jwt")) {
                // console.log(this.props)
                console.log("projectedededede")
              this.props.history.push("/login");
              
            }
    }
 

    render() {
        // return <Redirect to={'/login'}/>
       
        return <Component {...this.props} />;
    
    }
  }
  function mapStateToProps(state) {
      console.log("state protected", state)
    return {
      isAuthenticated: state.user.isAuthenticated
    };
  }
//   const mapDispatchToProps = dispatch => ({
    
//     checkAuth: () => dispatch(checkAuth()),
  
//   })
  return connect(mapStateToProps)(Authenticate);
}