import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {generateRandomNumber} from '../../services/randomNumberService';

// Initial state
const initialState = Map({
  userId: ''
});

// Actions
const LOGIN = 'LoginState/LOGIN';

// Action creators
export function loginIn(userId) {
  return {type: LOGIN,payload: userId};
}



// Reducer
export default function LoginStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return state.set('userId', action.payload);

    default:
      return state;
  }
}
