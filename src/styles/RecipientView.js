import {StyleSheet} from 'react-native';

 export default StyleSheet.create({
    RecipientView:{ 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        borderBottomWidth: 1, 
        borderBottomColor: 'red', 
        marginTop: 10, 
        paddingBottom: 4 
    },
    searchContainer: {
        flexDirection: 'row', 
        backgroundColor: '#ccc', 
        height: 24, 
        borderRadius: 12, 
        marginLeft: 10, 
        marginRight: 10, 
        marginTop: 6
    },
   searchView: {
        flexDirection: 'row', 
        flex: 3, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    searchTextInput: {
        flex: 10, 
        padding: 0, 
        paddingLeft: 10, 
        color: 'black'
    },
    image:{
        width: 40, 
        height: 40, 
        borderRadius: 20 
    },
    recipientData:{ 
        flexDirection: 'row',
        marginLeft: 10 
    },
    recipientName:{ 
        flex: 2, 
        marginLeft: 10, 
        marginTop: 1, 
        alignSelf: 'center', 
        textAlign: 'center',
     },
     selectRecipient:{ 
         flex: 1, 
         padding: 0, 
         alignSelf: 'center' 
    }
 });