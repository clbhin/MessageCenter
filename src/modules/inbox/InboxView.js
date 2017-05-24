import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Text,
  View,
  ListView,
  TextInput,
  Picker,
  DrawerLayoutAndroid,
  Alert,
  Dimensions,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import MessageView from './../../components/Message';
import DrawerView from './../drawer/DrawerView'; 
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Entypo';
import LoadMoreFooter from './../../components/LoadMoreFooter';

class InboxView extends Component {
  constructor(props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  const data=[
    {Message:{From:{Id:'Xiang Zhang',PersonName:'Xiang Zhang'},Subject:'111',MessageBody:'<p>111</p>'}},
    {Message:{From:{Id:'Xiang Zhang',PersonName:'Xiang Zhang'},Subject:'222',MessageBody:'<p>222</p>'}}]
  this.state = {
    dataSource: ds.cloneWithRows(data),
     criteria:'',
     userId:'',
     type:'Inbox',
     startIndex:0,
     pageSize:10,
     onEndReached: false,
  };
  this.ds=ds;
  this.closeDrawer = this.closeDrawer.bind(this);
  this.openDrawer = this.openDrawer.bind(this);
  this.transformMessage = this.transformMessage.bind(this);
  this.screenSize = Dimensions.get('window');
  this.renderFooter = this.renderFooter.bind(this);
}
  static displayName = 'InboxView';

  static navigationOptions = {
    header:{
      style:{height:0}
    }
  }

  static propTypes = {
  };

  transformMessage = (currentMessage) => {
    this.props.InboxStateActions.readMessage(currentMessage.UserMessage);
    this.props.navigate({routeName: 'MessageDetailStack',params:currentMessage});
  };

  componentWillReceiveProps(nextProps) {
    try{
      if (nextProps.value !== this.props.value && nextProps.value) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.value),
        userId:nextProps.userId
      });
    }
    }catch(err){
      console.log(err)
    }
  }

  componentWillMount(){
    this.props.InboxStateActions.getMessages(this.props.userId,'Inbox');
  }

   closeDrawer(){
        this.refs['DRAWER'].closeDrawer();
    }

  openDrawer(){    
    this.refs['DRAWER'].openDrawer();
  }

  deleteMessage(data){
   this.props.InboxStateActions.deleteMessage(data.UserMessage);
  }

  markMessage(currentMessage){
    this.props.InboxStateActions.markMessage(currentMessage.UserMessage);
  }

  searchMessage(){
    let messageSearchCriteria={};
    messageSearchCriteria.SearchText=this.state.criteria;
    messageSearchCriteria.Type=this.state.type;
    messageSearchCriteria.UserId=this.state.userId;
    messageSearchCriteria.Start=this.state.startIndex;
    messageSearchCriteria.PageSize=this.state.pageSize;
    this.props.InboxStateActions.searchMessage(messageSearchCriteria);
   }

  createMessage(){
    let data={};
    this.props.navigate({routeName: 'CreateMessageStack',params:data});
  }

  reloadData(){
    this.props.InboxStateActions.getMessages('Xiang Zhang','Inbox');
  }

  toEnd(){
    let messageLoadMore={};
    messageLoadMore.UserId=this.state.userId;
    messageLoadMore.Type=this.state.type;
    messageLoadMore.Start=0 || (this.props.value && this.props.value.length);
    messageLoadMore.PageSize=this.state.pageSize;
    messageLoadMore.SearchText=this.state.criteria;
    this.props.InboxStateActions.loadMoreMessages(messageLoadMore);
  }

  renderFooter(){
    if((this.props.value && this.props.value.length % 10) === 0 ){
      return <LoadMoreFooter />
    }else{
      return <LoadMoreFooter isLoadAll={true} />
    }
   }

  render() {
    var navigationView =(
      <DrawerView closeDrawer={this.closeDrawer} navigate={this.props.navigate}/>
    );

    return (

      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={()=>navigationView}
        ref={'DRAWER'}
        style={{backgroundColor: '#fff', paddingBottom: 260}}
      >
        <View style={{flexDirection:'row',paddingLeft:10,paddingRight:10,borderBottomWidth:1,borderBottomColor:'#ccc'}}>
          <TouchableOpacity onPress={()=>{this.openDrawer()}}>
            <Image style={{width: 30,height: 40}}source={require('./../../../images/headbar.png')}></Image>
          </TouchableOpacity>
          <View style={{flex:1,marginLeft:20}}>
            <Text style={{fontSize:18,color:'black'}}>Inbox</Text>
            <Text style={{fontSize:12}}>welcome,{this.state.userId}</Text>
          </View>
          <View style={{}}>
            <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent: 'center',marginRight: 7, width: 30}} onPress={()=>{this.createMessage()}}>
              <Icon name='plus' size={20} color={'#33373D'}></Icon>              
            </TouchableOpacity>    
          </View>
        </View>
        <View style={{flexDirection:'row',backgroundColor:'#ccc',height:24,borderRadius:12,marginLeft:10,marginRight:10,marginTop:6}}>
          <View style={{flexDirection:'row',flex:3,alignItems: 'center',justifyContent: 'center',}}>
            <TextInput placeholder='Search' style={{flex:10,padding: 0,paddingLeft:10,color:'black'}} underlineColorAndroid="transparent" value={this.state.criteria} onChangeText={(criteria) => this.setState({criteria})}/>
             <TouchableOpacity onPress={()=>{this.searchMessage()}}>
               <Icon name='magnifying-glass' size={24}></Icon>
             </TouchableOpacity>
          </View>

        </View>
        <SwipeListView style={{paddingTop:10}}
          refreshControl={
              < RefreshControl refreshing={false} onRefresh={()=>{this.reloadData()}}              
              />}
          dataSource={this.state.dataSource}
          renderRow={(rowData, secId, rowId, rowMap) =>           
             <MessageView  messageData={rowData} secId={secId} rowId={rowId} rowMap={rowMap}  transformMessage={this.transformMessage} />
          }
          renderHiddenRow={
            (rowData,secId,rowId,rowMap) =>(
              <View style={styles.rowBack}>
                <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                  <TouchableOpacity onPress={()=>{this.markMessage(rowData);rowMap[`${secId}${rowId}`].closeRow()}}>
                    <Icon name='star' size={20} color={'#33373D'}/>
                    <Text style={styles.backRightBtnRightMark}>Mark</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                  <TouchableOpacity  onPress={()=>{this.deleteMessage(rowData);rowMap[`${secId}${rowId}`].closeRow()}}>
                  <Icon name='trash' size={20} color={'#EE3B3B'}/>
                  <Text style={styles.backRightBtnRightDelete}>Delete</Text>
                </TouchableOpacity>
                </View>
                
              </View>
            )
          }
          onEndReached={()=>{this.toEnd()}}
          onEndReachedThreshold={10}
          rightOpenValue={-150} 
          disableRightSwipe   
          enableEmptySections={true}  
          closeOnRowPress={true}
          renderFooter={()=>{return this.renderFooter()}}             
        />
      </DrawerLayoutAndroid>
      
    );
  }
}

const circle = {
  borderWidth: 0,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor:'red',
  justifyContent:'center',
  alignItems:'center',
  overflow:'hidden'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:10
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center'
  },
  counterButton: {
    ...circle,
    backgroundColor: '#349d4a',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  counter: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
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
  backTextWhite: {
		color: '#FFF'
	},
  loadMessage :{
    justifyContent: 'center',
    alignItems: 'center',
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

export default InboxView;