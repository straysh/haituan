import {XLS_RESULT,XLS_UPLOADING} from "../constants";

export default function user(state = {
  data: [],
  isLoading: false,
}, action) {
  const payload = action.payload;
  switch (action.type) {
    case XLS_RESULT:
    case XLS_UPLOADING:
      return {...state, ...payload};
    default:
      return state;
  }
}
