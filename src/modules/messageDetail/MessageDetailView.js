import React, {PropTypes, Component} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import {MessageFormatAllDate} from '../../utils/dateTimeHelper'

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
        backgroundColor: '#39babd'
      }
    }
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  reply = (currentMessage) => {
    this.props.navigate({routeName: 'CreateMessageStack',params:currentMessage});
  };

  render() {
    return (
      <View style={{marginLeft:10,marginTop:10,marginRight:10,flexDirection:'column',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row',height:40,borderBottomWidth:1,borderBottomColor:'#ccc',alignItems:'center'}}>
           <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{flex:1}}>
            <Icon name='arrow-long-left' size={20} color={'orange'} />
          </TouchableOpacity>
          <Text style={{flex:5,textAlign:'center'}}>{this.state.currentMessage.Message.From.PersonName}</Text>   
        </View>
        <View>
          <Text style={{fontSize:16,height:30,justifyContent: 'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>toName:Xiang Zhang</Text>
          <Text style={{fontSize:16,height:20,justifyContent: 'center'}}>{this.state.currentMessage.Message.Subject}</Text>
          <Text style={{fontSize:10,height:20,justifyContent: 'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>{MessageFormatAllDate(this.state.currentMessage.Message.Timestamp)}</Text>
          <Text style={{fontSize:16}}>{this.state.currentMessage.Message.MessageBody}</Text>
        </View>
        <View style={{height:24,borderRadius:12,backgroundColor:'#ccc',flexDirection:'row',justifyContent:'space-between',paddingLeft:24,paddingRight:24,alignItems:'center'}}>
          <TouchableOpacity>
            <Icon name='reply' size={20} color={'blue'} onPress={this.reply.bind(this,this.state.currentMessage)}/>
          </TouchableOpacity>   
          <TouchableOpacity>
            <Icon name='reply-all' size={20} color={'blue'}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name='trash' size={20} color={'blue'}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name='star-outlined' size={20} color={'orange'}/>
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
