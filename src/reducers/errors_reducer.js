import { RECEIVE_ERRORS, CLEAR_ERRORS } from "../actions/weather_actions";

const errorsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ERRORS:
      return [action.error]
    case CLEAR_ERRORS:
      return []
    default:
      return state;
  }
}

export default errorsReducer;