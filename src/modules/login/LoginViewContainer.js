import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginView from './LoginView';
import { NavigationActions } from 'react-navigation';
import * as LoginStateActions from './LoginState';

export default connect(
  state => ({
    users: state.getIn(['login', 'users'])&&state.getIn(['login', 'users']).toJS?state.getIn(['login', 'users']).toJS():state.getIn(['login', 'users']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      LoginStateActions: bindActionCreators(LoginStateActions, dispatch)
    };
  }
)(LoginView);
