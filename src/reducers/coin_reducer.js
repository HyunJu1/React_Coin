import { FETCH__COINS,FETCH__COIN} from '../actions/index';
import _ from 'lodash';
export default function(state = [], action) {
  console.log("ACTION", action);
  switch(action.type) { 

  case`${FETCH__COINS}_FULFILLED`:
    console.log('action.payload.data:'+action.payload.data);
    return _.mapKeys(action.payload.data, 'id');
    // return action.payload.data;
  case `${FETCH__COIN}_FULFILLED`:
    console.log('action.payload.data.id:'+action.payload.data);
    return { ...state, [action.payload.data.id]: action.payload.data};
  default:
    return state;
  }
}