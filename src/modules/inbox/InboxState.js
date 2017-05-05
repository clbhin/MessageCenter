import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {GetMessages} from './../../services/messageCenterServices';

// Initial state
const initialState = Map({value: []});

// Actions

const INBOXSTATE_REQUEST = 'INBOXSTATE/GETMESSAGES_REQUEST';
const INBOXSTATE_RESPONSE = 'INBOXSTATE/GETMESSAGES_RESPONSE';

export function transformMessage(){
  return type="";
}

// Action creators
export function getMessages(userId, inboxType) {
  return {
    type: INBOXSTATE_REQUEST,
    payload: {
      userId,
      inboxType
    }
  };
}

export async function requestGetMessages(userId,inboxType) {
  try {
    const result = await GetMessages(userId, inboxType);
    console.log(result);
    return {type: INBOXSTATE_RESPONSE, payload: result};
  } catch (err) {
    return {type: INBOXSTATE_RESPONSE, payload: []};
  }
}

// Reducer
export default function InboxStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case INBOXSTATE_REQUEST:
      return loop(state, Effects.promise(requestGetMessages,action.payload.userId,action.payload.inboxType));

    case INBOXSTATE_RESPONSE:
      return state.set('value', action.payload.ModelObject);

    default:
      return state;
  }
}
