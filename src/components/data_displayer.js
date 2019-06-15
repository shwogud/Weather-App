import React, { Component } from "react";
import { connect } from "react-redux";
import { requestCity, changeUnit } from '../actions/weather_actions'
import Chart from './chart';

class DataDisplayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "temp",
    }

    this.changeLocation = this.changeLocation.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((result) => this.changeLocation(result), null, {enableHighAccuracy: true} )
  }

  changeLocation(result) {
    const lat = result.coords.latitude;
    const lon = result.coords.longitude;
    this.props.getCity(`${lat}, ${lon}`, this.props.unit);
  }

  changeData(type) {
    return () => {
      this.setState({ type })
    }
  }

  changeUnit(unit) {
    return () => {
      this.props.changeUnit(unit)
      this.props.getCity(this.props.city[this.props.city.length - 1], unit);
    }
  }

  render() {
    let max = -Infinity;
    let min = Infinity;

    const data = this.props.weatherData.map((dataPoint) => {
      max = Math.max(max, dataPoint[this.state.type])
      min = Math.min(min, dataPoint[this.state.type])
      return { time: dataPoint.time, [this.state.type]: dataPoint[this.state.type] }
    })

    return (
      <div className="data-display">
          <div className="city-name">
            {this.props.city[this.props.city.length-1]}
          </div>
          <div className="chart">
            <Chart data={data} max={max} min={min} type={this.state.type}/>
          </div>
          <div>
            <div className="buttons" onClick={this.changeData("temp")}>
              Temperature
            </div>
            <div className="buttons" onClick={this.changeData("pressure")}>
              Pressure
            </div>
            <div className="buttons" onClick={this.changeData("humidity")}>
              Humidity
            </div>
          </div>
          <div className="buttons" onClick={this.changeUnit("imperial")}>
            Fahrenheit
          </div>
          <div className="buttons" onClick={this.changeUnit("metric")}>
            Celsius
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    weatherData: state.entities.weather,
    city: state.entities.location || [],
    unit: state.entities.unit
  };
};

const mapDispatchToProps = dispatch => ({
  getCity: (url, unit) => dispatch(requestCity(url, unit)),
  changeUnit: (unit) => dispatch(changeUnit(unit))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataDisplayer);
