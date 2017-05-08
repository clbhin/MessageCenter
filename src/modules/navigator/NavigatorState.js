import {fromJS} from 'immutable';
import {NavigationActions} from 'react-navigation';
import includes from 'lodash/includes';

import AppNavigator from './Navigator';

export default function NavigatorReducer(state, action) {
  // Initial state
  if (!state) {
  console.log('route change 1');
    return fromJS(AppNavigator.router.getStateForAction(action, state));
  }

  // Is this a navigation action that we should act upon?
  if (includes(NavigationActions, action.type)) {
  console.log('route change 2');
    return fromJS(AppNavigator.router.getStateForAction(action, state.toJS()));
  }

  return state;
}
