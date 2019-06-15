import React, { Component } from "react";
import { connect } from "react-redux";
import { requestCity } from '../actions/weather_actions'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({ query: e.target.value })
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.getCity(this.state.query, this.props.unit).then(() => {
      this.setState({query: ""});
    })
  }

  render() {
    const errors = this.props.errors.length >= 1 ? (
      <div className="error">
        {this.props.errors[0]}
      </div>
    ) : null;
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input
            className="search-bar"
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
          <button className="search-submit">Submit</button>
          <div className="example-search">
            * To Search by long and lat seperate by comma (ex. 40, 75)
          </div>
            {errors}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    unit: state.entities.unit,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => ({
  getCity: (url, unit) => dispatch(requestCity(url, unit)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
