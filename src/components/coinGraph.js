import React, {Component} from 'react';
import _ from 'lodash';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import axios from 'axios';
import moment from 'moment';
// import {fetchGraph} from '../actions';

class CoinGraph extends Component{
  constructor(props){
    super(props);
    this.state={
      coinList:[]
    };
  }
 
  render(){
    let now = Date.now();
    let then = now - 24 * 60 * 60 * 1000;
    let id = this.props.id;
    let url = `https://graphs2.coinmarketcap.com/currencies/${id}/${then}/${now}/`;
    axios.get(url).then(response=>{ 
      console.log(response.data.price_usd[0]);
      this.setState({
        coinList:response.data.price_usd
      });
    });
    console.log(this.state.coinList);
    var chartData1 =_.map(this.state.coinList,price => {

      return {
        
        idd : moment(price[0]).format("YYYY/MM/DD/HH:MM"),
        price :price[1],
    
      };
        
    }
    );
      
    return(
  
      <LineChart width={1200} height={500} data={chartData1}>
        <XAxis dataKey='idd'/>
        <YAxis dataKey='price' fill='#ffffff'/>
        <CartesianGrid strokeDasharray="4 4"/>
        <Tooltip/>
        <Legend />
        <Line dataKey='price'  fill= '#ffffff'  >
        </Line>
      </LineChart>    

    );
  }
  

}
  
export default CoinGraph;