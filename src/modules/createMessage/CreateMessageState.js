import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {SendMessage} from './../../services/messageCenterServices';

// Initial state
const initialState = Map({value: []});

// Actions

const CREATEMESSAGESTATE_REQUEST = 'CREATEMESSAGESTATE/SENDMESSAGE_REQUEST';
const CREATEMESSAGESTATE_RESPONSE='CREATEMESSAGESTATE/SENDMESSAGE_RESPONSE'

// Action creators
export function sendMessage(message) {
  return {
    type: CREATEMESSAGESTATE_REQUEST,
    payload:message
  };
}

export async function requestSendMessage(message) {
  try {
    console.log(message)
    const result = await sendMessage(message);
    return {
      type:CREATEMESSAGESTATE_RESPONSE
    }
  } catch (err) {
    console.log(err)
  }
}

// Reducer
export default function CreateMessageStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case CREATEMESSAGESTATE_REQUEST:
      return loop(state, Effects.promise(requestSendMessage,action.payload.message));

     case CREATEMESSAGESTATE_RESPONSE:
       return null;

    default:
      return state;
  }
}
