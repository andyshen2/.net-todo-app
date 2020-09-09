import { TO_DOS } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case TO_DOS:
      return action.payload;

    default:
      return state;
  }
}
