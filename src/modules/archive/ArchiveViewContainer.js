import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ArchiveView from './ArchiveView';
import {NavigationActions} from 'react-navigation';
import * as ArchiveStateActions from '../archive/ArchiveState';

export default connect(
  state => ({
    value: state.getIn(['archive', 'value']),
    userId: state.getIn(['login', 'userId']),
    loadMore: state.getIn(['inbox', 'loadMore'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      ArchiveStateActions: bindActionCreators(ArchiveStateActions, dispatch)
    };
  }
)(ArchiveView);
