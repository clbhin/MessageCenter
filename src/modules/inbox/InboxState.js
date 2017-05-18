import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {GetMessages, DeleteMessage} from './../../services/messageCenterServices';


// Initial state
const initialState = Map({
  value: [],
  InboxMessages: [],
});

// Actions

const INBOXSTATE_REQUEST = 'INBOXSTATE/GETMESSAGES_REQUEST';
const INBOXSTATE_RESPONSE = 'INBOXSTATE/GETMESSAGES_RESPONSE';
const REQUEST_DELETE_INBOXSTATE = 'INBOXSTATE/REQUEST_DELETE_ATTACHMENT';


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

export async function requestGetMessages(userId,inboxType) {
  try {
    const result = await GetMessages(userId, inboxType);
    return {type: INBOXSTATE_RESPONSE, payload: result};
  } catch (err) {
    return {type: INBOXSTATE_RESPONSE, payload: []};
  }
}

export function deleteMessage(message){
  return{
    type: REQUEST_DELETE_INBOXSTATE,
    payload: message
  };
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

// export async function requestDeleteAttachment(attachment, patientId) {
//   try {
//     await delAttachment(attachment.Id);
//     return {
//       type: REQUEST_DELETE_INBOXSTATE_SUCCESS,
//       patientId
//     };
//   } catch (error) {
//     console.log(error.message);
//     return {type: REQUEST_FAILURE, payload: error.message};
//   }
// }

// Reducer
export default function InboxStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case INBOXSTATE_REQUEST:
      return loop(state, Effects.promise(requestGetMessages,action.payload.userId,action.payload.inboxType));

    case INBOXSTATE_RESPONSE:
      return state.set('value', action.payload.ModelObject);

    case REQUEST_DELETE_INBOXSTATE:
      return loop(state,        
        Effects.promise(
          deleteInbox,
          action.payload
        )
      );   

    default:
      return state;
  }
}
