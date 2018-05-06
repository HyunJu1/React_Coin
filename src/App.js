import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import BarCharts from './views/barChart';
import CoinList from './views/coin_list';
import CoinDetail from './views/coin_detail';
import Header from './views/Header';
class App extends Component {

  render(){
    return (
      <div>
        <div className="content">
          <Header/>
        </div>
        <div className="App container mt-3">
          <Switch>
            <Route exact path='/' component={CoinList} />
            <Route path='/barchart' component={BarCharts}/>
            <Route path='/:id' component={CoinDetail}/>
            
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;