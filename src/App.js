import React, { Component } from 'react';
import './App.css';
import CoinList from './containers/coin_list';
import SearchBar from './containers/search_bar';


class App extends Component {
  render(){
    return (
      <div className="App container mt-3">
        <CoinList/>
        <SearchBar/>
      </div>
    );
  }
}

export default App;