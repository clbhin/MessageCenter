import React, { PropTypes, Component } from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  WebView
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import { getNames, spliceMessage} from '../../services/mcServices';
import lodash from 'lodash';
import ModalComponent from './../../components/Modal';

/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class CreateMessageView extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      background: 'red',
      currentMessage: this.props.navigation.state.params,
      Bcc: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Bcc,
      Cc: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Cc,
      From: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.From,
      Subject: this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Subject,
      MessageBody: this.props.navigation.state.params.UserMessage && this.props.navigation.state.params.UserMessage.Type === 'Draft' ? this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.MessageBody : '',
      LastMessageBody: lodash.isEmpty(this.props.navigation.state.params.Message) || (this.props.navigation.state.params.UserMessage && this.props.navigation.state.params.UserMessage.Type === 'Draft') ? '' : spliceMessage(this.props.navigation.state.params.Message),
      // To: this.props.navigation.state.params.UserMessage && this.props.navigation.state.params.UserMessage.Type == 'Draft'? [this.props.navigation.state.params.Message.To] : 
      //   [this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.From],
      To: this.props.navigation.state.params.origin == 'fw'? [] : 
          this.props.navigation.state.params.UserMessage && this.props.navigation.state.params.UserMessage.Type == 'Draft'? this.props.navigation.state.params.Message.To :
          [this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.From],
      ToNames: this.props.navigation.state.params.Message && this.props.navigation.state.params.UserMessage.Type == 'Draft'?
        getNames(this.props.navigation.state.params.Message.To) : this.props.navigation.state.params.origin == 'fw'? '':lodash.isEmpty(this.props.navigation.state.params)? '':
         this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.From.PersonName,
      BccNames: getNames(this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Bcc),
      CcNames: getNames(this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Cc),
      type: this.props.navigation.state.params.UserMessage && this.props.navigation.state.params.UserMessage.Type,
      id: this.props.navigation.state.params.UserMessage && this.props.navigation.state.params.UserMessage.MessageId,     
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
      if (nextProps.recipients !== this.props.recipients) {
        switch (nextProps.nameType) {
          case 'ToNames':
            this.setState({
              To: nextProps.recipients,
              ToNames: getNames(nextProps.recipients)
            })
            break;
          case 'CcNames':
            this.setState({
              Cc: nextProps.recipients,
              CcNames: getNames(nextProps.recipients)
            })
            break;
          case 'BccNames':
            this.setState({
              Bcc: nextProps.recipients,
              BccNames: getNames(nextProps.recipients)
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

  componentWillMount() {
    console.log(this.props);
}

  send() {
    let formData = new FormData();
    let message = {}
    message.Bcc = this.state.Bcc;
    message.Cc = this.state.Cc;
    message.To = this.state.To;
    message.Subject = this.state.Subject;
    message.MessageBody = this.state.MessageBody.replace(/\n/gm,'<br />') +'<div style="font-size:14px;margin-top:10px">Sent from my phone</div>'+this.state.LastMessageBody;
    message.From = { PersonName: this.props.userInfo.PersonName, Id: this.props.userInfo.Id }; 
    if(this.state.type && this.state.type == 'Draft'){
      message.Id = this.state.id;
    } 
    formData.append('message', JSON.stringify(message))
    this.props.CreateMessageStateActions.sendMessage(formData);
     if(this.state.type == 'Inbox' || this.state.type == 'Sent'){     
      this.props.navigation.goBack(null);
    }else if(this.state.type == 'Draft'){
      this.props.DraftStateActions.getMessages(this.props.userInfo.Id, 'Draft');
      this.props.navigate({routeName: 'DraftStack'});
    }else{
      this.props.InboxStateActions.getMessages(this.props.userInfo.Id, 'Inbox');
      this.props.navigate({routeName: 'InboxStack'});
    } 
  }

  selectName(nameType) {
    let data = [];
    if(nameType=='ToNames'){ data = this.state.To;}
    else if(nameType=='CcNames'){ data = this.state.Cc;}
    else if(nameType=='BccNames'){ data = this.state.Bcc;}
    this.props.CreateMessageStateActions.selectNames(nameType);
    this.props.navigate({ routeName: 'RecipientStack' ,params: data});
  }

  back() {
    let toName = '';
    let messageBody = '';
    if(!lodash.isEmpty(this.props.navigation.state.params) && this.props.navigation.state.params.origin == 'fw'){
      toName = ''}else if(this.props.navigation.state.params.origin == 'reply' || this.props.navigation.state.params.origin == 'replyAll' )
      {toName = this.props.navigation.state.params.Message.From.PersonName}else if(!lodash.isEmpty(this.props.navigation.state.params) && this.props.navigation.state.params.UserMessage.Type == 'Draft')
      {toName = getNames(this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.To)}
    if(!lodash.isEmpty(this.props.navigation.state.params) && this.props.navigation.state.params.UserMessage.Type == 'Draft'){
      messageBody = this.props.navigation.state.params.Message.MessageBody;
    }else{messageBody = ''}
    if(lodash.isEmpty(this.props.navigation.state.params)){
      if( lodash.isEmpty(this.state.ToNames) && lodash.isEmpty(this.state.Subject) && lodash.isEmpty(this.state.CcNames) && lodash.isEmpty(this.state.BccNames)  && lodash.isEmpty(this.state.MessageBody) ){this.props.navigation.goBack(null);}
      else{    return this.setState({ isModalVisible: true })}
    }else{
      if( this.state.ToNames == toName &&
      this.state.Subject == this.props.navigation.state.params.Message.Subject &&
      this.state.CcNames == getNames(this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Cc) && 
      this.state.BccNames == getNames(this.props.navigation.state.params.Message && this.props.navigation.state.params.Message.Bcc)  && 
      this.state.MessageBody == messageBody){this.props.navigation.goBack(null);}
      else{    return this.setState({ isModalVisible: true })}
    }
  }

  hideModal() {
    return this.setState({ isModalVisible: false })
  }

  deleteModal() {
    this.props.navigation.goBack(null);
  }

  save() {
    let formData = new FormData();
    let message = {}
    message.Bcc = this.state.Bcc;
    message.Cc = this.state.Cc;
    message.To = this.state.To;
    if(message.To[0] ==undefined){
      message.To[0] = {};
      message.To[0].PersonName = '' ;
      message.To[0].Id = '';
    }
    message.Subject = this.state.Subject;
    message.MessageBody = this.state.MessageBody + this.state.LastMessageBody;
    message.From = { PersonName: this.props.userInfo.PersonName, Id: this.props.userInfo.Id  };
    if(this.state.type && this.state.type == 'Draft'){
      message.Id = this.state.id;
    } 
    formData.append('message', JSON.stringify(message));
    this.props.CreateMessageStateActions.saveAsDraft(formData);
    this.props.navigation.goBack(null);
    if(this.state.type == 'Draft' || this.state.type == undefined){
      this.props.DraftStateActions.getMessages(this.props.userInfo.Id, 'Draft');
    }
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row', height: 50, borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center', backgroundColor: '#39babd' }}>
          <TouchableOpacity onPress={() => this.back()} style={{ flex: 1 }}>
            <Icon name='arrow-left' size={30} color={'orange'} />
          </TouchableOpacity>
          <Text style={{ flex: 5, textAlign: 'left' }}>CreateMessage</Text>
          {this.state.To[0]==undefined? 
            <View style={{flex: 1}}>
            <Icon name='direction' size={30} color={'grey'} />
            </View>:
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.send()}>
            <Icon name='direction' size={30} color={'orange'} />
          </TouchableOpacity>
          }
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
          <View style={{ flexDirection: 'column', height: 300 }}>
            <TextInput style={{ flex: 1, borderColor: 'gray', borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopWidth: 0.1, textAlignVertical: 'top' }}  onChangeText={(text) => this.setState({ 'MessageBody': text })} value={this.state.MessageBody} multiline={true} />
            {lodash.isEmpty(this.state.LastMessageBody) ? null : <WebView source={{html: this.state.LastMessageBody}} style={{height:400}}/>}
          </View>
        </View>
        <ModalComponent isModalVisible={this.state.isModalVisible} hideModal={this.hideModal} deleteModal={this.deleteModal} save={this.save} />
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
