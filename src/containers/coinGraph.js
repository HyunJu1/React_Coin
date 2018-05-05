import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {BarChart, Bar, XAxis, Cell, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import axios from 'axios';
import moment from 'moment';
const CoinGraph =props=> {
  

  // function graph(id, type){
    
  //   let now = moment.utc().valueOf();
  //   const graphList = {
  //     day: [moment.utc().subtract(1, 'day').valueOf(), now],
  //     week: [moment.utc().subtract(1, 'week').valueOf(), now],
  //     month: [moment.utc().subtract(1, 'month').valueOf(), now],
  //     quarter: [moment.utc().subtract(3, 'month').valueOf(), now],
  //     year: [moment.utc().subtract(1, 'year').valueOf(), now],
  //     all: [moment.utc().subtract(10, 'years').valueOf(), now]
  //   };
  // }
  let id = props.id;
  let url = `https://graphs2.coinmarketcap.com/currencies/${id}}/`;
  console.log(url);
  const request = axios.get(url); 
  console.log("request:"+request);


  const chartData = _.map(request, coinData => {
    return {
      // rank: parseInt(coinData.rank),
      idd : coinData.price_usd[0][0],
      price :parseFloat(coinData.price_usd[0][1]),

    };
  });
  return (
    <div>
      <br/>
      <BarChart width={1100} height={500} data={chartData}>
        <XAxis dataKey='idd'/>
        <YAxis dataKey='price' fill='#000000'/>
        <CartesianGrid strokeDasharray="4 4"/>
        <Tooltip/>
        <Legend />
        <Bar dataKey='price'  fill= '#000000'onclick={<Link to={`/id`}></Link>} >
          {chartData.map((entry,index)=>{
            const colors = entry.Price_Change_1HOUR>0?'#009900':'#ff0000';
            return <Cell fill={colors} key='idd'  />;
          })
          }
        </Bar>
      </BarChart>      
    </div>
  );
};

export default CoinGraph;