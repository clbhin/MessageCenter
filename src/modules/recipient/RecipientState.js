import { Map } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import {SearchUsers} from '../../services/messageCenterServices';


// Initial state
const initialState = Map({ recipients: [],userInfos:[] });

// Actions
const REQUEST_ADD_RECIPIENTS='RecipientState/REQUEST_ADD_RECIPIENTS'
const REQUEST_SEARCH_USERS='RecipientState/REQUEST_SEARCH_USERS';
const RESPONSE_SEARCH_USERS='RecipientState/RESPONSE_SEARCH_USERS'
// Action creators
export function addRecipients(recipients) {
  return {
    type: REQUEST_ADD_RECIPIENTS,
    payload: recipients
  }
}

export function searchUsers(userSearchCriteria) {
  return {
    type: REQUEST_SEARCH_USERS,
    payload: userSearchCriteria
  }
}

export async function requestSearchUsers(userSearchCriteria) {
  try {
    const result = await SearchUsers(userSearchCriteria);
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
export default function RecipientStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case REQUEST_ADD_RECIPIENTS:
      return state.set('recipients', action.payload);
    
    case REQUEST_SEARCH_USERS:
      return loop(state, Effects.promise(requestSearchUsers, action.payload));
    
    case RESPONSE_SEARCH_USERS:
      return state.set('userInfos',action.payload)
      
    default:
      return state;
  }
}
