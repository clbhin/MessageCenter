import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import ContactView from './ContactView';
import * as ContactStateActions from '../contact/ContactState';
export default connect(
  state => ({
    users: state.getIn(['login', 'users'])&& state.getIn(['login', 'users']).toJS?state.getIn(['login', 'users']).toJS():state.getIn(['login', 'users']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      ContactStateActions: bindActionCreators(ContactStateActions, dispatch)
    };
  }
)(ContactView);
