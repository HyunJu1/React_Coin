import React, { Component } from 'react';
import './App.css';
import axios from'axios';
import CoinList from './containers/coin_list';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptos: []
    };
  }
  
  componentDidMount() {
    //axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,DASH&tsyms=USD')
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10') 
      .then(res => {
        const cryptos = res.data;
        console.log(cryptos);
        this.setState({cryptos: cryptos});
        
      });
  }


  render(){
    return (
      <div className="content">
        <CoinList cryptos={this.state.cryptos}/>
      </div>
    );
  }
}

export default App;