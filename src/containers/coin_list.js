import React, { Component } from 'react';
import { connect } from 'react-redux';
import accounting from 'accounting';
import axios from 'axios'
import { Link } from 'react-router-dom';
import '../index.css';
import SearchBar from './search_bar';
import {fetchCoins} from '../actions';
import { BootstrapTable, TableRow,TableHeader, TableBody, TableRowColumn, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';
import io from 'socket.io-client';

const CRYPTOCOMPARE_API = "https://streamer.cryptocompare.com/"
const COINMARKET_API = "https://api.coinmarketcap.com/v1/ticker/"


class CoinList extends React.Component {

  componentDidMount(){
    this.props.fetchCoins();
    this.getAllCoins();
    console.log(this.props.coin);
 
  }
  renderCoin(){
    this.getAllCoins();
    const color = (i) => ({color: (i > 0 ? 'green' : 'red')});
    
    return _.map(this.props.coin, coinData => {
      return(
        <tr key={coinData.index}>
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




  componentWillMount() {
    this.getAllCoins();
  }

  getAllCoins () {
    // Get all available coins from CoinMarketCap API.
    axios.get(COINMARKET_API).then((response) => {
      if (response.status === 200) {

        let coins = {};

        response.data.map((coin) => {
          coins[coin.symbol] = coin;
          return null;
        });
        
        this.setState({ "coin": coins });
        this.subscribeCryptoStream();
      }
    });
  }

  subscribeCryptoStream () {
    // Subscribe to CryptoCompare websocket API.

    let subs = [];
    let cryptoIO = io.connect(CRYPTOCOMPARE_API);

    Object.keys(this.state.coin).map((key) => {
      subs.push("5~CCCAGG~"+ key +"~USD");
      return null;
    });

    cryptoIO.emit("SubAdd", { "subs": subs });
    cryptoIO.on("m", (message) => {
      this.updateCoin(message);
    });
  }

  updateCoin  (message)  {
    // Update coin with recent data from CryptoCompare websocket API.
    
    message = message.split("~");
    let coins = Object.assign({}, this.state.coin);
    
    if ((message[4] === "1") || (message[4] === "2")) {

      if (message[4] === "1") {
        coins[message[2]].goUp = true;
        coins[message[2]].goDown = false;
      }
      else if (message[4] === "2") {
        coins[message[2]].goUp = false;
        coins[message[2]].goDown = true;
      }
      else {
        coins[message[2]].goUp = false;
        coins[message[2]].goDown = false;
      }

      coins[message[2]].price_usd = message[5];
      this.setState({ "coins": coins });

      /*
        Reset coin status after short interval. This is needed to reset
        css class of tick animation when coin's value goes up or down again.
      */
      setTimeout(() => {
        coins = Object.assign({}, this.state.coin);
        coins[message[2]].goUp = false;
        coins[message[2]].goDown = false;
        this.setState({ "coins": coins });
      }, 500);

    }
  }

  getTickStyle  (coin)  {
    // Return css style based on coin status.
    if (coin.goUp) {
      return " tickGreen ";
    } else if (coin.goDown) {
      return " tickRed ";
    } else {
      return " ";
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
            {this.getAllCoins()}
            {this.renderCoin()}   

          </tbody>
        </table>
        <SearchBar/>
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