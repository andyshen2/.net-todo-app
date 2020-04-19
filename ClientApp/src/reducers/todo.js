import { TO_DOS } from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
        case TO_DOS:
            console.log(action)
            return action.payload;
        
        default:
            return state;
    }
}