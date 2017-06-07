import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import SentView from './SentView';
import * as SentStateActions from './SentState';

export default connect(
  state => ({
    value: state.getIn(['inbox', 'value'])&& state.getIn(['inbox', 'value']).toJS?state.getIn(['inbox', 'value']).toJS():state.getIn(['inbox', 'value']),
    userInfo: state.getIn(['login', 'userInfo'])&& state.getIn(['login', 'userInfo']).toJS?state.getIn(['login', 'userInfo']).toJS():state.getIn(['login', 'userInfo']),
    loadMore: state.getIn(['sent', 'loadMore'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      SentStateActions: bindActionCreators(SentStateActions, dispatch)
    };
  }
)(SentView);
