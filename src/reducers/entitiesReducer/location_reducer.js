import { RECEIVE_LOCATION } from "../../actions/weather_actions";
import { union } from 'lodash'

const locationReducer = (state = [], action) => {
  let newState = union([], state)
  switch (action.type) {
    case RECEIVE_LOCATION:
      newState.unshift(action.location)
      newState = newState.slice(0, 3)
      return newState
    default:
      return newState;
  }
}

export default locationReducer;