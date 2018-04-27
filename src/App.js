import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
let NumberFormat = require('react-number-format');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptos: []
    };
  }

  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,DASH&tsyms=USD')
      .then(res => {
        const cryptos = res.data.RAW;
        console.log(cryptos);
        this.setState({cryptos: cryptos});
      
      });
  }

  render() {
    return (
      <div className="App">
        <table className="table mt-3">
          <tr>
            <th>이름</th>
            <th>가격</th>
            <th>VOLUME24HOUR</th>
          </tr>
        </table>
        {Object.keys(this.state.cryptos).map((key) => (
          <div id="crypto-container" key="">
            <table className="table mt-3"> 
              <th>{key}</th>
              <th>{'$'+this.state.cryptos[key].USD.PRICE}</th>
              <th>{this.state.cryptos[key].USD.VOLUME24HOUR}</th> 

            </table>
          </div>
        ))}
      </div>
    );
  }
}

export default App;