import { FETCH__COINS } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
  case FETCH__COINS: 
    console.log('FETCH_COINS', action.payload.data);
    return action.payload.data;
  }
  return state;
}