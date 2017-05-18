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
  Alert
} from 'react-native';
import MessageView from './../../components/Message';
import {GetMessages} from './../../services/messageCenterServices'
import Icon from 'react-native-vector-icons/Entypo';
import DrawerView from './../drawer/DrawerView'; 
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';

class InboxView extends Component {
  constructor(props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  const data=[
    {Message:{From:{Id:'Xiang Zhang',PersonName:'Xiang Zhang'},Subject:'111',MessageBody:'<p>111</p>'}},
    {Message:{From:{Id:'Xiang Zhang',PersonName:'Xiang Zhang'},Subject:'222',MessageBody:'<p>222</p>'}}]
  this.state = {
    dataSource: ds.cloneWithRows(data),
    criteria:'All'
  };
  this.ds=ds;
  this.closeDrawer = this.closeDrawer.bind(this);
  this.openDrawer = this.openDrawer.bind(this);
  this.transformMessage = this.transformMessage.bind(this);
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
    this.props.navigate({routeName: 'MessageDetailStack',params:currentMessage,action:this.props.InboxStateActions.getMessages('Xiang Zhang','Inbox')});
  };

  componentWillReceiveProps(nextProps) {
    try{
      if (nextProps.value !== this.props.value && nextProps.value) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.value)
      });
    }
    }catch(err){
      console.log(err)
    }
  }

  componentWillMount(){
    this.props.InboxStateActions.getMessages('Xiang Zhang','Inbox');
  }

   closeDrawer(){
        this.refs['DRAWER'].closeDrawer();
    }

  openDrawer(){    
    this.refs['DRAWER'].openDrawer();
  }

  deleteMessage(data){
    console.log(data);
   this.props.InboxStateActions.deleteMessage(data.UserMessage);
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
      >
        <View style={{flexDirection:'row',paddingLeft:10,paddingRight:10,borderBottomWidth:1,borderBottomColor:'#ccc'}}>
          <TouchableOpacity onPress={()=>{this.openDrawer()}}>
            <Image style={{width: 30,height: 40}}source={require('./../../../images/headbar.png')}></Image>
          </TouchableOpacity>
          <View style={{flex:1,marginLeft:20}}>
            <Text style={{fontSize:18,color:'black'}}>Inbox</Text>
            <Text style={{fontSize:12}}>welcome,Xiang Zhang</Text>
          </View>
        </View>
        <View style={{flexDirection:'row',backgroundColor:'#eee',height:24,borderRadius:12,marginLeft:10,marginRight:10,marginTop:6}}>
          <View style={{flexDirection:'row',flex:3,alignItems: 'center',justifyContent: 'center',}}>
            <Text style={{flex:3,fontSize:12,textAlign:'center'}}>{this.state.criteria}</Text>
            <Picker style={{flex:1}}
              selectedValue={this.state.criteria}
              onValueChange={(value) => this.setState({criteria: value})}>
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Subject" value="Subject" />
              <Picker.Item label="FromName" value="FromName" />
              <Picker.Item label="ToName" value="ToName" />
            </Picker>
          </View>
          <TextInput placeholder='Search' style={{flex:10,padding: 0,color:'black'}} underlineColorAndroid="transparent" />

        </View>
        <SwipeListView style={{paddingTop:10}}
          dataSource={this.state.dataSource}
          renderRow={(rowData, secId, rowId, rowMap) => 
                      
             <MessageView  messageData={rowData} secId={secId} rowId={rowId} rowMap={rowMap}  transformMessage={this.transformMessage} />
            
          }
          renderHiddenRow={
            (rowData,secId,rowId,rowMap) =>(
              <View style={styles.rowBack}>
                <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                  <TouchableOpacity onPress={_=> rowMap[`${secId}${rowId}`].closeRow()}><Text>Right</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} 
                onPress={()=>{this.deleteMessage(rowData);rowMap[`${secId}${rowId}`].closeRow()}}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            )
          }
          rightOpenValue={-150} 
          disableRightSwipe   
          enableEmptySections={true}  
          closeOnRowPress={true}             
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
		backgroundColor: 'red',
		right: 0
	},
  backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
  backTextWhite: {
		color: '#FFF'
	}
});

export default InboxView;