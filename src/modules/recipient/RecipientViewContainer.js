import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import RecipientView from './RecipientView';
import * as RecipientStateActions from '../recipient/RecipientState';
export default connect(
  state => ({
    users: state.getIn(['login', 'users'])&& state.getIn(['login', 'users']).toJS?state.getIn(['login', 'users']).toJS():state.getIn(['login', 'users']),
    userInfos:state.getIn(['recipient', 'userInfos'])&& state.getIn(['recipient', 'userInfos']).toJS?state.getIn(['recipient', 'userInfos']).toJS():state.getIn(['recipient', 'userInfos'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      RecipientStateActions: bindActionCreators(RecipientStateActions, dispatch)
    };
  }
)(RecipientView);
