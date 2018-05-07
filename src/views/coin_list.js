import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../index.css';
import {fetchCoins} from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import CoinListHeader from '../components/CoinListHeader';
import CoinListItem from '../components/CoinListItem';

class CoinList extends Component {

  componentDidMount(){
    this.props.fetchCoins();
    console.log(this.props.coin);

    setInterval(() => {
      this.props.fetchCoins();
      console.log("data Update");
      
    }, 10000);
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
        <h5> CryptoCurrency Table</h5>        
     
        <br/>
        <table className="table table-hover">
          <CoinListHeader/>
          <tbody>
            {this.renderCoin()}   
          </tbody>
        </table>      
        <br/>
        <Link to={`/barchart`}><button type="submit" className="btn btn-dark">See BarChart(Change Price(%)) </button></Link>
        <br/>
        <br/>
        <br/>
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