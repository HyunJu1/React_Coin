import React from 'react';

const CoinList=(props)=> {

  console.log(props);
  return (
    <div className="App">
      <br/>
      <div className="title">
        <p>
          Coin Table
        </p>
      </div>
      <br/>
      <div className="table">
        <table className="table mt-3">
          <tr>
            <th>이름</th>
            <th>가격</th>
            <th>변동가(1H)</th>
            <th>변동가(1D)</th>
            <th>변동가(1W)</th>
          </tr>
        </table>
        {props.cryptos.map((coin) => (

          <div id="crypto-container" key={props.cryptos.index}>
            <table className="table mt-3"> 
              <th>{coin.name}</th>
              <th>${coin.price_usd}</th>
              <th>{coin.percent_change_1h}</th> 
              <th>{coin.percent_change_24h}</th>
              <th>{coin.percent_change_7d}</th>    

            </table>
          </div>
        ))}
      </div>
    </div>
  );
};


export default CoinList;