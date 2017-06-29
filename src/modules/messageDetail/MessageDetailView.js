import React, { PropTypes, Component } from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ListView,
  Dimensions,
  ScrollView,
  Image,
  WebView
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import { MessageFormatAllDate } from '../../utils/dateTimeHelper';
import { getNames, formatStyle} from '../../services/mcServices';
import lodash from 'lodash';
import styles from './../../styles/MessageDetailView';

/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class MessageDetailView extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      background: 'red',
      currentMessage: this.props.navigation.state.params.currentMessage,
      type: this.props.navigation.state.params.messageSearchCriteria.Type
    };
    this.data = [];
    this.ds = ds;
    this.screenSize = Dimensions.get('window');
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
        height: 0
      }
    }
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  back = () => {
    this.props.navigation.goBack(null)
    this.props[this.state.type+'StateActions'].searchMessage(this.props.navigation.state.params.messageSearchCriteria);
  }
  reply = (data, type) => {
    let currentMessage = lodash.cloneDeep(data);
    let messageSearchCriteria = type;
    currentMessage.origin = 'reply';
    currentMessage.Message.Cc = [];
    currentMessage.Message.Bcc = [];
    currentMessage.Message.Subject = 'RE:' +(lodash.isEmpty(currentMessage.Message.Subject)?'':currentMessage.Message.Subject);
    this.props.navigate({ routeName: 'CreateMessageStack', params: {currentMessage, messageSearchCriteria} });
  };

  replyAll = (data, type) => {
    let currentMessage = lodash.cloneDeep(data);
    let messageSearchCriteria = type;
    currentMessage.origin = 'replyAll';
    currentMessage.Message.Subject = 'RE:' + (lodash.isEmpty(currentMessage.Message.Subject)?'':currentMessage.Message.Subject);
    this.props.navigate({ routeName: 'CreateMessageStack', params: {currentMessage, messageSearchCriteria} });
  }

  deleteMessage(userMessage,criteriaCollection) {
    this.props.navigation.goBack(null);
    if (userMessage.Type === 'Inbox') {
      this.props.InboxStateActions.deleteMessage(userMessage, criteriaCollection)
    } else if (userMessage.Type === 'Sent') {
      this.props.SentStateActions.deleteMessage(userMessage, criteriaCollection)
    } else if(userMessage.Type === 'Archive'){
      this.props.ArchiveStateActions.deleteMessage(userMessage, criteriaCollection)
    }
  }

  forward = (data, type) => {
    let currentMessage = lodash.cloneDeep(data);
    let messageSearchCriteria = type;
    //data.Message.From = {}
    currentMessage.origin = 'fw';
    currentMessage.Message.Cc = [];
    currentMessage.Message.Bcc = [];
    currentMessage.Message.Subject = 'FW:' + (lodash.isEmpty(currentMessage.Message.Subject)?'':currentMessage.Message.Subject);
    this.props.navigate({ routeName: 'CreateMessageStack', params: {currentMessage, messageSearchCriteria} });
  }

  markMessage=(userMessage,criteriaCollection)=>{
    if (userMessage.Mark === 'Marked') {
      const markState = Object.assign({}, this.state.currentMessage.UserMessage, {'Mark': 'UnMark'})
      this.setState({markState})
    } else {
      const markState = Object.assign({}, this.state.currentMessage.UserMessage, {'Mark': 'Marked'})
      this.setState({markState})
    }
    if (userMessage.Type === 'Inbox') {
      this.props.InboxStateActions.markMessage(userMessage, criteriaCollection)
    } else if (userMessage.Type === 'Sent') {
      this.props.SentStateActions.markMessage(userMessage, criteriaCollection)
    }else if(userMessage.Type === 'Archive'){
      this.props.ArchiveStateActions.markMessage(userMessage, criteriaCollection)
    }
  }

  render() {
    return (
      <View>
        <View style={styles.messageHead}>
          <TouchableOpacity onPress={() => this.back()} style={styles.flex}>
            <Icon name='arrow-left' size={30} color={'orange'} />
          </TouchableOpacity>
          <Image style={styles.image} source={require('./../../../images/user_1.png')}></Image>
          <Text style={styles.messageName}>{this.state.currentMessage.Message && this.state.currentMessage.Message.From.PersonName}</Text>
          {(this.state.currentMessage.UserMessage && this.state.currentMessage.UserMessage.Mark === 'Marked') ? <Icon name='star' size={18} color={'orange'} /> : <Icon name='star-outlined' size={18} color={'#ccc'} />}
        </View>
        <View style={styles.messageContent}>
          <Text style={styles.messageBorderBottom}>To:{getNames(this.state.currentMessage.Message.To)}</Text>
          {getNames(this.state.currentMessage.Message.Cc) ? <Text style={styles.messageBorderBottom}>Cc:{getNames(this.state.currentMessage.Message.Cc)}</Text> : null}
          {getNames(this.state.currentMessage.Message.Bcc) ? <Text style={styles.messageBorderBottom}>Bcc:{getNames(this.state.currentMessage.Message.Bcc)}</Text> : null}
          {this.state.currentMessage.Message.AttachmentFiles.length > 0 ?
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
              <Text style={{ fontSize: 16, height: 20, justifyContent: 'center' }}>Attachments:</Text>
              {this.state.currentMessage.Message.AttachmentFiles.map((file, key) => {
                return <View key={key} style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                        <Text>{file.FileName}</Text>
                      </View>})}
            </View> : null}
          <Text style={styles.messageCenter}>Subject:{this.state.currentMessage.Message.Subject}</Text>
          <Text style={styles.messageDate}>Date:{MessageFormatAllDate(this.state.currentMessage.Message.Timestamp)}</Text>
          <WebView source={{html: this.state.currentMessage.Message.MessageBody}} style={{minHeight:400}}/>
        </View>
        <View style={{ height: 40, borderRadius: 20, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 24, paddingRight: 24, alignItems: 'center', position: 'absolute', top: this.screenSize.height - 80, left: 0, right: 0, opacity: 0.8 }}>
          <TouchableOpacity style={styles.messageBottomCenter} onPress={this.reply.bind(this, this.state.currentMessage, this.props.navigation.state.params.messageSearchCriteria)}>
            <Icon name='reply' size={20} color={'blue'} />
            <Text>REPLY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageBottomCenter} onPress={this.replyAll.bind(this, this.state.currentMessage, this.props.navigation.state.params.messageSearchCriteria)}>
            <Icon name='reply-all' size={20} color={'blue'} />
            <Text>REPLYALL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageBottomCenter} onPress={() => { this.forward(this.state.currentMessage, this.props.navigation.state.params.messageSearchCriteria) }}>
            <Icon name='forward' size={20} color={'blue'} />
            <Text>FORWARD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageBottomCenter} onPress={() => { this.deleteMessage(this.state.currentMessage.UserMessage,this.props.navigation.state.params.messageSearchCriteria) }}>
            <Icon name='trash' size={20} color={'blue'} />
            <Text>DELETE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageBottomCenter} onPress={() => this.markMessage(this.state.currentMessage.UserMessage,this.props.navigation.state.params.messageSearchCriteria)}>
            {(this.state.currentMessage.UserMessage && this.state.currentMessage.UserMessage.Mark === 'Marked') ? <Icon name='star' size={20} color={'orange'} /> : <Icon name='star-outlined' size={20} color={'#ccc'} />}
            <Text>MARK</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

export default MessageDetailView;
