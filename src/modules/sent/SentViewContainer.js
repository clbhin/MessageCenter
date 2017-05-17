import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import SentView from './SentView';
import * as SentStateActions from './SentState';

export default connect(
    state => ({
        value: state.getIn(['sent', 'value']),
    }),
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch),
       SentStateActions: bindActionCreators(SentStateActions, dispatch)
     };
   }
)(SentView);
