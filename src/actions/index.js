import axios from 'axios';
const ROOT_URL = "https://api.coinmarketcap.com/v1/ticker/?limit=10";

export const FETCH__COINS = 'FETCH__COINS';

export function fetchTopTenCoins(coinName) {
  const url = `${ROOT_URL}`;
  const request = axios.get(url); 

  return {
    type: FETCH__COINS,
    payload: request
  };
}