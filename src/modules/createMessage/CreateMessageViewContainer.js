import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import CreateMessageView from './CreateMessageView';
import * as CreateMessageStateActions from '../createMessage/CreateMessageState';
import * as DraftStateActions from '../draft/DraftState';

export default connect(
  state => ({
    contactData: state.getIn(['contact', 'contactData']) && state.getIn(['contact', 'contactData']).toJS?state.getIn(['contact', 'contactData']).toJS():state.getIn(['contact', 'contactData']),
    boxType: state.getIn(['createMessage', 'boxType']),
    userInfo: state.getIn(['login', 'userInfo'])&& state.getIn(['login', 'userInfo']).toJS?state.getIn(['login', 'userInfo']).toJS():state.getIn(['login', 'userInfo']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      CreateMessageStateActions: bindActionCreators(CreateMessageStateActions, dispatch),
      DraftStateActions: bindActionCreators(DraftStateActions, dispatch)
    };
  }
)(CreateMessageView);
