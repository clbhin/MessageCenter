import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {generateRandomNumber} from '../../services/randomNumberService';
import { SearchUsers } from '../../services/messageCenterServices';

// Initial state
const initialState = Map({
  userId: '', users: {}
});

// Actions
const LOGIN = 'LoginState/LOGIN';
const SEARCHUSERS_REQUEST = 'LoginState/SEARCHUSERS_REQUEST';
const SEARCHUSERS_RESPONSE = 'LoginState/SEARCHUSERS_RESPONSE';

// Action creators
export function loginIn(userId) {
  return {type: LOGIN,payload: userId};
}

export function searchUsers(searchCriteria) {
  return { type: SEARCHUSERS_REQUEST, payload: searchCriteria };
}

export async function requestSearchUsers(searchCriteria) {
  try {
    const result =
      await SearchUsers(searchCriteria);
    return {
      type: SEARCHUSERS_RESPONSE,
      payload: result.ModelObject
    }
  } catch (err) {
    return {
      type: SEARCHUSERS_RESPONSE,
      payload: []
    }
  }
}

// Reducer
export default function LoginStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return state.set('userId', action.payload);
    case SEARCHUSERS_REQUEST:
      return loop(state, Effects.promise(requestSearchUsers, action.payload));
    case SEARCHUSERS_RESPONSE:
      return state.set('users', [...action.payload]);
    default:
      return state;
  }
}
