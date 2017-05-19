import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {GetMessages, DeleteMessage,ReadUserMessage,MarkUserMessage} from './../../services/messageCenterServices';


// Initial state
const initialState = Map({
  value: [],
  InboxMessages: [],
});

// Actions

const INBOXSTATE_REQUEST = 'INBOXSTATE/GETMESSAGES_REQUEST';
const INBOXSTATE_RESPONSE = 'INBOXSTATE/GETMESSAGES_RESPONSE';
const REQUEST_DELETE_INBOXSTATE = 'INBOXSTATE/REQUEST_DELETE_ATTACHMENT';
const INBOXSTATE_READUSERMESSAGE='INBOXSTATE/READUSERMESSAGE';
const INBOXSTATE_MARKMESSAGE='INBOXSTATE/MARKMESSAGE';

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

export function deleteMessage(message){
  return{
    type: REQUEST_DELETE_INBOXSTATE,
    payload: message
  };
}

export function markMessage(userMessage){
  userMessage.Mark==='Marked'?userMessage.Mark='UnMark':userMessage.Mark='Marked';
  return{
    type:INBOXSTATE_MARKMESSAGE,
    payload:userMessage
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



export async function deleteInbox(message) {
  try {
    const result = await DeleteMessage(message);
    return {
      type: INBOXSTATE_REQUEST,
      payload: {
        userId: message.UserId,
        inboxType: message.Type
      }
    };
  } catch (error) {
    console.log(error);
  }
}

export async function requestReadUserMessage(userMessage){
  try{
    const result=await ReadUserMessage(userMessage)
    return {
      type:INBOXSTATE_REQUEST,
      payload:{
        userId:userMessage.UserId,
        inboxType:userMessage.Type
      }
    }
  }catch(err){
    return {type: INBOXSTATE_RESPONSE, payload: []}
  }
}

export async function requestMarkUserMessage(userMessage){
  try{
    const result=await MarkUserMessage(userMessage)
    return {
      type:INBOXSTATE_REQUEST,
      payload:{
        userId:userMessage.UserId,
        inboxType:userMessage.Type
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

    case REQUEST_DELETE_INBOXSTATE:
      return loop(state,Effects.promise(deleteInbox, action.payload));   

    case INBOXSTATE_READUSERMESSAGE:
      return loop(state,Effects.promise(requestReadUserMessage,action.payload));

    case INBOXSTATE_MARKMESSAGE:
      return loop(state,Effects.promise(requestMarkUserMessage,action.payload))  

    default:
      return state;
  }
}
