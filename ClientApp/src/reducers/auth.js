  
import { LOGIN_USER, REG_ERROR } from '../actions/types';
const initialState = {
  isAuthenticated: false,
  user: {}
};
export default function (state = {}, action) {
  
	switch (action.type) {
		case LOGIN_USER:
      if (action.payload.status = 200){
        return {isAuthenticated: true}
      }else{
        return {isAuthenticated: false}
      }
		default:
            return state;
        case REG_ERROR:
            return action.payload.data;
    
	}
}