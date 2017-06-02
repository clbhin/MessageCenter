import { Map } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import { SendMessage,SaveAsDraft } from './../../services/messageCenterServices';

// Initial state
const initialState = Map({ value: [], boxType: '' });

// Actions

const CREATEMESSAGESTATE_REQUEST = 'CREATEMESSAGESTATE/SENDMESSAGE_REQUEST';
const CREATEMESSAGESTATE_RESPONSE = 'CREATEMESSAGESTATE/SENDMESSAGE_RESPONSE';
const SAVEASDRAFTMESSAGESTATE_REQUEST = 'SAVEASDRAFTMESSAGESTATE/SENDMESSAGE_REQUEST';
const SAVEASDRAFTMESSAGESTATE_RESPONSE = 'SAVEASDRAFTEMESSAGESTATE/SENDMESSAGE_RESPONSE';
const CREATEMESSAGESTATE_SELECTNAME = 'CREATEMESSAGESTATE/SELECTNAME';

// Action creators
export function sendMessage(data) {
  return {
    type: CREATEMESSAGESTATE_REQUEST,
    payload: data
  };
}

export function saveAsDraft(data) {
  return {
    type: SAVEASDRAFTMESSAGESTATE_REQUEST,
    payload: data
  };
}

export function selectNames(nameType) {
  return {
    type: CREATEMESSAGESTATE_SELECTNAME,
    payload: nameType
  }
}

export async function requestSendMessage(data) {
  try {
    const result = await SendMessage(data)
    .then(response => response.json())
    .then(json => {
      Alert.alert('Message success send')
    })
    .catch(function (error) {
    });
    return {
      type: CREATEMESSAGESTATE_RESPONSE
    }
  } catch (err) {
    console.log(err)
    return {
      type: CREATEMESSAGESTATE_RESPONSE
    }
  }
}

export async function requestSaveAsDraftMessage(data) {
  try {
    const result = await SaveAsDraft(data)
    .then(response => response.json())
    .then()
    .catch(function (error) {
    });
    return {
      type: SAVEASDRAFTMESSAGESTATE_RESPONSE
    }
  } catch (err) {
    console.log(err)
    return {
      type: SAVEASDRAFTMESSAGESTATE_RESPONSE
    }
  }
}

// Reducer
export default function CreateMessageStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case CREATEMESSAGESTATE_REQUEST:
      return loop(state, Effects.promise(requestSendMessage, action.payload));

    case CREATEMESSAGESTATE_RESPONSE:
      return state;

    case SAVEASDRAFTMESSAGESTATE_REQUEST:
      return loop(state, Effects.promise(requestSaveAsDraftMessage, action.payload));

    case SAVEASDRAFTMESSAGESTATE_RESPONSE:
      return state;

    case CREATEMESSAGESTATE_SELECTNAME:
      return state.set('boxType', action.payload);
    default:
      return state;
  }
}
