import React, { Component } from 'react';
import { connect } from 'react-redux';


import '../index.css';
import SearchBar from './searchBar';
import {fetchCoins} from '../actions';
import { BootstrapTable, TableRow,TableHeader, TableBody, TableRowColumn, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';
import io from 'socket.io-client';
import CoinIcon from  './coinIcon';
import CoinChart from './barChart';
import Timestamp from 'react-timestamp';
import CoinListHeader from '../components/CoinListHeader';
import CoinListItem from '../components/CoinListItem';
class CoinList extends Component {

  componentDidMount(){
    this.props.fetchCoins();

    console.log(this.props.coin);
 
  }
  renderCoin(){
 
    return _.map(this.props.coin, coinData => {
      return(
        <CoinListItem coin={coinData}/>
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
            <br/>
              (Last Updated : <Timestamp time={this.props.coin.last_updated} format='full' /> )
          </p>
          
        </div>
        <table className="table table-hover">
          <CoinListHeader/>
          <tbody>

            {this.renderCoin()}   

          </tbody>
        </table>
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