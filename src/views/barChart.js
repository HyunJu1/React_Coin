import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {BarChart, Bar, XAxis, Cell, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {fetchCoins} from '../actions';
import { connect } from 'react-redux';

import '../index.css';
class BarCharts extends Component {
  componentDidMount(){
    this.props.fetchCoins();
    console.log(this.props.coin);

    setInterval(() => {
      this.props.fetchCoins();
      console.log("data Update");
      
    }, 40000);
 

  }

  render() {
    
    
    const  data  = this.props.coin;

    const chartData = _.map(data, coinData => {
      return {
        
        id : coinData.id,
        name: coinData.name,
        Price_Change_1HOUR: parseFloat(coinData.percent_change_1h),
        Price_Change_1DAY: parseFloat(coinData.percent_change_24h),
        Price_Change_1WEEK: parseFloat(coinData.percent_change_7d),

      };
    });
    return (
      <div>
        <br/>
        <h5> Comparing Change of Price (%)</h5>  
          
        <br/>
        <BarChart width={1000} height={350} data={chartData}>
          <XAxis dataKey='name'/>
          <YAxis dataKey='Price_Change_1HOUR' fill='#000000' />
          <CartesianGrid strokeDasharray="4 4"/>
          <Tooltip/>
          <Legend />
          <Bar dataKey='Price_Change_1HOUR'  fill= '#000000' >
            {chartData.map((entry)=>{
              const colors = entry.Price_Change_1HOUR>0?'#009900':'#ff0000';
              return <Cell fill={colors} key='name'   />;
            })
            }
          </Bar>
        </BarChart>
        <br/>
        <br/>
        <BarChart width={1000} height={350} data={chartData}>
          <XAxis dataKey='name'/>
          <YAxis dataKey='Price_Change_1DAY' fill='#000000'/>
          <CartesianGrid strokeDasharray="4 4"/>
          <Tooltip/>
          <Legend />
          <Bar dataKey='Price_Change_1DAY'  fill= '#000000'>
            {chartData.map((entry)=>{
              const colors = entry.Price_Change_1DAY>0?'#009900':'#ff0000';
              return <Cell fill={colors} key='name'/>;
            })
            }
          </Bar>
        </BarChart>
        <br/>
        <br/>
        <BarChart width={1000} height={350} data={chartData}>
          <XAxis dataKey='name'/>
          <YAxis dataKey='Price_Change_1WEEK' fill='#000000'/>
          <CartesianGrid strokeDasharray="4 4"/>
          <Tooltip/>
          <Legend />
          <Bar dataKey='Price_Change_1WEEK'  fill= '#000000'>
            {chartData.map((entry)=>{
              const colors = entry.Price_Change_1WEEK>0?'#009900':'#ff0000';
              return <Cell fill={colors} key='name'/>;
            })
            }
          </Bar>
        </BarChart>
        <br/>
        <Link to="/" className="btn btn-dark back">Go Home</Link>
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

export default connect(mapStateToProps,{fetchCoins})(BarCharts); 