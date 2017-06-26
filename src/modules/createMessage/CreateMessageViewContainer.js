import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import CreateMessageView from './CreateMessageView';
import * as CreateMessageStateActions from '../createMessage/CreateMessageState';
import * as DraftStateActions from '../draft/DraftState';
import * as InboxStateActions from '../inbox/InboxState';
import * as SentStateActions from '../sent/SentState';
import * as ArchiveStateActions from '../archive/ArchiveState';

export default connect(
  state => ({
    recipients: state.getIn(['recipient', 'recipients']) && state.getIn(['recipient', 'recipients']).toJS?state.getIn(['recipient', 'recipients']).toJS():state.getIn(['recipient', 'recipients']),
    nameType: state.getIn(['createMessage', 'nameType']),
    userInfo: state.getIn(['login', 'userInfo'])&& state.getIn(['login', 'userInfo']).toJS?state.getIn(['login', 'userInfo']).toJS():state.getIn(['login', 'userInfo']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      CreateMessageStateActions: bindActionCreators(CreateMessageStateActions, dispatch),
      DraftStateActions: bindActionCreators(DraftStateActions, dispatch),
      InboxStateActions: bindActionCreators(InboxStateActions, dispatch),
      SentStateActions: bindActionCreators(SentStateActions, dispatch),
      ArchiveStateActions: bindActionCreators(ArchiveStateActions, dispatch)
    };
  }
)(CreateMessageView);
