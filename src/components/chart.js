import React, { Component } from 'react';
import { LineChart, Line, YAxis, Tooltip, XAxis, CartesianGrid, Legend } from 'recharts';

export default class Chart extends Component {
  render() {
    const width = window.innerWidth * 0.65;
    const height = window.innerHeight * 0.5;
    let line1 = <Line type="monotone" dataKey={this.props.type} stroke="#4166f5" dot={false} strokeWidth={4} />

    return (
      <>
        <LineChart width={width} height={height} data={this.props.data}>
          {line1}
          <XAxis dataKey="time"/>
          <YAxis domain={[this.props.min - 10, this.props.max + 10]} />
          <Tooltip />
        </LineChart>
      </>
    )
  }
}