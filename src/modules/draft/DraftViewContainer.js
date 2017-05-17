import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import DraftView from './DraftView';
import * as DraftStateActions from './DraftState';

export default connect(
    state => ({
        value: state.getIn(['draft', 'value']),
    }),
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch),
       DraftStateActions: bindActionCreators(DraftStateActions, dispatch)
     };
   }
)(DraftView);
