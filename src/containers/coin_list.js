import React, { Component } from 'react';
import { connect } from 'react-redux';
import accounting from 'accounting';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css';
import SearchBar from './search_bar';
import {fetchCoins} from '../actions';
import { BootstrapTable, TableRow,TableHeader, TableBody, TableRowColumn, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';
import io from 'socket.io-client';
import CoinIcon from  './coin_icon';
import CoinChart from './chart.js';


class CoinList extends Component {

  componentDidMount(){
    this.props.fetchCoins();

    console.log(this.props.coin);
 
  }
  renderCoin(){
    const color =(i) => ({color: (i > 0 ? 'green' : 'red')});
    
    return _.map(this.props.coin, coinData => {
      return(
        
        <tr key={coinData.index}>
          <td>
 
            <CoinIcon coinSymbol={coinData.symbol} />
          </td>
          <td><Link to={`/${coinData.id}`}>
            {coinData.symbol}</Link></td>
          <td><Link to={`/${coinData.id}`}>
            {coinData.name}</Link></td>
          <td>{accounting.formatMoney(coinData.price_usd)}</td>
          <td>{accounting.formatMoney(coinData.market_cap_usd)}</td>  
          <td style={color(coinData.percent_change_1h)}>{coinData.percent_change_1h}%</td>
          <td style={color(coinData.percent_change_24h)}>{coinData.percent_change_24h}%</td>
          <td style={color(coinData.percent_change_7d)}>{coinData.percent_change_7d}%</td>
        </tr>
      );   
    });
  }
  displayPrompt(coinData) {
    if(coinData.length === 0 ){
      return ( 
        <tr>
          <td>Loading </td>
        </tr>
      );
    }
  }



  render() {
    return (
      <div>
        
        <div className="info-tab">
          <p>
            Top 10 Coins
          </p>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Image</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Market Cap Price</th>
              <th>Price Change(1H)</th>
              <th>Price Change(1D)</th>
              <th>Price Change(1M)</th>
            </tr>
          </thead>
          <tbody>
            {/* {this.getAllCoins()} */}
            {this.renderCoin()}   

          </tbody>
        </table>
        <SearchBar/>
        <CoinChart data={this.props.coin}/>;
        
        
      </div>
    );
  }
}


function mapStateToProps(state) { 
  return {
    coin: state.coin
  };
}

export default connect(mapStateToProps,{fetchCoins})(CoinList); 