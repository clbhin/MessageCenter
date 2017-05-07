import React, {PropTypes, Component} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class MessageDetailView extends Component {
    constructor(props) {
    super(props);
    console.log(this)
    this.state = {
      background: 'red',
      currentMessage:this.props.navigation.state.params
    };
  }
  static displayName = 'MessageDetailView';

  static navigationOptions = {
    title: 'MessageDetail',
    tabBar: () => ({
      icon: (props) => (
        <Icon name='color-lens' size={24} color={props.tintColor} />
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
    console.log(currentMessage)
    this.props.navigate({routeName: 'CreateMessageStack',params:currentMessage});
  };

  render() {
    return (
      <View style={{marginLeft:10,marginTop:10,marginRight:10,flexDirection:'column',justifyContent:'space-between'}}>
        <View>
          <Text style={{fontSize:16,height:30,justifyContent: 'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>toName:</Text>
          <Text style={{fontSize:16,height:20,justifyContent: 'center'}}>{this.state.currentMessage.Message.Subject}</Text>
          <Text style={{fontSize:10,height:20,justifyContent: 'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>2017年5月07日周日 14:52</Text>
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
