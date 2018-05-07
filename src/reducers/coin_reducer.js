import { FETCH_COINS,FETCH_COIN} from '../actions/index';
import _ from 'lodash';
export default function(state = [], action) {
  console.log("ACTION", action);
  switch(action.type) { 

  case`${FETCH_COINS}_FULFILLED`:
    //console.log('action.payload.data:'+action.payload.data);
    return _.mapKeys(action.payload.data, 'id');
  // case`${FETCH_COINS}_PENDING`:
  //   return {...state,fetching:false};
  case`${FETCH_COINS}_REJECTED`:
    return {...state,fetching:false};
  
  case `${FETCH_COIN}_FULFILLED`:
    //console.log('action.payload.data.id:'+action.payload.data);
    return { ...state, [action.payload.data.id]: action.payload.data};
  // case`${FETCH_COIN}_PENDING`:
  //   return {...state,fetching:false};
  case`${FETCH_COIN}_REJECTED`:
    return {...state,fetching:false};
  
  default:
    return state;
  }
}