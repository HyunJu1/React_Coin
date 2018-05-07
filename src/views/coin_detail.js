import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {fetchCoin,fetchCoins} from '../actions';
import { connect } from "react-redux";
import CoinIcon from '../components/coinIcon';
import Timestamp from 'react-timestamp';
import CoinGraph from '../components/coinGraph';
import '../index.css';
import accounting from 'accounting';

class CoinDetail extends Component{
  componentDidMount(){
    this.props.fetchCoins();
    const { id } = this.props.match.params;
    this.props.fetchCoin(id);
    console.log('id :' +id);
    setInterval(() => {
      this.props.fetchCoin(id);
      console.log("data Update");
      
    }, 20000);
 
  }

  render(){
    const color =(i) => ({color: (i > 0 ? 'green' : 'red')});
    const {coins} = this.props;

    if (!coins){
      return( 
        <div>
          <p>Loading...</p>
        </div>
      );}
    return(
      <div>
        <div className="content">
          <br/>
          <br/>  
          <CoinIcon coinSymbol={coins.symbol} />
          <br/>
          <h3>{coins.name}</h3>
          <br/>
          <p>Symbol: {coins.symbol}</p>
          <p>Price USD: {accounting.formatMoney(coins.price_usd)} USD</p>
          <p style={color(coins.percent_change_1h)}>Price Change (1H): {coins.percent_change_1h}%</p>
          <p style={color(coins.percent_change_24h)}>Price Change (1D): {coins.percent_change_24h}%</p>
          <p style={color(coins.percent_change_7d)}>Price Change (1W): {coins.percent_change_7d}%</p>
          <p>Total Supply: {accounting.formatMoney(coins.total_supply)} </p>
          <p>24 Hour Volume: {accounting.formatMoney(coins['24h_volume_usd'])} USD</p>
          <p>Market Cap: {accounting.formatMoney(coins.market_cap_usd)} USD</p>
          <p>Available Supply: {accounting.formatMoney(coins.available_supply)}</p>
          <p>Last Updated : <Timestamp time={coins.last_updated} format='full' /></p>
          <br/>
          <Link to="/" className="btn btn-dark back">Go Back</Link>
          <br/>
          <br/>
        </div>
        <br/>
        <br/>
        <CoinGraph id={coins.id}/>
       
      </div>    
    );
  }
}

function mapStateToProps({ coin }, ownProps) {
  return { coins: coin[ownProps.match.params.id]};
}

export default connect(mapStateToProps, { fetchCoin ,fetchCoins}) (CoinDetail);
