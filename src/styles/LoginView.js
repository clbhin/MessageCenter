import {StyleSheet, Dimensions} from 'react-native';
const {height,width} = Dimensions.get('window'); 

 export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height:height
    },
    logo :{
        position: 'absolute',
        top: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: 200,
        height: 80
    },
    wrap: {
        position: 'absolute',
        top: '50%',
        left: '20%',
        backgroundColor: '#fff'
    },
    picker: {
        width: 240,
        marginBottom: 5
    },
    pickerItem: {
        width: '150%'
    }
});