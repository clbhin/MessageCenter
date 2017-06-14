import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {generateRandomNumber} from '../../services/randomNumberService';
import {SearchUsers} from '../../services/messageCenterServices';

// Initial state
const initialState = Map({
  userInfo: {},
  users: []
});

// Actions
const LOGIN = 'LoginState/LOGIN';
const REQUEST_SEARCH_USERS = 'LoginState/REQUEST_SEARCH_USERS';
const RESPONSE_SEARCH_USERS = 'LoginState/RESPONSE_SEARCH_USERS';

// Action creators
export function loginIn(loginUserInfo) {
  return {type: LOGIN, payload: loginUserInfo};
}

export function searchUsers(searchCriteria) {
  return {type: REQUEST_SEARCH_USERS, payload: searchCriteria};
}

export async function requestSearchUsers(searchCriteria) {
  try {
    const result = await SearchUsers(searchCriteria);
    let allUsers=[]
    result.ModelObject.map((item,i)=>{
      allUsers.push({'PersonName':item.FullName,'Id':item.Id})
    })
    return {type: RESPONSE_SEARCH_USERS, payload: allUsers}
  } catch (err) {
    return {type: RESPONSE_SEARCH_USERS, payload: []}
  }
}

// Reducer
export default function LoginStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return state.set('userInfo', {'Id':action.payload.Id,'PersonName':action.payload.PersonName})
    case REQUEST_SEARCH_USERS:
      return loop(state, Effects.promise(requestSearchUsers, action.payload));
    case RESPONSE_SEARCH_USERS:
      return state.set('users', [...action.payload]);
    default:
      return state;
  }
}
