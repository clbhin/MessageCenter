import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {GetMessages} from './../../services/messageCenterServices';

// Initial state
const initialState = Map({value: []});

// Actions

const DRAFTSTATE_REQUEST = 'SENTSTATE/GETMESSAGES_REQUEST';
const DRAFTSTATE_RESPONSE = 'SENTSTATE/GETMESSAGES_RESPONSE';

export function transformMessage(){
  return type="";
}

// Action creators
export function getMessages(userId, draftType) {
  return {
    type: DRAFTSTATE_REQUEST,
    payload: {
      userId,
      draftType
    }
  };
}

export async function requestGetMessages(userId,draftType) {
  try {
    const result = await GetMessages(userId, draftType);
    //console.log(result);
    return {type: DRAFTSTATE_RESPONSE, payload: result};
  } catch (err) {
    return {type: DRAFTSTATE_RESPONSE, payload: []};
  }
}

// Reducer
export default function SentStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case DRAFTSTATE_REQUEST:
      return loop(state, Effects.promise(requestGetMessages,action.payload.userId,action.payload.draftType));

    case DRAFTSTATE_RESPONSE:
      return state.set('value', action.payload.ModelObject);

    default:
      return state;
  }
}
