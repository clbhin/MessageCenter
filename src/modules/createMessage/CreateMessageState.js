import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {SendMessage} from './../../services/messageCenterServices';

// Initial state
const initialState = Map({value: [],boxType:''});

// Actions

const CREATEMESSAGESTATE_REQUEST = 'CREATEMESSAGESTATE/SENDMESSAGE_REQUEST';
const CREATEMESSAGESTATE_RESPONSE='CREATEMESSAGESTATE/SENDMESSAGE_RESPONSE';
const CREATEMESSAGESTATE_SELECTNAME='CREATEMESSAGESTATE/SELECTNAME';

// Action creators
export function sendMessage(data) {
  return {
    type: CREATEMESSAGESTATE_REQUEST,
    payload:data
  };
}

export function selectNames(nameType){
  return {
    type:CREATEMESSAGESTATE_SELECTNAME,
    payload:nameType
  }
}

export async function requestSendMessage(data) {
  try {
    const result = await SendMessage(data);
    console.log(result);
    return {
      type:CREATEMESSAGESTATE_RESPONSE
    }
  } catch (err) {
    console.log(err)
    return {
      type:CREATEMESSAGESTATE_RESPONSE
    }
  }
}

// Reducer
export default function CreateMessageStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case CREATEMESSAGESTATE_REQUEST:
      return loop(state, Effects.promise(requestSendMessage,action.payload));

    case CREATEMESSAGESTATE_RESPONSE:
       return state;

    case CREATEMESSAGESTATE_SELECTNAME:
      return state.set('boxType', action.payload);
    default:
      return state;
  }
}
