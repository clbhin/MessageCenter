import {StyleSheet} from 'react-native';

 export default StyleSheet.create({
    rowFront: {
		alignItems: 'center',
		backgroundColor: '#FFF',
		borderBottomColor: 'black',		
		justifyContent: 'center'		
	},
     messageView: {
       flexDirection: 'row',
       marginLeft: 4,
       marginRight: 10
    },
    messageTitle:{
        flexDirection:'row',
        alignItems:'center'
    },
    messageImage:{
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft:6
    },
    messageContent:{
        flex: 3,
        marginLeft: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingBottom: 4
    },
    messageBody:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    messageType:{
        flexDirection:'row',
        alignItems:'center'
    },
    messageText:{
        fontSize: 14
    },
   messageData:{
       height:14,
       overflow:'hidden'
    },
    
});