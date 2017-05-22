import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import AddProfileView from './addProfileView';
import * as AddProfileStateActions from './addProfileState';
export default connect(
    state => ({
    profiles: state.getIn(['addProfile', 'profiles']), 
  }),
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch),
       AddProfileStateActions: bindActionCreators(AddProfileStateActions, dispatch)
     };
   }
)(AddProfileView);
