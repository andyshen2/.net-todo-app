import { combineReducers } from 'redux';
import userReduce from './auth';
import toDoReducer from './todo.js';
// import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
	todos: toDoReducer,
	user: userReduce,
	

});