import { RECEIVE_UNIT } from "../../actions/weather_actions";

const unitReducer = (state = "imperial", action) => {
  switch (action.type) {
    case RECEIVE_UNIT:
      return action.unit
    default:
      return state;
  }
}

export default unitReducer;