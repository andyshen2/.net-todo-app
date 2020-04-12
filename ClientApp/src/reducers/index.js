import { combineReducers } from 'redux';
import userReduce from './auth';

// import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
	
	user: userReduce,

});