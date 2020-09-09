import { combineReducers } from "redux";
import userReduce from "./auth";
import toDoReducer from "./todo.js";

export default combineReducers({
  todos: toDoReducer,
  user: userReduce,
});
