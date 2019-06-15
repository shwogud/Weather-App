import React, { Component } from 'react';
import './App.css';

import SearchBar from './components/searchbar'
import DataDisplayer from './components/data_displayer'


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
        <DataDisplayer />
      </div>
    );
  }
}

