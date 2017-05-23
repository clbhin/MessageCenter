import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginView from './LoginView';
import {NavigationActions} from 'react-navigation';
import * as LoginStateActions from '../login/LoginState';

export default connect(
  null,
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      LoginStateActions: bindActionCreators(LoginStateActions, dispatch)
    };
  }
)(LoginView);
