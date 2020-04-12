import axios from 'axios';
import {
    LOGIN_USER,
    REG_USER,
    REG_ERROR,
    TO_DOS
    
  } from "./types";

axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem("jwt");
    config.headers.Authorization = `Bearer ${token}`;
    console.log("interceptors");
    return config;
});

export const registerUser = values => async dispatch => {
    console.log(values)
    await axios.post('/users/register', values).then(e => {
        dispatch({ type: REG_USER, payload: e.data });

    }).catch(err => {
        console.log("error ", err.response.data)

        dispatch({ type: REG_ERROR, payload: err.response });
        throw new Error(err);
    });


    // dispatch(loginUser(data.user));
   
};  
export const loginUser = values => async dispatch => {
    console.log(values)
    const res = await axios.post('/users/authenticate', values);
    console.log("res", res)
    sessionStorage.setItem("jwt", res.data.token);

    console.log(sessionStorage.getItem("jwt"))
    // dispatch(loginUser(data.user));
    dispatch({ type: LOGIN_USER, payload: res.data });

};  

export const getToDos = values => async dispatch => {
    console.log("hello")
    const res = await axios.get('/todo');
    console.log("res", res)
    dispatch({ type: TO_DOS, payload: res.data });


}
