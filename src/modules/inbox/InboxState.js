import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {GetMessages} from './../../services/messageCenterServices';

// Initial state
const initialState = Map({value: []});

// Actions

const GETMESSAGES_REQUEST = 'IndexState/GETMESSAGES_REQUEST';
const GETMESSAGES_RESPONSE = 'IndexState/GETMESSAGES_RESPONSE';

// Action creators
export function getMessages(userId, inboxType) {
  return {
    type: GETMESSAGES_REQUEST,
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
    return {type: GETMESSAGES_RESPONSE, payload: result};
  } catch (err) {
    return {type: GETMESSAGES_RESPONSE, payload: []};
  }
}

// Reducer
export default function InboxStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case GETMESSAGES_REQUEST:
      return loop(state, Effects.promise(requestGetMessages,action.payload.userId,action.payload.inboxType));

    case GETMESSAGES_RESPONSE:
      return state.set('value', action.payload.ModelObject);

    default:
      return state;
  }
}
