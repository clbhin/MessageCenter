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
import styles from './../../styles/CreateMessageView';

/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class CreateMessageView extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let currentMessage = this.props.navigation.state.params.currentMessage;
    this.state = {
      background: 'red',
      currentMessage: currentMessage,
      Bcc: currentMessage.Message && currentMessage.Message.Bcc,
      Cc: currentMessage.Message && currentMessage.Message.Cc,
      From: currentMessage.Message && currentMessage.Message.From,
      Subject: currentMessage.Message && currentMessage.Message.Subject,
      MessageBody: currentMessage.UserMessage && currentMessage.UserMessage.Type === 'Draft' ? currentMessage.Message && currentMessage.Message.MessageBody : '',
      LastMessageBody: lodash.isEmpty(currentMessage.Message) || (currentMessage.UserMessage && currentMessage.UserMessage.Type === 'Draft') ? '' : spliceMessage(currentMessage.Message),
      To: currentMessage.origin == 'fw'? [] : 
          currentMessage.UserMessage && currentMessage.UserMessage.Type == 'Draft'? currentMessage.Message.To :
          [currentMessage.Message && currentMessage.Message.From],
      ToNames: currentMessage.Message && currentMessage.UserMessage.Type == 'Draft'?
        getNames(currentMessage.Message.To) : currentMessage.origin == 'fw'? '':lodash.isEmpty(currentMessage)? '':
         currentMessage.Message && currentMessage.Message.From.PersonName,
      BccNames: getNames(currentMessage.Message && currentMessage.Message.Bcc),
      CcNames: getNames(currentMessage.Message && currentMessage.Message.Cc),
      type: currentMessage.UserMessage && currentMessage.UserMessage.Type,
      id: currentMessage.UserMessage && currentMessage.UserMessage.MessageId,     
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

  send() {
    let formData = new FormData();
    let message = {}
    let messageSearchCriteria=this.props.navigation.state.params.messageSearchCriteria
    let type =messageSearchCriteria.Type;
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
    this.props.navigation.goBack(null);
    this.props[type+'StateActions'].searchMessage(messageSearchCriteria);
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
    let currentMessage = this.props.navigation.state.params.currentMessage;
    if(!lodash.isEmpty(currentMessage) && currentMessage.origin == 'fw'){
      toName = ''}else if(currentMessage.origin == 'reply' || currentMessage.origin == 'replyAll' )
      {toName = currentMessage.Message.From.PersonName}else if(!lodash.isEmpty(currentMessage) && currentMessage.UserMessage.Type == 'Draft')
      {toName = getNames(currentMessage.Message && currentMessage.Message.To)}
    if(!lodash.isEmpty(currentMessage) && currentMessage.UserMessage.Type == 'Draft'){
      messageBody = currentMessage.Message.MessageBody;
    }else{messageBody = ''}
    if(lodash.isEmpty(currentMessage)){
      if( lodash.isEmpty(this.state.ToNames) && lodash.isEmpty(this.state.Subject) && lodash.isEmpty(this.state.CcNames) && lodash.isEmpty(this.state.BccNames)  && lodash.isEmpty(this.state.MessageBody) ){this.props.navigation.goBack(null);}
      else{    return this.setState({ isModalVisible: true })}
    }else{
      if( this.state.ToNames == toName &&
      this.state.Subject == currentMessage.Message.Subject &&
      this.state.CcNames == getNames(currentMessage.Message && currentMessage.Message.Cc) && 
      this.state.BccNames == getNames(currentMessage.Message && currentMessage.Message.Bcc)  && 
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
    let messageSearchCriteria=this.props.navigation.state.params.messageSearchCriteria
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
    if(messageSearchCriteria.Type == 'Draft'){
      this.props.DraftStateActions.searchMessage(messageSearchCriteria);
    }
  }

  render() {
    return (
      <View>
        <View style={styles.messageHead}>
          <TouchableOpacity onPress={() => this.back()} style={styles.flex}>
            <Icon name='arrow-left' size={30} color={'orange'} />
          </TouchableOpacity>
          <Text style={styles.messageTitile}>CreateMessage</Text>
          {this.state.To[0]==undefined || this.state.To[0].Id == ''? 
            <View style={{flex: 1}}>
            <Icon name='direction' size={30} color={'grey'} />
            </View>:
          <TouchableOpacity style={styles.flex} onPress={() => this.send()}>
            <Icon name='direction' size={30} color={'orange'} />
          </TouchableOpacity>
          }
        </View>
        <View style={styles.messageContent}>
          <View style={styles.messageBorderBottom}>
            <Text style={styles.messageText}>To:</Text>
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
          <View style={styles.messageBorderBottom}>
            <Text style={styles.messageText}>Cc:</Text>
            <TextInput value={this.state.CcNames} onChangeText={(text) => {
              this.setState({
                'Cc': {
                  'PersonName': text,
                  'Id': text
                }
              })
            }}
              style={styles.flex}>
            </TextInput>
            <TouchableOpacity onPress={() => this.selectName('CcNames')} >
              <Icon name='circle-with-plus' size={30} color={'#007FFB'} />
            </TouchableOpacity>
          </View>
          <View style={styles.messageBorderBottom}>
            <Text style={styles.messageText}>Bcc:</Text>
            <TextInput value={this.state.BccNames} style={styles.flex}></TextInput>
            <TouchableOpacity onPress={() => this.selectName('BccNames')}>
              <Icon name='circle-with-plus' size={30} color={'#007FFB'} />
            </TouchableOpacity>
          </View>
          <View style={styles.messageBorderBottom}>
            <Text style={styles.messageText}>Subject:</Text>
            <TextInput value={this.state.Subject} onChangeText={(Subject) => { this.setState({ Subject }) }} style={styles.flex}></TextInput>
          </View>
          <View style={{ flexDirection: 'column', height: 300 }}>
            <TextInput style={styles.messageBody}  onChangeText={(text) => this.setState({ 'MessageBody': text })} value={this.state.MessageBody} multiline={true} />
            {lodash.isEmpty(this.state.LastMessageBody) ? null : <WebView source={{html: this.state.LastMessageBody}} style={styles.height}/>}
          </View>
        </View>
        <ModalComponent isModalVisible={this.state.isModalVisible} hideModal={this.hideModal} deleteModal={this.deleteModal} save={this.save} />
      </View>
    );
  }
}

export default CreateMessageView;
