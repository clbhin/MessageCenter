import {Map, fromJS} from 'immutable';
import {loop, combineReducers} from 'redux-loop-symbol-ponyfill';
import NavigatorStateReducer from '../modules/navigator/NavigatorState';
import CounterStateReducer from '../modules/counter/CounterState';
import SessionStateReducer, {RESET_STATE} from '../modules/session/SessionState';
import InboxStateReducer from '../modules/inbox/InboxState';
import CreateMessageStateReducer from '../modules/createMessage/CreateMessageState';
import RecipientStateReducer from '../modules/recipient/RecipientState';
import SentStateReducer from '../modules/sent/SentState';
import DraftStateReducer from '../modules/draft/DraftState';
import AddProfileStateReducer from '../modules/addProfile/addProfileState';
import LoginStateReducer from './../modules/login/LoginState';
import ArchiveStateReducer from '../modules/archive/ArchiveState'

const reducers = {
  // Counter sample app state. This can be removed in a live application
  counter: CounterStateReducer,

  inbox:InboxStateReducer,

  createMessage:CreateMessageStateReducer,
  // Navigator states
  navigatorState: NavigatorStateReducer,

  session: SessionStateReducer,

  recipient: RecipientStateReducer,

  sent: SentStateReducer,

  draft: DraftStateReducer,

  addProfile: AddProfileStateReducer,
  
  login: LoginStateReducer,

  archive:ArchiveStateReducer

};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || void 0, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
