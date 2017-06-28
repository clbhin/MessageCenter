import {StyleSheet} from 'react-native';

 export default StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },  
    wrapModal: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    modalDelete: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 40,
        backgroundColor: '#fff',
        minWidth: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },  
   textDelete: {
       fontSize: 16,
       color: '#FE483E'
   },
   modalSave: {
       
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 40,
        backgroundColor: '#fff',
        minWidth: '100%',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
   },
   textSave: {
       fontSize: 16,
       color: '#1886FE'
   },
   modalCancel: {
       flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 40,
        backgroundColor: '#fff',
        minWidth: '100%',
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10
   },
   textCancel: {
       fontSize: 16,
       color: '#077EFF',
       fontWeight: 'bold'
   },
})