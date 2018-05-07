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
      quote:'price',
    };
  }
  handleClick(buttonId) {
    this.setState({
      interval:buttonId

    });
  }
  handleClick1(buttonId) {
    this.setState({
      quote:buttonId

    });
  }

 
  render(){
    let now = Date.now();
    var then;
    if(this.state.interval === '7d'){
      then = now - 24 * 60 * 60 * 1000 * 7; //7DAY
    }else if(this.state.interval === '1d'){
      then = now - 24 * 60 * 60 * 1000 ; //1DAY
    }
    else if(this.state.interval === '1m'){
      then = now - 24 * 60 * 60 * 1000 *30; //1m
    }else if(this.state.interval === '3m'){
      then = now - 24 * 60 * 60 * 1000 *90; //3m
    }
    else if(this.state.interval === '1y'){
      then = now - 24 * 60 * 60 * 1000 *365; //1y
    }
    

    console.log(moment(then).format("YYYY/MM/DD/HH:MM"));
    let id = this.props.id;
    let url = `https://graphs2.coinmarketcap.com/currencies/${id}/${then}/${now}/`;
    axios.get(url).then(response =>{ 
      this.setState({
        coinList : response.data
      });
    });
    if(this.state.quote==='price'){
      this.coinList1=this.state.coinList.price_usd;
    }
    else if(this.state.quote==='market_cap'){
      this.coinList1=this.state.coinList.market_cap_by_available_supply;
    }
    else if(this.state.quote==='volume'){
      this.coinList1=this.state.coinList.volume_usd;
    }
    console.log(this.state.coinList);
    var chartData1 =_.map(this.coinList1,price => {

      return {
        
        idd : moment(price[0]).format("YYYY/MM/DD/HH:MM"),
        data :price[1],
    
      };
        
    }
    );
      
    return(
      <div className="chart">
        <p>Selected about: {this.state.quote} </p>
        <p>Selected interval: {this.state.interval} </p>
        <label>
          Select [Price / Market Cap By Available Supply / Volume ] : 
          <button className="btn btn-outline-warning"onClick={() => this.handleClick1('price')}>PRICE </button>
          <button className="btn btn-outline-warning"onClick={() => this.handleClick1('market_cap')}>MARKET_CAP </button>
          <button className="btn btn-outline-warning"onClick={() => this.handleClick1('volume')}>VOLUME </button>
  
        </label>
        <LineChart width={1100} height={500} data={chartData1}>
          <XAxis dataKey='idd'/>
          <YAxis dataKey='data' fill='#ffffff'/>
          <CartesianGrid strokeDasharray="4 4"/>
          <Tooltip/>
          <Legend />
          <Line dataKey='data'  fill= '#ffffff'  >
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