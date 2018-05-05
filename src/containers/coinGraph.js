import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {LineChart, Line, XAxis, Cell, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import axios from 'axios';
import moment from 'moment';
// import {fetchGraph} from '../actions';

const CoinGraph =props=> {
  
  let now = Date.now();
  let then = now - 24 * 60 * 60 * 1000;
  let id = props.id;
  let url = `https://graphs2.coinmarketcap.com/currencies/${id}/${then}/${now}/`;

  var chartData;
  console.log(url);
  const globalCap =  axios.get(url)
    .then(function(response){
      const dataList=response.data;

      
      const chartData =dataList.map(price => {
        console.log(price);
        for(var j=0;j<100;j=j+12){
          console.log(price[0]);
          console.log(price[j][1]);
          return {
            
            idd : moment(price[0]).format("YYYY/MM/DD/HH:MM"),
            price :price[1],
            // date: moment(price[0]/1000).format("MM/YYYY")
            
          };
        
        }
      });
  
    });

  return(
 

    <LineChart width={1100} height={500} data={chartData}>
      <XAxis dataKey='idd'/>
      <YAxis dataKey='price' fill='#000000'/>
      <CartesianGrid strokeDasharray="4 4"/>
      <Tooltip/>
      <Legend />
      <Line dataKey='price'  fill= '#000000'  >

      </Line>
    </LineChart>    


  );
};
  

export default CoinGraph;