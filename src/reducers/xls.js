import {XLS_RESULT} from "../constants";

export default function user(state = {
 data: []
}, action) {
  const payload = action.payload;
  switch (action.type) {
    case XLS_RESULT:
      return {...state, ...payload};
    default:
      return state;
  }
}
