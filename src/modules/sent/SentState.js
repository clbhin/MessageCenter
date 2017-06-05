import { Map } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import {GetMessages, DeleteMessage, SearchMessages, LoadMoreMessages, MarkUserMessage} from './../../services/messageCenterServices';


// Initial state
const initialState = Map({
  value: [],
  loadMore: true
});

// Actions

const REQUEST_GET_MESSAGES = 'SentState/REQUEST_GET_MESSAGES';
const RESPONSE_GET_MESSAGES = 'SentState/RESPONSE_GET_MESSAGES';
const REQUEST_DELETE_MESSAGE = 'SentState/REQUEST_DELETE_MESSAGE';
const REQUEST_SEARCH_MESSAGES = 'SentState/REQUEST_SEARCH_MESSAGES';
const RESPONSE_SEARCH_MESSAGES = 'SentState/RESPONSE_SEARCH_MESSAGES';
const REQUEST_LOAD_MORE_MESSAGES = 'SentState/REQUEST_LOAD_MORE_MESSAGES';
const RESPONSE_LOAD_MORE_MESSAGES = 'SentState/RESPONSE_LOAD_MORE_MESSAGES';
const REQUEST_MARK_MESSAGE='SentState/REQUEST_MARK_MESSAGE';

export function transformMessage() {
  return type = "";
}

// Action creators
export function getMessages(userId, sentType) {
  return {
    type: REQUEST_GET_MESSAGES,
    payload: {
      userId,
      sentType
    }
  };
}

export function deleteMessage(message) {
  return {
    type: REQUEST_DELETE_MESSAGE,
    payload: message
  };
}

export function searchMessage(criteriaCollection) {
  return {
    type: REQUEST_SEARCH_MESSAGES,
    payload: criteriaCollection
  }
}

export function loadMoreMessages(userMessage) {
  return {
    type: REQUEST_LOAD_MORE_MESSAGES,
    payload: userMessage
  };
}

export function markMessage(userMessage){
  userMessage.Mark==='Marked'?userMessage.Mark='UnMark':userMessage.Mark='Marked';
  return{
    type:REQUEST_MARK_MESSAGE,
    payload:userMessage
  }
}

export async function requestGetMessages(userId, sentType) {
  try {
    const result = await GetMessages(userId, sentType);
    return { type: RESPONSE_GET_MESSAGES, payload: result };
  } catch (err) {
    return { type: RESPONSE_GET_MESSAGES, payload: [] };
  }
}

export async function deleteSent(message) {
  try {
    const result = await DeleteMessage(message);
    return {
      type: REQUEST_GET_MESSAGES,
      payload: {
        userId: message.UserId,
        sentType: message.Type
      }
    };
  } catch (error) {
    console.log(error);

  }
}

export async function requestSearchMessage(criteriaCollection) {
  try {
    const result = await SearchMessages(criteriaCollection)
    return {
      type: RESPONSE_SEARCH_MESSAGES,
      payload: result
    }
  } catch (err) {
    return { type: RESPONSE_GET_MESSAGES, payload: [] }
  }
}

export async function requestLoadMoreMessage(userMessage) {
  try {
    const result = await LoadMoreMessages(userMessage)
    return {
      type: RESPONSE_LOAD_MORE_MESSAGES,
      payload: result
    }
  } catch (err) {
    return { type: RESPONSE_GET_MESSAGES, payload: [] }
  }
}

export async function requestMarkUserMessage(userMessage){
  try{
    const result=await MarkUserMessage(userMessage)
    return {
      type:REQUEST_GET_MESSAGES,
      payload:{
        userId:userMessage.UserId,
        sentType:userMessage.Type
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
      return loop(state, Effects.promise(requestGetMessages, action.payload.userId, action.payload.sentType));

    case RESPONSE_GET_MESSAGES:
      if (action.payload.ModelObject.length == 10) {
        return state.set('loadMore', true).set('value', action.payload.ModelObject);
      } else {
        return state.set('loadMore', false).set('value', action.payload.ModelObject);
      }

    case REQUEST_DELETE_MESSAGE:
      return loop(state, Effects.promise(deleteSent, action.payload));

    case REQUEST_SEARCH_MESSAGES:
      return loop(state, Effects.promise(requestSearchMessage, action.payload));

    case RESPONSE_SEARCH_MESSAGES:
      if (action.payload.ModelObject.length == 10) {
        return state.set('value', [...(action.payload.ModelObject || [])]);
      } else {
        return state.set('loadMore', false).set('value', [...(action.payload.ModelObject || [])]);
      }
    case REQUEST_LOAD_MORE_MESSAGES:
      return loop(state, Effects.promise(requestLoadMoreMessage, action.payload));

    case RESPONSE_LOAD_MORE_MESSAGES:
      let oldData = state.get('value');
      let newData = [];
      newData = oldData.concat(action.payload.ModelObject);
      if (action.payload.ModelObject.length == 10) {
        return state.set('loadMore', true).set('value', [...(newData || [])]);

      } else {
        return state.set('loadMore', false).set('value', [...(newData || [])]);
      }

    case REQUEST_MARK_MESSAGE:
      return loop(state,Effects.promise(requestMarkUserMessage,action.payload))

    default:
      return state;
  }
}
