import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import MessageDetailView from './MessageDetailView';
import * as InboxStateActions from '../inbox/InboxState';

export default connect(
   null,
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch),
       InboxStateActions: bindActionCreators(InboxStateActions, dispatch)
     };
   }
)(MessageDetailView);
