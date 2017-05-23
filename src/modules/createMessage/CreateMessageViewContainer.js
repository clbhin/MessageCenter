import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import CreateMessageView from './CreateMessageView';
import * as CreateMessageStateActions from '../createMessage/CreateMessageState';
import * as InboxStateActions from '../inbox/InboxState';

export default connect(
  state => ({
    contactData: state.getIn(['contact', 'contactData']),
    boxType: state.getIn(['createMessage', 'boxType']),
    selectedProfiles: state.getIn(['addProfile', 'selectedProfiles']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      CreateMessageStateActions: bindActionCreators(CreateMessageStateActions, dispatch),
      InboxStateActions: bindActionCreators(InboxStateActions, dispatch)
    };
  }
)(CreateMessageView);
