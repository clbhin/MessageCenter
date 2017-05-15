import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import ContactView from './ContactView';
import * as ContactStateActions from '../contact/ContactState';
export default connect(
   null,
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch),
       ContactStateActions: bindActionCreators(ContactStateActions, dispatch)
     };
   }
)(ContactView);
