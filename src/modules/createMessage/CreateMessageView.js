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
      Bcc:this.props.navigation.state.params.Message.Bcc[0],
      Cc:this.props.navigation.state.params.Message.Cc[0],
      From:this.props.navigation.state.params.Message.From,
      Subject:this.props.navigation.state.params.Message.Subject,
      MessageBody:''
    };
    this.send=this.send.bind(this)
  }
  static displayName = 'MessageDetailView';

  static navigationOptions = {
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
    formData.append('Bcc',this.state.Bcc);
    formData.append('Cc',this.state.Cc);
    formData.append('To',this.state.From);
    formData.append('Subject',this.state.Subject);
    this.props.CreateMessageStateActions.sendMessage(formData);
  }

  render() {
    console.log(this)
    return (
      <View>
        <View style={{flexDirection:'row',height:40,borderBottomWidth:1,borderBottomColor:'#ccc',alignItems:'center',backgroundColor: '#39babd'}}>
           <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{flex:1}}>
            <Icon name='arrow-left' size={30} color={'orange'} />
          </TouchableOpacity>
          <Text style={{flex:5,textAlign:'center'}}>reply</Text>
          <TouchableOpacity  style={{flex:1}} onPress={()=>this.send}>
            <Icon name='direction' size={30} color={'orange'} />
          </TouchableOpacity>   
        </View>
        <View style={{marginLeft:10,marginTop:10,marginRight:10,flexDirection:'column'}}>
          <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
            <Text style={{fontSize:16,textAlign: 'center'}}>To:</Text>
            <TextInput value={this.state.From.PersonName} onChangeText={(PersonName) => {
              this.setState({'From':{'PersonName':PersonName,'Id':PersonName}})
              }} style={{flex:1}}></TextInput>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
             <Text style={{fontSize:16,textAlign: 'center'}}>Cc:</Text>
            <TextInput value={this.state.Cc && this.state.Cc.PersonName} onChange={(text)=>{this.setState({'Cc':{'PersonName':text,'Id':text}})}} style={{flex:1}}></TextInput>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
             <Text style={{fontSize:16,textAlign: 'center'}}>Bcc:</Text>
            <TextInput value={''} style={{flex:1}}></TextInput>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
            <Text style={{fontSize:16,textAlign: 'center'}}>Subject:</Text>
            <TextInput value={this.state.Subject} onChangeText={(Subject)=>{this.setState({Subject})}} style={{flex:1}}></TextInput>
          </View>
          <TextInput
            style={{borderColor: 'gray', minHeight:300,borderWidth: 1}}
            onChangeText={(text) => this.setState({'MessageBody':text})}
            value={this.state.MessageBody}
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
