import {StyleSheet} from 'react-native';

 export default StyleSheet.create({
   footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },    
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
    loading: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',    
    },
    LoadMoreFooterView:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    LoadMoreFooterText:{
        alignItems: 'center',
        justifyContent: 'center', 
        fontSize: 13, 
        color: '#434343'
    },
    loadingText:{
        color: '#EF4A4A'
    }
});