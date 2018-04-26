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
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,DASH&tsyms=USD')
      .then(res => {
        const cryptos = res.data;
        console.log(cryptos);
        this.setState({cryptos: cryptos});
      });
  }

  render() {
    return (
      <div className="App">
        {Object.keys(this.state.cryptos).map((key) => (
          <div id="crypto-container" key="">
            <table className="table mt-3"> 
              <th>{key}</th>
              <th><NumberFormat value={this.state.cryptos[key].USD}  displayType={'text'}prefix={'$'}/> </th>        
            </table>
          </div>
        ))}
      </div>
    );
  }
}

export default App;