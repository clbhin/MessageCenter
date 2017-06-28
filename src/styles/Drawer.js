import {StyleSheet} from 'react-native';

 export default StyleSheet.create({
  icon: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10 ,
    backgroundColor: '#fff'    
  },
  messageView: {
    flex: 3,
    marginLeft: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 4,
    alignItems: 'flex-start', 
    justifyContent: 'center'
  },
  messageText: {
    color: '#32363C', 
    fontSize:16
  }
});