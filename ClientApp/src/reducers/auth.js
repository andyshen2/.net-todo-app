  
import { LOGIN_USER, REG_ERROR } from '../actions/types';
const initialState = {
  isAuthenticated: false,
  user: {}
};
export default function (state = {}, action) {
  
	switch (action.type) {
		case LOGIN_USER:
      console.log(action)
      if (action.payload.status = 200){
        return {isAuthenticated: true}
      }else{
        return {isAuthenticated: false}
      }
			// return action.payload;
		default:
            return state;
        case REG_ERROR:
            console.log("auth" , action.payload.data)
            // return "FUCCCK"
            return action.payload.data;
    
	}
}