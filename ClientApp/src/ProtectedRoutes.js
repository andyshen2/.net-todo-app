
import React, { Component , useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from "react-redux";
import { getToDos, checkAuth } from "./actions";
import { withRouter } from "react-router-dom";
import { Home } from './components/Home';
import { useDispatch, useSelector } from "react-redux";


const fakeAuthCentralState = {
    
    isAuthenticated: false,
    useDispatch(getToDos){
        console.log(this.pr)
    },
    signout(callback) {
      this.isAuthenticated = false;
      setTimeout(callback, 300);
    }
  };

export function ProtectedRoute ({ component: Component, authed, ...rest }) {
   
    const dispatch = useDispatch();
    const [state, setState] = useState('loading');

    useEffect(() => {
        (async function() {
          try {

            const isUserLogged = await dispatch(checkAuth());
            setState(isUserLogged ? 'redirect' : 'loggedin');

          }
          catch {

            setState('redirect');
          }
        })();
      }, []);
    //   console.log(state)
    // if(state === 'loading') {
    //     return <span>loading..</span>
    // }
    return(
        <Route {...rest} render={(props) => (
          !sessionStorage.getItem('jwt')
            ? <Component {...props} />
            : <Redirect push to={{
                pathname: '/login',
            }} />
        )} />
    );
   
}
  



//   const mapDispatchToProps = dispatch => ({
    
//     getToDos: () => dispatch(getToDos()),
   
  
//   })
//   const mapStateToProps = function(state) {
//     console.log("state", state)
//   return {

//     todos: state.status
//   }
// }

//   export default connect(mapStateToProps, null)(ProtectedRoute);