import React from 'react';

const CoinList=(props)=> {


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
            <th>VOLUME24HOUR</th>
          </tr>
        </table>
        {Object.keys(props.cryptos).map((key) => (
          <div id="crypto-container" key="">
            <table className="table mt-3"> 
              <th>{key}</th>
              <th>{'$'+props.cryptos[key].USD.PRICE}</th>
              <th>{props.cryptos[key].USD.VOLUME24HOUR}</th> 

            </table>
          </div>
        ))}
      </div>
    </div>
  );
};


export default CoinList;