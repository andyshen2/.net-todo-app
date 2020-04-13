  
import { LOGIN_USER, REG_ERROR } from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case LOGIN_USER:
     console.log("TTTT");
      //console.log(action.payload.cuisines);
			return action.payload;
		default:
            return state;
        case REG_ERROR:
            console.log("auth" , action.payload.data)
            // return "FUCCCK"
            return action.payload.data;
    
	}
}