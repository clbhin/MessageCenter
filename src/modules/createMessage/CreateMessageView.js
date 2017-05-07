import React, {PropTypes, Component} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class CreateMessageView extends Component {
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
    title: 'CreateMessageView',
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



  render() {
    return (
      <View style={{marginLeft:10,marginTop:10,marginRight:10,flexDirection:'column'}}>
          <Text style={{fontSize:16,height:30,justifyContent: 'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>To:{this.state.currentMessage.Message.From.PersonName}</Text>
          <Text style={{fontSize:16,height:30,justifyContent: 'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>From:</Text>
          <Text style={{fontSize:16,height:30,justifyContent: 'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>Subject:reply: {this.state.currentMessage.Message.Subject}</Text>
          <TextInput style={{flex:1}} underlineColorAndroid="transparent" />
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

export default CreateMessageView;
