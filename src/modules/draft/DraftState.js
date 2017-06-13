import { Map } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';
import {GetMessages,ReadUserMessage, DeleteMessage, SearchMessages, LoadMoreMessages, MarkUserMessage} from './../../services/messageCenterServices';


// Initial state
const initialState = Map({
  value: [],
  loadMore: true
});

// Actions


const REQUEST_GET_MESSAGES = 'DraftState/REQUEST_GET_MESSAGES';
const RESPONSE_GET_MESSAGES = 'DraftState/RESPONSE_GET_MESSAGES';
const REQUEST_READ_USER_MESSAGE = 'DraftState/REQUEST_READ_USER_MESSAGE';
const REQUEST_DELETE_MESSAGE = 'DraftState/REQUEST_DELETE_MESSAGE';
const REQUEST_SEARCH_MESSAGES = 'DraftState/REQUEST_SEARCH_MESSAGES';
const RESPONSE_SEARCH_MESSAGES = 'DraftState/RESPONSE_SEARCH_MESSAGES';
const REQUEST_LOAD_MORE_MESSAGES = 'DraftState/REQUEST_LOAD_MORE_MESSAGES';
const RESPONSE_LOAD_MORE_MESSAGES = 'DraftState/RESPONSE_LOAD_MORE_MESSAGES';
const REQUEST_MARK_MESSAGE='DraftState/REQUEST_MARK_MESSAGE';



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

export function readMessage(userMessage) {
  return {
    type: REQUEST_READ_USER_MESSAGE,
    payload: userMessage
  }
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

export async function requestGetMessages(userId, draftType) {
  try {
    const result = await GetMessages(userId, draftType);
    return { type: RESPONSE_GET_MESSAGES, payload: result };
  } catch (err) {
    return { type: RESPONSE_GET_MESSAGES, payload: [] };
  }
}

export async function requestReadUserMessage(userMessage) {
  try {
    const result = await ReadUserMessage(userMessage)
    return {
      type: REQUEST_GET_MESSAGES,
      payload: {
        userId: userMessage.UserId,
        draftType: userMessage.Type
      }
    }
  } catch (err) {
    return { type: RESPONSE_GET_MESSAGES, payload: [] }
  }
}

export async function deleteDraft(message) {
  try {
    const result = await DeleteMessage(message);
    return {
      type: REQUEST_GET_MESSAGES,
      payload: {
        userId: message.UserId,
        draftType: message.Type
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
      return loop(state, Effects.promise(requestGetMessages, action.payload.userId, action.payload.draftType));

    case RESPONSE_GET_MESSAGES:
      if (action.payload.ModelObject.length == 10) {
        return state.set('loadMore', true).set('value', action.payload.ModelObject);
      } else {
        return state.set('loadMore', false).set('value', action.payload.ModelObject);
      }

    case REQUEST_READ_USER_MESSAGE:
      return loop(state, Effects.promise(requestReadUserMessage, action.payload));

    case REQUEST_DELETE_MESSAGE:
      return loop(state, Effects.promise(deleteDraft, action.payload));

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
