import React, { Component } from 'react';
import { connect } from 'react-redux';


import '../index.css';
import SearchBar from './searchBar';
import {fetchCoins} from '../actions';
import { BootstrapTable, TableRow,TableHeader, TableBody, TableRowColumn, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';
import io from 'socket.io-client';
import CoinChart from './barChart';
import Timestamp from 'react-timestamp';
import CoinListHeader from '../components/CoinListHeader';
import CoinListItem from '../components/CoinListItem';
class CoinList extends Component {

  componentDidMount(){
    this.props.fetchCoins();
    console.log(this.props.coin);
    // this.getData();
 
  }
  // getData ()  {
  //   const coinDataa = this.props.coin.map(item => {
  //     let coinDatum = {};
  //     coinDatum['rank'] = item['rank'];
  //     coinDatum['symbol'] = item['code'];
  //     coinDatum['name'] = item['name'];
  //     coinDatum['market_cap_usd'] = parseInt(item['cap']);
  //     coinDatum['price_usd'] = parseFloat(item['usd']);
  //     coinDatum['24h_volume_usd'] = parseFloat(item['vol']);
  //     coinDatum['circulating_supply'] = parseFloat(item['circulating']);
  //     coinDatum['id'] = item['lname'];
  //     coinDatum['percent_change_1h'] = parseFloat(item['hpc']);
  //     coinDatum['percent_change_24h'] = parseFloat(item['dpc']);
  //     coinDatum['percent_change_7d'] = parseFloat(item['wpc']);
  //     return coinDatum;
  //   });
  //   this.setState({ coinDataa });
  // }  
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
    const dataList = (this.props.coin);
    console.log("dataList:"+dataList);
    // const coinContent =_.map(function(dataList,index){
    //   console.log("dataList1"+coinContent);
    //   const datazls = {
  
    //     "rank": dataList.rank,
    //     "price_usd":dataList.price_usd,
      
    //   };
    //   return datazls;
    // });

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


        {/* <div className="content">
  
          <BootstrapTable data={this.state.coinDataa} >
            <TableHeaderColumn dataField="rank" isKey={true} dataAlign="center" dataSort={true}>Rank</TableHeaderColumn>
            <TableHeaderColumn dataField="symbol">Symbol</TableHeaderColumn>
            <TableHeaderColumn dataField="name"  width="2em">&nbsp;</TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
            <TableHeaderColumn dataField="market_cap_usd" dataSort={true}>Market Cap</TableHeaderColumn>
            <TableHeaderColumn dataField="price_usd" dataSort={true}>Price</TableHeaderColumn>
            <TableHeaderColumn dataField="24h_volume_usd" dataSort={true}>Volume</TableHeaderColumn>
            <TableHeaderColumn dataField="total_supply"dataSort={true}>Circulating Supply</TableHeaderColumn>
            <TableHeaderColumn dataField="percent_change_1h" dataAlign="center" dataSort={true}>Change (1h)</TableHeaderColumn>
            <TableHeaderColumn dataField="percent_change_24h"  dataAlign="center" dataSort={true}>Change (24h)</TableHeaderColumn>
            <TableHeaderColumn dataField="percent_change_7d" dataAlign="center" dataSort={true}>Change (7d)</TableHeaderColumn>
          </BootstrapTable>
   */}
 
        {/* </div> */}
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