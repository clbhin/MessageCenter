import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {SendMessage} from './../../services/messageCenterServices';

// Initial state
const initialState = Map({value: []});

// Actions

const CREATEMESSAGESTATE_REQUEST = 'CREATEMESSAGESTATE/SENDMESSAGE_REQUEST';

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
  } catch (err) {
    return {type: INBOXSTATE_RESPONSE, payload: []};
  }
}

// Reducer
export default function CreateMessageStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case CREATEMESSAGESTATE_REQUEST:
      return loop(state, Effects.promise(requestSendMessage,action.payload.message));

    // case INBOXSTATE_RESPONSE:
    //   return state.set('value', action.payload.ModelObject);

    default:
      return state;
  }
}
