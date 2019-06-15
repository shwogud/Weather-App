import { RECEIVE_DATA } from "../../actions/weather_actions";
import { truncateTime } from '../../helpers/helpers';

const weatherReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.data.map((timeInterval)=> {
        return {
          time: truncateTime(timeInterval.dt_txt),
          humidity: timeInterval.main.humidity,
          temp: timeInterval.main.temp,
          pressure: timeInterval.main.pressure,
        }
      }).slice(0, 24)

    default:
      return state;
  }
}

export default weatherReducer;