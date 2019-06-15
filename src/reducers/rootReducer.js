import { combineReducers } from 'redux';
import entitiesReducer from './entitiesReducer/entities_reducer'
import errorsReducer from './errors_reducer'

export default combineReducers({
  entities: entitiesReducer,
  errors: errorsReducer
});