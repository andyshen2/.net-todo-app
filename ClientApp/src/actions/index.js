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
    const res = await axios.post('/users/authenticate', values);
    sessionStorage.setItem("jwt", res.data.token);

    dispatch({ type: LOGIN_USER, payload: res });

};  

export const getToDos = values => async dispatch => {
    const res = await axios.get('/todo');
    dispatch({ type: TO_DOS, payload: res.data });
}

export const deleteToDos = values => async dispatch => {
    const res = await axios.delete(`/todo/${values}`);
}

export const putToDos = values => async dispatch => {

    const res = await axios.put(`/todo/${values.id}`, values)
}

export const checkAuth  = values => async dispatch => {
    const res = await axios.post('/users/auth');

    dispatch({ type: LOGIN_USER, payload:res})
}
export const addToDo = values => async dispatch => {
    console.log(values)
    const res = await axios.post('/todo', values)

}