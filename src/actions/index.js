import axios from 'axios';
const ROOT_URL = "https://api.coinmarketcap.com/v1/ticker/?limit=10";



export const FETCH_COINS = 'FETCH_COINS';
export const FETCH_COIN = 'FETCH_COIN';


export function fetchCoins() {
  const url = `${ROOT_URL}`;
  const request = axios.get(url); 

  return {
    type: FETCH_COINS,
    payload: request
  };
}
export function fetchCoin(id) {
  const request = axios.get(`${ROOT_URL}/${id}/`);

  return{
    type: FETCH_COIN,
    payload: request
  };
}
