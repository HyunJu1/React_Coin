import React, { Component } from 'react';
import _ from 'lodash';

import {BarChart, Bar, XAxis, Cell, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
class CoinChart extends Component {
  
  render() {
    
    
    const { data } = this.props;
    const chartData = _.map(data, coinData => {
      return {
        // rank: parseInt(coinData.rank),
        name: coinData.name,
        Price_Change_1h: parseFloat(coinData.percent_change_1h),
        // color: (coinData.percent_change_1h > 0 ? "#009900" : "#ff0000"),
      };
    });
    return (
      <div>
        <br/>
        <BarChart width={1100} height={500} data={chartData}>
          <XAxis dataKey='name'/>
          <YAxis dataKey='Price_Change_1h' fill='#000000'/>
          <CartesianGrid strokeDasharray="4 4"/>
          <Tooltip/>
          <Legend />
          <Bar dataKey='Price_Change_1h'  fill= '#000000'>
            {chartData.map((entry,index)=>{
              const colors = entry.Price_Change_1h>0?'#009900':'#ff0000';
              return <Cell fill={colors} key='name'/>;
            })
            }
          </Bar>
        </BarChart>
      </div>
    );
  }
}

export default CoinChart;