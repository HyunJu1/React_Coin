import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {fetchCoin} from '../actions';
import { connect } from "react-redux";
import CoinIcon from './coin_icon';
import CoinChart from './chart.js';

import '../index.css';
class CoinDetail extends Component{
  componentDidMount(){
    const { id } = this.props.match.params;
    this.props.fetchCoin(id);
    console.log('id :' +id);
  }

  render(){
    const {coins} = this.props;
    if (!coins){
      return( 
        <div>
          <p>해당 코인이 존재하지 않습니다.</p>
          <Link to="/" className="btn btn-primary back">Go Back</Link>
        </div>
      );}
    return(
      <div>
  

        <CoinIcon coinSymbol={coins.symbol} />
        <h3>{coins.name}</h3>
    
        <p>Symbol: {coins.symbol}</p>
        <p>Price USD: {coins.price_usd}</p>
        <p>Price Change (1H): {coins.percent_change_1h}</p>
        <p>Price Change (1D): {coins.percent_change_24h}</p>
        <p>Price Change (1W): {coins.percent_change_7d}</p>
        <p>Total Supply: {coins.total_supply}</p>
        <p>Max Supply: {coins.max_supply}</p>
        <p>24 Hour Volume: {coins['24h_volume_usd']}</p>
        <p>Market Cap: {coins.market_cap_usd}</p>
        <p>Available Supply: {coins.available_supply}</p>

        <CoinChart data={coins}/>

        <Link to="/" className="btn btn-primary back">Go Back</Link>
 
      </div>    
    );
  }
}

function mapStateToProps({ coin }, ownProps) {
  return { coins: coin[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchCoin }) (CoinDetail);
