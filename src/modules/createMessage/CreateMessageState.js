import { Map } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import { SendMessage,SaveAsDraft } from './../../services/messageCenterServices';

// Initial state
const initialState = Map({ value: [], nameType: '' });

// Actions

const REQUEST_SEND_MESSAGES = 'CreateMessage/REQUEST_SEND_MESSAGES';
const RESPONSE_SEND_MESSAGES = 'CreateMessage/RESPONSE_SEND_MESSAGES';
const REQUEST_SAVE_AS_DRAFT_MESSAGES = 'CreateMessage/REQUEST_SAVE_AS_DRAFT_MESSAGES';
const RESPONSE_SAVE_AS_DRAFT_MESSAGES = 'CreateMessage/RESPONSE_SAVE_AS_DRAFT_MESSAGES';
const REQUEST_SELECT_NAME = 'CreateMessage/REQUEST_SELECT_NAME';

// Action creators
export function sendMessage(data) {
  return {
    type: REQUEST_SEND_MESSAGES,
    payload: data
  };
}

export function saveAsDraft(data) {
  return {
    type: REQUEST_SAVE_AS_DRAFT_MESSAGES,
    payload: data
  };
}

export function selectNames(nameType) {
  return {
    type: REQUEST_SELECT_NAME,
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
      type: RESPONSE_SEND_MESSAGES
    }
  } catch (err) {
    console.log(err)
    return {
      type: RESPONSE_SEND_MESSAGES
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
      type: RESPONSE_SAVE_AS_DRAFT_MESSAGES
    }
  } catch (err) {
    console.log(err)
    return {
      type: RESPONSE_SAVE_AS_DRAFT_MESSAGES
    }
  }
}

// Reducer
export default function CreateMessageStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case REQUEST_SEND_MESSAGES:
      return loop(state, Effects.promise(requestSendMessage, action.payload));

    case RESPONSE_SEND_MESSAGES:
      return state;

    case REQUEST_SAVE_AS_DRAFT_MESSAGES:
      return loop(state, Effects.promise(requestSaveAsDraftMessage, action.payload));

    case RESPONSE_SAVE_AS_DRAFT_MESSAGES:
      return state;

    case REQUEST_SELECT_NAME:
      return state.set('nameType', action.payload);

    default:
      return state;
  }
}
