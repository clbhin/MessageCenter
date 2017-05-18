import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {GetMessages} from './../../services/messageCenterServices';
import {ReadUserMessage} from '../../services/messageCenterServices';

// Initial state
const initialState = Map({value: []});

// Actions

const INBOXSTATE_REQUEST = 'INBOXSTATE/GETMESSAGES_REQUEST';
const INBOXSTATE_RESPONSE = 'INBOXSTATE/GETMESSAGES_RESPONSE';
const INBOXSTATE_READUSERMESSAGE='INBOXSTATE/READUSERMESSAGE';

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

export function readMessage(userMessage){
  return {
    type: INBOXSTATE_READUSERMESSAGE,
    payload: userMessage
  }
}

export async function requestGetMessages(userId,inboxType) {
  try {
    const result = await GetMessages(userId, inboxType);
    return {type: INBOXSTATE_RESPONSE, payload: result};
  } catch (err) {
    return {type: INBOXSTATE_RESPONSE, payload: []};
  }
}

export async function requestReadUserMessage(userMessage){
  try{
    const result=await ReadUserMessage(userMessage)
    return {type:INBOXSTATE_REQUEST,
      payload:{
        userId:'Xiang Zhang',
        inboxType:'Inbox'
      }
    }
  }catch(err){
    return {type: INBOXSTATE_RESPONSE, payload: []}
  }
}
// Reducer
export default function InboxStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case INBOXSTATE_REQUEST:
      return loop(state, Effects.promise(requestGetMessages,action.payload.userId,action.payload.inboxType));

    case INBOXSTATE_RESPONSE:
      return state.set('value', action.payload.ModelObject);

    case INBOXSTATE_READUSERMESSAGE:
      return loop(state,Effects.promise(requestReadUserMessage,action.payload))
    default:
      return state;
  }
}
