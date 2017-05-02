import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InboxView from './InboxView';
import {NavigationActions} from 'react-navigation';
import * as CounterStateActions from '../inbox/InboxState';

export default connect(
  state => ({
    counter: state.getIn(['counter', 'value']),
    loading: state.getIn(['counter', 'loading'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      counterStateActions: bindActionCreators(CounterStateActions, dispatch)
    };
  }
)(InboxView);
