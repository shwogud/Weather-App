import { filterSearch } from '../helpers/helpers'
export const RECEIVE_CITY = "RECEIVE_CITY";
export const RECEIVE_DATA = "RECEIVE_DATA";
export const RECEIVE_LOCATION = "RECEIVE_LOCATION";
export const RECEIVE_UNIT = "RECEIVE_UNIT";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveWeatherData = (data) => dispatch => {
  dispatch({
    type: RECEIVE_DATA,
    data
  });
};

const receiveLocation = (location) => dispatch => {
  dispatch({
    type: RECEIVE_LOCATION,
    location
  });
};

export const changeUnit = (unit) => dispatch => {
  dispatch({
    type: RECEIVE_UNIT,
    unit
  });
};

export const receiveErrors = (error) => dispatch => {
  dispatch({
    type: RECEIVE_ERRORS,
    error
  });
}

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  });
}


export const requestCity = (userInput, unit) => dispatch => {
  const result = filterSearch(userInput)
  let url

  if (result.type === "city_name") {
    url = `http://api.openweathermap.org/data/2.5/forecast?q=${result.name}&units=${unit}&APPID=9e9e1e8a8e7506f75cd0306ecc541271`
  } 
  else if (result.type === "coordinates") {
    url = `http://api.openweathermap.org/data/2.5/forecast?lat=${result.lat}&lon=${result.lon}&units=${unit}&APPID=9e9e1e8a8e7506f75cd0306ecc541271`
  } 
  else if (result.type === "zip_code") {
    url = `http://api.openweathermap.org/data/2.5/forecast?zip=${result.zipCode}&units=${unit}&APPID=9e9e1e8a8e7506f75cd0306ecc541271`
  }

  if (url) {
    return fetch(url).then(resp => resp.json())
      .then(respJSON => {
        if (respJSON.cod[0] === "4") {
          dispatch(receiveErrors(respJSON.message))
        } else {
          dispatch(receiveWeatherData(respJSON.list))
          dispatch(receiveLocation(respJSON.city.name))
          dispatch(clearErrors())
        }
      })
  } else {
    return dispatch(receiveErrors("invalid input"))
  }
};