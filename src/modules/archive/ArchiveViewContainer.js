import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ArchiveView from './ArchiveView';
import {NavigationActions} from 'react-navigation';
import * as ArchiveStateActions from '../archive/ArchiveState';

export default connect(
  state => ({
    value: state.getIn(['archive', 'value'])&& state.getIn(['archive', 'value']).toJS?state.getIn(['archive', 'value']).toJS():state.getIn(['archive', 'value']),
    userInfo: state.getIn(['login', 'userInfo'])&& state.getIn(['login', 'userInfo']).toJS?state.getIn(['login', 'userInfo']).toJS():state.getIn(['login', 'userInfo']),
    loadMore: state.getIn(['inbox', 'loadMore'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      ArchiveStateActions: bindActionCreators(ArchiveStateActions, dispatch)
    };
  }
)(ArchiveView);
