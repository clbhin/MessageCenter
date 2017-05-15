import React, {PropTypes, Component} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
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
      currentMessage: this.props.navigation.state.params,
      Bcc: this.props.navigation.state.params.Message.Bcc[0],
      Cc: this.props.navigation.state.params.Message.Cc[0],
      From: this.props.navigation.state.params.Message.From,
      Subject: this.props.navigation.state.params.Message.Subject,
      MessageBody: '',
      To: [this.props.navigation.state.params.Message.From]
    };
  }
  static displayName = 'MessageDetailView';

  static navigationOptions = {
    header: {
      style: {
        height: 0
      }
    }
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    try{
      if (nextProps.contactData !== this.props.contactData) {
        console.log(nextProps);
        console.log(this)
      this.setState({
        To: nextProps.contactData[0]
      });
    }
    }catch(err){
      console.log(err)
    }
  }

  send() {
    let formData = new FormData();
    let message = {}
    message.Bcc = this.state.Bcc;
    message.Cc = this.state.Cc;
    message.To = this.state.To;
    message.Subject = this.state.Subject;
    message.MessageBody=this.state.MessageBody;
    message.From=this.state.From;
    formData.append('message', JSON.stringify(message))

    fetch('http://172.16.40.103:8079/api/Messages/SendMessage', {
      method: "POST",
      headers: {},
        body: formData
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        Alert.alert('Message success send')
      })
      .catch(function (error) {
        console.log('request failed: ', error)
      })
      this.props.navigation.goBack(null);
      
  }


  render() {
    return (
      <View>
        <View style={{flexDirection: 'row',height: 40,borderBottomWidth: 1,borderBottomColor: '#ccc',alignItems: 'center',backgroundColor: '#39babd'}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{flex: 1}}>
            <Icon name='arrow-left' size={30} color={'orange'}/>
          </TouchableOpacity>
          <Text style={{flex: 5,textAlign: 'center'}}>reply</Text>
          <TouchableOpacity style={{flex: 1}} onPress={() => this.send()}>
            <Icon name='direction' size={30} color={'orange'}/>
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: 10,marginTop: 10,marginRight: 10,flexDirection: 'column'}}>
          <View style={{flexDirection: 'row',alignItems: 'center',borderBottomWidth: 1,borderBottomColor: '#ddd'}}>
            <Text style={{fontSize: 16,textAlign: 'center'}}>To:</Text>
            <TextInput value={this.state.To.PersonName} onChangeText={(PersonName) => {
              this.setState({
                'To': {
                  'PersonName': PersonName,
                  'Id': PersonName
                }
              })
            }}
              style={{flex: 1}}>
            </TextInput>
            <TouchableOpacity onPress={()=>this.props.navigate({routeName: 'ContactStack'})}>
              <Icon name='circle-with-plus' size={30} color={'#007FFB'}/>
            </TouchableOpacity>  
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center',borderBottomWidth: 1,borderBottomColor: '#ddd'}}>
            <Text style={{fontSize: 16,textAlign: 'center'}}>Cc:</Text>
            <TextInput value={this.state.Cc && this.state.Cc.PersonName} onChangeText={(text) => {
              this.setState({
                'Cc': {
                  'PersonName': text,
                  'Id': text
                }
              })
            }}
              style={{flex: 1}}>
            </TextInput>
            <TouchableOpacity>
              <Icon name='circle-with-plus' size={30} color={'#007FFB'}/>
            </TouchableOpacity> 
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center',borderBottomWidth: 1,borderBottomColor: '#ddd'}}>
            <Text style={{fontSize: 16,textAlign: 'center'}}>Bcc:</Text>
            <TextInput value={''} style={{flex: 1}}></TextInput>
            <TouchableOpacity>
              <Icon name='circle-with-plus' size={30} color={'#007FFB'}/>
            </TouchableOpacity> 
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center',borderBottomWidth: 1,borderBottomColor: '#ddd'}}>
            <Text style={{fontSize: 16,textAlign: 'center'}}>Subject:</Text>
            <TextInput value={this.state.Subject} onChangeText={(Subject) => {this.setState({Subject})}} style={{flex: 1}}></TextInput>
          </View>
          <TextInput
            style={{borderColor: 'gray',minHeight: 300,borderWidth: 1}} onChangeText={(text) => this.setState({'MessageBody': text})} value={this.state.MessageBody} multiline={true}/>
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
