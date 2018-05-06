import React, {Component} from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {LineChart, Line, XAxis, Cell, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
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
  // componentWillMount(){
  //   let now = Date.now();
  //   let then = now - 24 * 60 * 60 * 1000;
  //   let id = this.props.id;
  //   let url = `https://graphs2.coinmarketcap.com/currencies/${id}/${then}/${now}/`;
  //   axios.get(url).then=(response)=>{ 
  //     console.log(response.data.price_usd[0]);
  //     this.setState({
  //       coinList:(response.data.price_usd[0])
  //     });
  //   };
  //   console.log(this.state.coinList);
  // }

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
      console.log(price);
      for(var j=0;j<100;j=j+12){
        console.log(price[0]); 
        console.log(price[1]);
        return {
          
          idd : moment(price[0]).format("YYYY/MM/DD/HH:MM"),
          price :price[1],
      
        };
          
      }
    });
      
    return(
  

      <LineChart width={1100} height={500} data={chartData1}>
        <XAxis dataKey='idd'/>
        <YAxis dataKey='price' fill='#000000'/>
        <CartesianGrid strokeDasharray="4 4"/>
        <Tooltip/>
        <Legend />
        <Line dataKey='price'  fill= '#000000'  >

        </Line>
      </LineChart>    


    );
  }
  

}
  
export default CoinGraph;