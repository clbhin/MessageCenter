import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ListView
} from 'react-native';
import {MessageFormatDate} from './../utils/dateTimeHelper';
import Icon from 'react-native-vector-icons/Entypo';
import {getNames,formatLabelStyle} from '../services/mcServices';
import styles from './../styles/Message';

class MessageView extends Component{
  constructor(props) {
  super(props);
  
  }
  static propTypes = {
    messageData:PropTypes.object
  };
  
render() {
  let secId = this.props.secId;
  let rowId = this.props.rowId;
  let rowMap = this.props.rowMap;  
  return <TouchableOpacity activeOpacity={1} 
    onPress={()=>{this.props.transformMessage(this.props.messageData);rowMap[`${secId}${rowId}`].closeRow()}} style={styles.rowFront}>
    <View style={styles.messageView}>
      <View style={styles.messageTitle}>
        {(this.props.messageData.UserMessage && this.props.messageData.UserMessage.IsRead)?<View style={{height:8,width:8,borderRadius:4}}></View>:<View style={{height:8,width:8,borderRadius:4,backgroundColor:'#43B1CC'}}></View>}
        <Image style={styles.messageImage}
          source={require('./../../images/headportrait.png')}>
        </Image>
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageBody}>
          <View style={styles.messageType}>
            {(this.props.messageData.UserMessage && this.props.messageData.UserMessage.Type==='Sent' || (this.props.messageData.UserMessage && this.props.messageData.UserMessage.Type==='Draft'))?<Text style={{fontSize: 18,overflow:'hidden'}}>{getNames(this.props.messageData.Message.To)}</Text>:<Text style={{fontSize: 18,overflow:'hidden'}}>{this.props.messageData.Message.From.PersonName}</Text>}
            {(this.props.messageData.UserMessage && this.props.messageData.UserMessage.Mark==='Marked')?<Icon name='star' size={18} color={'orange'}/>:null}
          </View>
          <Text>{MessageFormatDate(this.props.messageData.Message.Timestamp)}</Text>
        </View>
        <Text style={styles.messageText}>{this.props.messageData.Message.Subject}</Text>
        <View style={styles.messageData}>
          {(this.props.messageData.Message && this.props.messageData.Message.MessageBody)?<Text style={styles.messageText}>{formatLabelStyle(this.props.messageData.Message.MessageBody)}</Text>:null}  
        </View>
      </View>
    </View>
  </TouchableOpacity>
  }
}


export default MessageView;

//<View style={{height:8,width:8,borderRadius:4,backgroundColor:'#43B1CC'}}></View>
