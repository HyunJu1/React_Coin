import axios from 'axios';
const ROOT_URL = "https://api.coinmarketcap.com/v1/ticker/?limit=10";



export const FETCH__COINS = 'FETCH__COINS';
export const FETCH__COIN = 'FETCH__COIN';




export function fetchCoins() {
  const url = `${ROOT_URL}`;
  const request = axios.get(url); 

  return {
    type: FETCH__COINS,
    payload: request
  };
}
export function fetchCoin(id) {
  const request = axios.get(`${ROOT_URL}/${id}/`);

  return{
    type: FETCH__COIN,
    payload: request
  };
}
export function fetchGraph(id){
  let now = Date.now();
  let then = now - 24 * 60 * 60 * 1000;
  let url = `https://graphs2.coinmarketcap.com/currencies/${id}/${then}/${now}/`;
  const request=axios.get(url);
  return {
    payload:request
  };
}

