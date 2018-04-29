import React, { Component } from 'react';
import { connect } from 'react-redux';
import { accounting } from 'accounting';

class CoinList extends Component {
  renderCoin(coinData){
    return (
      <tr key={coinData.symbol}>
        <td>
          {coinData.name}
        </td>
        <td>
          ${accounting.formatNumber(coinData.market_cap_usd)}
        </td>
        <td>
          {accounting.formatMoney(coinData.price_usd)}
        </td>
        <td>
          {accounting.formatNumber(coinData.percent_change_1h)}
        </td>
        <td>
          {accounting.formatNumber(coinData.percent_change_24h)}
        </td>
        <td>
          {accounting.formatNumber(coinData.percent_change_7d)}
        </td>        
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
        <table className="table table-hover">
          <thead>
            <tr>
              <th>이름</th>
              <th>총 거래량</th>
              <th>가격</th>
              <th>번동가(1H)</th>
              <th>번동가(1D)</th>
              <th>번동가(1M)</th>
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