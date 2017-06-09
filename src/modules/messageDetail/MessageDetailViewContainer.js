import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import MessageDetailView from './MessageDetailView';
import * as InboxStateActions from '../inbox/InboxState';
import * as SentStateActions from '../sent/SentState';

export default connect(
  state => ({    
    userInfo: state.getIn(['login', 'userInfo'])&& state.getIn(['login', 'userInfo']).toJS?state.getIn(['login', 'userInfo']).toJS():state.getIn(['login', 'userInfo']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      InboxStateActions: bindActionCreators(InboxStateActions, dispatch),
      SentStateActions: bindActionCreators(SentStateActions, dispatch)
    };
  }
)(MessageDetailView);
