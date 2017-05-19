import React, {PropTypes, Component} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import {MessageFormatAllDate} from '../../utils/dateTimeHelper'
import lodash from 'lodash'

/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class MessageDetailView extends Component {
    constructor(props) {
    super(props);
    this.state = {
      background: 'red',
      currentMessage:this.props.navigation.state.params,
    };
    this.screenSize = Dimensions.get('window');    
  }
  static displayName = 'MessageDetailView';

  static navigationOptions = {
    title: 'MessageDetail',
    tabBar: () => ({
      icon: (props) => (
        <Icon name='reply' size={24} color={props.tintColor} />
      )
    }),
    // TODO: move this into global config?
    header: {
      tintColor: 'white',
      style: {
        height: 0
      }
    }
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  back=()=>{
    this.props.navigation.goBack(null)
    this.props.InboxStateActions.getMessages('Xiang Zhang','Inbox');
  }

  reply = (currentMessage) => {
    let data=lodash.cloneDeep(currentMessage);
    data.Message.Cc=[];
    data.Message.Bcc=[];
    this.props.navigate({routeName: 'CreateMessageStack',params:data});
  };

  replyAll=(currentMessage) =>{
    this.props.navigate({routeName: 'CreateMessageStack',params:currentMessage});
  }

  deleteMessage(currentMessage){
    this.props.InboxStateActions.deleteMessage(currentMessage.UserMessage);
    this.props.navigation.goBack(null)
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row',height: 40,borderBottomWidth: 1,borderBottomColor: '#ccc',alignItems: 'center',backgroundColor: '#39babd'}}>
          <TouchableOpacity onPress={() => this.back()} style={{flex: 1}}>
            <Icon name='arrow-left' size={30} color={'orange'}/>
          </TouchableOpacity>
          <Text style={{flex: 5,textAlign: 'left'}}>MessageDetail</Text>
        </View>
        <View style={{marginLeft:10,marginTop:10,marginRight:10,flexDirection:'column'}}> 
          <Text style={{fontSize:16,height:30,justifyContent: 'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>To:Xiang Zhang</Text>
          <Text style={{fontSize:16,height:20,justifyContent: 'center'}}>{this.state.currentMessage.Message.Subject}</Text>
          <Text style={{fontSize:10,height:20,justifyContent: 'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>{MessageFormatAllDate(this.state.currentMessage.Message.Timestamp)}</Text>
          <Text style={{fontSize:16}}>{this.state.currentMessage.Message.MessageBody}</Text>
        </View>
        <View style={{height:40,borderRadius:20,backgroundColor:'#ccc',flexDirection:'row',justifyContent:'space-between',paddingLeft:24,paddingRight:24,alignItems:'center',position:'absolute',top:this.screenSize.height-80,left:0,right:0}}>
          <TouchableOpacity style={{flexDirection:'column'}} onPress={this.reply.bind(this,this.state.currentMessage)}>
            <Icon name='reply' size={20} color={'blue'} />
            <Text>REPLY</Text>
          </TouchableOpacity>   
          <TouchableOpacity style={{flexDirection:'column'}} onPress={this.replyAll.bind(this,this.state.currentMessage)}>
            <Icon name='reply-all' size={20} color={'blue'}/>
            <Text>REPLYALL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'column'}} onPress={()=>this.deleteMessage(this.state.currentMessage)}>
            <Icon name='trash' size={20} color={'blue'}/>
            <Text>DELETE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'column'}}>
            <Icon name='star-outlined' size={20} color={'orange'}/>
            <Text>MARK</Text>
          </TouchableOpacity>   
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MessageDetailView;
