import React from 'react';
import { Link } from 'react-router-dom';
import CoinIcon from '../containers/coinIcon';
import accounting from 'accounting';
import Timestamp from 'react-timestamp';

const CoinListItem = props => {
  const color =(i) => ({color: (i > 0 ? 'green' : 'red')});
 
  let coinData=props.coin;
  return(
    <tr key={coinData.id}>
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
      <td><Timestamp time={coinData.last_updated}/></td>
    </tr>
  );
};

export default CoinListItem;