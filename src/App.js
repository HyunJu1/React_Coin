import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import CoinList from './containers/coin_list';
import CoinDetail from './containers/coin_detail';

class App extends Component {

  render(){
    return (
      <div className="App container mt-3">
        <Switch>

          <Route exact path='/' component={CoinList} />
          <Route path='/:id' component={CoinDetail}/>
        </Switch>
      </div>
    );
  }
}

export default App;