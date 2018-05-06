import React, {Component} from 'react';
import _ from 'lodash';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import axios from 'axios';
import moment from 'moment';
import '../index.css';
class CoinGraph extends Component{
  constructor(props){
    super(props);
    this.state={
      coinList:[],
      interval:'7d',
    };
  }
  handleClick(buttonId) {
    this.setState({
      interval:buttonId
    });


  }

 
  render(){
    let now = Date.now();
    var then;
    //var then = now - 24 * 60 * 60 * 1000 * 7; //7DAY
    if(this.state.interval=='7d'){
      then = now - 24 * 60 * 60 * 1000 * 7; //7DAY
    }else if(this.state.interval=='1d'){
      then = now - 24 * 60 * 60 * 1000 ; //1DAY
    }
    else if(this.state.interval=='1m'){
      then = now - 24 * 60 * 60 * 1000 *30; //1m
    }else if(this.state.interval=='3m'){
      then = now - 24 * 60 * 60 * 1000 *90; //3m
    }
    else if(this.state.interval=='1y'){
      then = now - 24 * 60 * 60 * 1000 *365; //1y
    }


    console.log(moment(then).format("YYYY/MM/DD/HH:MM"));
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
      <div className="chart">
        <p>Selected : {this.state.interval} </p>
        <LineChart width={1100} height={500} data={chartData1}>
          <XAxis dataKey='idd'/>
          <YAxis dataKey='price' fill='#ffffff'/>
          <CartesianGrid strokeDasharray="4 4"/>
          <Tooltip/>
          <Legend />
          <Line dataKey='price'  fill= '#ffffff'  >
          </Line>
        </LineChart>    
        <button className="btn btn-outline-info"onClick={() => this.handleClick('1d')}>1DAY </button>
        <button className="btn btn-outline-info"onClick={() => this.handleClick('7d')}>7DAY </button>
        <button className="btn btn-outline-info"onClick={() => this.handleClick('1m')}>1Month </button>
        <button className="btn btn-outline-info"onClick={() => this.handleClick('3m')}>3Month </button>
        <button className="btn btn-outline-info"onClick={() => this.handleClick('1y')}>1Year </button>
        <br/>
        <br/>
      </div>
    );
  }
  

}
  
export default CoinGraph;