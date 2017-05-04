import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InboxView from './InboxView';
import {NavigationActions} from 'react-navigation';
import * as InboxStateActions from '../inbox/InboxState';

export default connect(
  state => ({
    value: state.getIn(['counter', 'value']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      InboxStateActions: bindActionCreators(InboxStateActions, dispatch)
    };
  }
)(InboxView);
