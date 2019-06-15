import { combineReducers } from 'redux';
import weatherReducer from './weather_reducer'
import locationReducer from './location_reducer'
import unitReducer from './unit_reducer'

export default combineReducers({
  weather: weatherReducer,
  location: locationReducer,
  unit: unitReducer
});