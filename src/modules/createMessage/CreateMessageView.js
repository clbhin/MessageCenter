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
    this.state = {
      background: 'red',
      currentMessage:this.props.navigation.state.params,
    };
    this.send=this.send.bind(this)
  }
  static displayName = 'MessageDetailView';

  static navigationOptions = {
    /*title: 'CreateMessageView',
    tabBar: () => ({
      icon: (props) => (
        <Icon name='color-lens' size={24} color={props.tintColor} />
      )
    }),
    // TODO: move this into global config?
    header: {
      tintColor: 'white',
      style: {
        backgroundColor: '#39babd',
        paddingRight:10
      },
    right : (
      <TouchableOpacity onPress={this.send}>
        <Icon name={'send'} size={24} color='blue'/>
      </TouchableOpacity>
    )
  }*/
    header:{
      style:{
        height:0
      }
    }
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  send(){
    let formData=new FormData();
  }

  render() {
    return (
      <View>
        <View style={{flexDirection:'row',height:40,borderBottomWidth:1,borderBottomColor:'#ccc',alignItems:'center',backgroundColor: '#39babd'}}>
           <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{flex:1}}>
            <Icon name='arrow-left' size={30} color={'orange'} />
          </TouchableOpacity>
          <Text style={{flex:5,textAlign:'center'}}>reply</Text>
          <TouchableOpacity  style={{flex:1}}>
            <Icon name='direction' size={30} color={'orange'} />
          </TouchableOpacity>   
        </View>
        <View style={{marginLeft:10,marginTop:10,marginRight:10,flexDirection:'column'}}>
          <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
            <Text style={{fontSize:16,textAlign: 'center'}}>To:</Text>
            <TextInput value={this.state.currentMessage.Message.From.PersonName} onChangeText={(PersonName) => {
              this.setState({'currentMessage.Message.From.PersonName':PersonName})
              }} style={{flex:1}}></TextInput>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
             <Text style={{fontSize:16,textAlign: 'center'}}>Cc:</Text>
            <TextInput value={''} style={{flex:1}}></TextInput>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
             <Text style={{fontSize:16,textAlign: 'center'}}>Bcc:</Text>
            <TextInput value={''} style={{flex:1}}></TextInput>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
            <Text style={{fontSize:16,textAlign: 'center'}}>Subject:</Text>
            <TextInput value={'reply:'+this.state.currentMessage.Message.Subject} style={{flex:1}}></TextInput>
          </View>
          <TextInput
            style={{borderColor: 'gray', minHeight:300,borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            multiline={true}
          />
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

export default CreateMessageView;
