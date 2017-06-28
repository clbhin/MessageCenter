import {StyleSheet} from 'react-native';

 export default StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10
  },
 drawerAndroid: {
    backgroundColor: '#fff', 
    paddingBottom: 260
  },   
title: {
    flexDirection: 'row', 
    paddingLeft: 10, 
    paddingRight: 10, 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }, 
image: {
    width: 30, 
    height: 40 
  },
archive:{
    flex: 1, 
    marginLeft: 20 ,
    flexDirection:'row',
    alignItems:'center'
},
archiveText:{ 
    fontSize: 18,
     color: 'black' 
    },
iconPlus: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 7, 
    width: 30
  },
searchView:{
    flexDirection: 'row',
    backgroundColor: '#ccc',
    height: 24, 
    borderRadius: 12, 
    marginLeft: 10, 
    marginRight: 10, 
    marginTop: 6 
},  
searchTextInput:{ 
    flex: 10, 
    padding: 0, 
    paddingLeft: 10, 
    color: 'black' 
},
swipeListViewContainer: {
    paddingTop: 10, 
    flex: 1 
  },
loadMoreText: {
    fontSize:16, 
    color: '#2A83F2', 
    fontFamily: 'sans-serif-condensed'
  },
loadMoreContainer: {
    justifyContent: 'center', 
    alignItems: 'center' ,
    height: 46
  }, 
 noMoreMessage: {
    color: '#F05D5D',
    fontSize:16 ,
    fontFamily: 'sans-serif-condensed'
  },
rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnRight: {
    backgroundColor: '#F5F5F5',
    right: 0
  },
  backRightBtnLeft: {
    backgroundColor: '#F5F5F5',
    right: 75
  },
  backRightBtnRightDelete: {
    color: '#EE3B3B',
    marginTop: 5,
    fontSize: 12
  },
  backRightBtnRightMark: {
    marginTop: 5,
    fontSize: 12,
    color: '#33373D'
  }
 });