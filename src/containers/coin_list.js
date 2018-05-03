import React, { Component } from 'react';
import { connect } from 'react-redux';
import accounting from 'accounting';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css';
import SearchBar from './searchBar';
import {fetchCoins} from '../actions';
import { BootstrapTable, TableRow,TableHeader, TableBody, TableRowColumn, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';
import io from 'socket.io-client';
import CoinIcon from  './coinIcon';
import CoinChart from './barChart';
// const last_updating= new Date(this.props.coin.last_updated*1000);
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
          <td><Link to={`/${coinData.id}`}>{accounting.formatMoney(coinData.price_usd)}</Link></td>
          <td><Link to={`/${coinData.id}`}>{accounting.formatMoney(coinData.market_cap_usd)}</Link></td>  
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

            {this.renderCoin()}   

          </tbody>
        </table>
        {/* <p> {last_updating}</p> */}
        <SearchBar/>
        <CoinChart data={this.props.coin}/>
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