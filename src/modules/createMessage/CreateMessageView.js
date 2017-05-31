import React, { PropTypes, Component } from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import { getNames ,spliceMessage} from '../../services/mcServices';
import lodash from 'lodash';
import ModalComponent from './../../components/Modal';

/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class CreateMessageView extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      background: 'red',
      currentMessage: this.props.navigation.state.params,
      Bcc: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Bcc,
      Cc: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Cc,
      From: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.From,
      Subject: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Subject,
      MessageBody: '',
      LastMessageBody:lodash.isEmpty(this.props.navigation.state.params.Message)?'':spliceMessage(this.props.navigation.state.params.Message),
      To: [this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.From],
      ToNames: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.From.PersonName,
      BccNames: getNames(this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Bcc),
      CcNames: getNames(this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Cc),
      isModalVisible: false
    };
    this.data = [];
    this.ds = ds;
    this.hideModal = this.hideModal.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.save = this.save.bind(this);
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
    try {
      if (nextProps.contactData !== this.props.contactData) {
        switch (nextProps.boxType) {
          case 'ToNames':
            this.setState({
              To: nextProps.contactData,
              ToNames: getNames(nextProps.contactData)
            })
            break;
          case 'CcNames':
            this.setState({
              Cc: nextProps.contactData,
              CcNames: getNames(nextProps.contactData)
            })
            break;
          case 'BccNames':
            this.setState({
              Bcc: nextProps.contactData,
              BccNames: getNames(nextProps.contactData)
            })
            break;
          default:
            return
        }
      }
    } catch (err) {
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
    message.MessageBody = this.state.MessageBody+'\n\n'+this.state.LastMessageBody;
    message.From = { PersonName: 'Xiang Zhang', Id: 'Xiang Zhang' };
    formData.append('message', JSON.stringify(message))

    fetch('http://172.16.40.117/MessageCenter/MessageCenter.IISHost.Messages/api/Messages/SendMessage', {
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
    this.props.InboxStateActions.getMessages('Xiang Zhang', 'Inbox');
    this.props.navigation.goBack(null);

  }

  selectName(nameType) {
    this.props.CreateMessageStateActions.selectNames(nameType);
    this.props.navigate({ routeName: 'ContactStack' });
  }

  back(){
    return this.setState({isModalVisible: true})
  }

  hideModal(){
    return this.setState({isModalVisible: false})
  }

  deleteModal(){
    this.props.navigation.goBack(null);
  }

  save(){
     let formData = new FormData();
    let message = {}
    message.Bcc = this.state.Bcc;
    message.Cc = this.state.Cc;
    message.To = this.state.To;
    message.Subject = this.state.Subject;
    message.MessageBody = this.state.MessageBody+'\n\n'+this.state.LastMessageBody;
    message.From = { PersonName: 'Xiang Zhang', Id: 'Xiang Zhang' };
    formData.append('message', JSON.stringify(message))

    fetch('http://172.16.40.117/MessageCenter/MessageCenter.IISHost.Messages/api/Messages/SaveAsDraft', {
      method: "POST",
      headers: {},
      body: formData
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })
      .catch(function (error) {
        console.log('request failed: ', error)
      })   
    this.props.navigation.goBack(null);

  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row', height: 50, borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center', backgroundColor: '#39babd' }}>
          <TouchableOpacity onPress={() => this.back()} style={{ flex: 1 }}>
            <Icon name='arrow-left' size={30} color={'orange'} />
          </TouchableOpacity>
          <Text style={{ flex: 5, textAlign: 'left' }}>CreateMessage</Text>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.send()}>
            <Icon name='direction' size={30} color={'orange'} />
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 10, marginTop: 10, marginRight: 10, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>To:</Text>
            <TextInput value={this.state.ToNames} onChangeText={(PersonName) => {
              this.setState({
                'To': {
                  'PersonName': PersonName,
                  'Id': PersonName
                }
              })
            }}
              style={{ flex: 1 }}>
            </TextInput>
            <TouchableOpacity onPress={() => this.selectName('ToNames')}>
              <Icon name='circle-with-plus' size={30} color={'#007FFB'} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>Cc:</Text>
            <TextInput value={this.state.CcNames} onChangeText={(text) => {
              this.setState({
                'Cc': {
                  'PersonName': text,
                  'Id': text
                }
              })
            }}
              style={{ flex: 1 }}>
            </TextInput>
            <TouchableOpacity onPress={() => this.selectName('CcNames')} >
              <Icon name='circle-with-plus' size={30} color={'#007FFB'} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>Bcc:</Text>
            <TextInput value={this.state.BccNames} style={{ flex: 1 }}></TextInput>
            <TouchableOpacity onPress={() => this.selectName('BccNames')}>
              <Icon name='circle-with-plus' size={30} color={'#007FFB'} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>Subject:</Text>
            <TextInput value={this.state.Subject} onChangeText={(Subject) => { this.setState({ Subject }) }} style={{ flex: 1 }}></TextInput>
          </View>
          <TextInput style={{ borderColor: 'gray', minHeight: 100, borderLeftWidth:0,borderRightWidth: 0,borderBottomWidth:0,borderTopWidth:0.1,textAlignVertical: 'top'}} autoFocus={true}  onChangeText={(text) => this.setState({ 'MessageBody': text })} value={this.state.MessageBody} multiline={true} />
          {lodash.isEmpty(this.state.LastMessageBody)?null:<TextInput style={{ borderColor: 'gray', minHeight: 300, borderLeftWidth:0,borderRightWidth: 0,borderTopWidth:1,textAlignVertical:'top'}} onChangeText={(text) => this.setState({ 'LastMessageBody': text })} value={this.state.LastMessageBody} multiline={true} />} 
        </View>
        <ModalComponent isModalVisible={this.state.isModalVisible} hideModal={this.hideModal} deleteModal={this.deleteModal} save={this.save}/>
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
