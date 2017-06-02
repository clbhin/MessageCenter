import { Map } from 'immutable';
import { loop, Effects } from 'redux-loop-symbol-ponyfill';


// Initial state
const initialState = Map({ contactData: [] });

// Actions

const CONTACTSTATE_ADDCONTACTNAME = 'CONTACTSTATE/ADDCONTACTNAME';


// Action creators
export function addContactName(contactData) {
  return {
    type: CONTACTSTATE_ADDCONTACTNAME,
    payload: contactData
  }
}

// Reducer
export default function ContactStateReducer(state = initialState, action = {}) {
  switch (action.type) {


    case CONTACTSTATE_ADDCONTACTNAME:
      return state.set('contactData', action.payload);

    default:
      return state;
  }
}
