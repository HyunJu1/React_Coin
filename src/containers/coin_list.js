import React, { Component } from 'react';
import { connect } from 'react-redux';
import accounting from 'accounting';
class CoinList extends Component {


  renderCoin(coinData){
    
    const color = (i) => ({color: (i > 0 ? 'green' : 'red')});

    return (
      <tr key={coinData.index}>
        <td>{ 
          coinData.name}</td>
        <td>{accounting.formatMoney(coinData.price_usd)}</td>
        <td>{accounting.formatMoney(coinData.market_cap_usd)}</td>  
        <td style={color(coinData.percent_change_1h)}>{accounting.formatNumber(coinData.percent_change_1h)}</td>
        <td style={color(coinData.percent_change_24h)}>{accounting.formatNumber(coinData.percent_change_24h)}</td>
        <td style={color(coinData.percent_change_7d)}>{accounting.formatNumber(coinData.percent_change_7d)}</td>
      </tr>
    );
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
   
              <th>Name</th>
              <th>Price</th>
              <th>Market Cap Price</th>
              <th>Price Change(1H)</th>
              <th>Price Change(1D)</th>
              <th>Price Change(1M)</th>
            </tr>
          </thead>
          <tbody>
            {this.props.coin.map(this.renderCoin)}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) { 
  return {
    coin: state.coin
  };
}

export default connect(mapStateToProps)(CoinList); 