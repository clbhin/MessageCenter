import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {GetMessages} from './../../services/messageCenterServices';

// Initial state
const initialState = Map({value: []});

// Actions

const SENTSTATE_REQUEST = 'SENTSTATE/GETMESSAGES_REQUEST';
const SENTSTATE_RESPONSE = 'SENTSTATE/GETMESSAGES_RESPONSE';

export function transformMessage(){
  return type="";
}

// Action creators
export function getMessages(userId, sentType) {
  return {
    type: SENTSTATE_REQUEST,
    payload: {
      userId,
      sentType
    }
  };
}

export async function requestGetMessages(userId,sentType) {
  try {
    const result = await GetMessages(userId, sentType);
    console.log(result);
    return {type: SENTSTATE_RESPONSE, payload: result};
  } catch (err) {
    return {type: SENTSTATE_RESPONSE, payload: []};
  }
}

// Reducer
export default function SentStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case SENTSTATE_REQUEST:
      return loop(state, Effects.promise(requestGetMessages,action.payload.userId,action.payload.sentType));

    case SENTSTATE_RESPONSE:
      return state.set('value', action.payload.ModelObject);

    default:
      return state;
  }
}
