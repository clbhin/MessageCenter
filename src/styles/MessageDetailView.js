import {StyleSheet} from 'react-native';

 export default StyleSheet.create({
     messageHead:{ 
         flexDirection: 'row', 
         height: 50, 
         borderBottomWidth: 1, 
         borderBottomColor: '#ccc', 
         alignItems: 'center', 
         backgroundColor: '#39babd', 
         paddingLeft: 10, 
         paddingRight: 20 
    },
    flex:{ 
        flex: 1 
    },
    image:{ 
        width: 30, 
        height: 30 
    },
    messageName:{ 
        flex: 5, 
        textAlign: 'left', 
        marginLeft: 5 
    },
    messageContent:{ 
        marginLeft: 10, 
        marginTop: 10, 
        marginRight: 10, 
        flexDirection: 'column'
    },
    messageBorderBottom:{ 
        fontSize: 16, 
        minHeight: 30, 
        justifyContent: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: '#ddd' 
    },
    messageCenter:{ 
        fontSize: 16, 
        height: 20, 
        justifyContent: 'center' 
    },
    messageDate:{ 
        fontSize: 10, 
        height: 20, 
        justifyContent: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: '#ddd' 
    },
    messageBottom:{ 
        height: 40, 
        borderRadius: 20, 
        backgroundColor: 'white', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingLeft: 24, 
        paddingRight: 24, 
        alignItems: 'center', 
       
    },
    messageBottomCenter:{ 
        flexDirection: 'column',
         alignItems: 'center' 
    },
    
 });