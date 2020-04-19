
// import React, { Component , useState, useEffect } from 'react';
// import { Route, Redirect } from 'react-router';
// import { connect } from "react-redux";
// import { getToDos, checkAuth } from "./actions";
// import { withRouter } from "react-router-dom";
// import { Home } from './components/Home';
// import { useDispatch, useSelector } from "react-redux";


// const fakeAuthCentralState = {
    
//     isAuthenticated: false,
//     useDispatch(getToDos){
//         console.log(this.pr)
//     },
//     signout(callback) {
//       this.isAuthenticated = false;
//       setTimeout(callback, 300);
//     }
//   };

// export function ProtectedRoute ({ component: Component, authed, ...rest }) {
   
//     const dispatch = useDispatch();
//     const [state, setState] = useState('loading');

//     useEffect(() => {
//         (async function() {
//           try {

//             const isUserLogged = await dispatch(checkAuth());
//             setState(isUserLogged ? 'redirect' : 'loggedin');

//           }
//           catch {

//             setState('redirect');
//           }
//         })();
//       }, []);
    
//     return(
//         <Route {...rest} render={(props) => (
//           sessionStorage.getItem('jwt')
//             ? <Component {...props} />
//             : <Redirect push to={{
//                 pathname: '/login',
//             }} />
//         )} />
//     );
   
// }

import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import  Login  from './components/Login';

export default function(Component) {
  class Authenticate extends React.Component {
    componentWillMount() {
        // if (nextProps.location !== this.props.location) {
        //     // navigated!
        //   }
        if (!sessionStorage.getItem("jwt")) {
            // console.log(nextProps.location)
          this.props.history.push("/login");
        }
    }
    componentWillReceiveProps(nextProps) {
       console.log(nextProps)
      }

    render() {
        // return <Redirect to={'/login'}/>
       
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