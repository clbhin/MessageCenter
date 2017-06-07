import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InboxView from './InboxView';
import { NavigationActions } from 'react-navigation';
import * as InboxStateActions from '../inbox/InboxState';

export default connect(
  state => ({
    value: state.getIn(['inbox', 'value'])&& state.getIn(['inbox', 'value']).toJS?state.getIn(['inbox', 'value']).toJS():state.getIn(['inbox', 'value']),
    userInfo: state.getIn(['login', 'userInfo'])&& state.getIn(['login', 'userInfo']).toJS?state.getIn(['login', 'userInfo']).toJS():state.getIn(['login', 'userInfo']),
    loadMore: state.getIn(['inbox', 'loadMore'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      InboxStateActions: bindActionCreators(InboxStateActions, dispatch)
    };
  }
)(InboxView);
