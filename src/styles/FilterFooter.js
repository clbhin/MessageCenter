import {StyleSheet} from 'react-native';
  
export default StyleSheet.create({
  rowFront: {
		alignItems: 'center',
		backgroundColor: '#FFF',
		borderBottomColor: 'black',		
		justifyContent: 'center'		
	},
  container: {
    flexDirection:'row',
    height:50
  },
  color: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  defaultColor: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#43B1CC'
  },
  focusTextAll: {
    color: '#43B1CC',
    fontSize: 16
  },
  defaultTextAll: {
    color: '#FFF',
    fontSize: 16
  },
  focusText: {
    color: '#43B1CC',
  },
  defaultText: {
    color: '#FFF'
  }
});