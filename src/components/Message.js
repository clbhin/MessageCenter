import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ListView
} from 'react-native';

class MessageView extends Component{
  static propTypes = {
    messageData:PropTypes.object
  };
  render(){
    return <View style={{flexDirection:'row',marginLeft:20,marginRight:10}}>
        <View style={circle}>
          <Image style={{width: 40,height: 40,borderRadius: 20}} source={require('./../../images/pepperoni.png')}></Image>
        </View>
        <View style={{flex:3,marginLeft:10,borderBottomColor:'#ddd',borderBottomWidth:1,paddingBottom:4}}>
          <Text style={{fontSize:18}}>{this.props.messageData.fromName}</Text>
          <Text style={{fontSize:14}}>{this.props.messageData.subjectName}</Text>
          <Text style={{fontSize:14}}>{this.props.messageData.messageBody}</Text>
        </View>
      </View>
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

export default MessageView;