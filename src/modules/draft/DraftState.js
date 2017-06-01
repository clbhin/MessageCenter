import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {GetMessages,ReadUserMessage} from './../../services/messageCenterServices';

// Initial state
const initialState = Map({value: []});

// Actions


const REQUEST_GET_MESSAGES = 'DraftState/REQUEST_GET_MESSAGES';
const RESPONSE_GET_MESSAGES = 'DraftState/RESPONSE_GET_MESSAGES';
const REQUEST_READ_USER_MESSAGE='DraftState/REQUEST_READ_USER_MESSAGE';


// Action creators
export function getMessages(userId, draftType) {
  return {
    type: REQUEST_GET_MESSAGES,
    payload: {
      userId,
      draftType
    }
  };
}

export function readMessage(userMessage){
  return {
    type: REQUEST_READ_USER_MESSAGE,
    payload: userMessage
  }
}

export async function requestGetMessages(userId,draftType) {
  try {
    const result = await GetMessages(userId, draftType);
    return {type: RESPONSE_GET_MESSAGES, payload: result};
  } catch (err) {
    return {type: RESPONSE_GET_MESSAGES, payload: []};
  }
}

export async function requestReadUserMessage(userMessage){
  try{
    const result=await ReadUserMessage(userMessage)
    return {
      type:REQUEST_GET_MESSAGES,
      payload:{
        userId:userMessage.UserId,
        draftType:userMessage.Type
      }
    }
  }catch(err){
    return {type: RESPONSE_GET_MESSAGES, payload: []}
  }
}

// Reducer
export default function SentStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case REQUEST_GET_MESSAGES:
      return loop(state, Effects.promise(requestGetMessages,action.payload.userId,action.payload.draftType));

    case RESPONSE_GET_MESSAGES:
      return state.set('value', action.payload.ModelObject);

    case REQUEST_READ_USER_MESSAGE:
      return loop(state,Effects.promise(requestReadUserMessage,action.payload));  

    default:
      return state;
  }
}
