import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../index.css';
import SearchBar from './searchBar';
import {fetchCoins} from '../actions';
import { BootstrapTable, TableRow,TableHeader, TableBody, TableRowColumn, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';
import CoinChart from './barChart';
import CoinListHeader from '../components/CoinListHeader';
import CoinListItem from '../components/CoinListItem';


class CoinList extends Component {

  componentDidMount(){
    this.props.fetchCoins();
    console.log(this.props.coin);

    setInterval(() => {
      this.props.fetchCoins();
      console.log("data Update");
      
    }, 40000);
 

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
    const dataList = (this.props.coin);
    console.log("dataList:"+dataList);

    return (
      <div>        
        <br/>
        <br/><br/>
        <table className="table table-hover">
          <CoinListHeader/>
          <tbody>

            {this.renderCoin()}   

          </tbody>
        </table>
      
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