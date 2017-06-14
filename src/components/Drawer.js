import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';
import {MessageFormatDate} from './../utils/dateTimeHelper';
import Icon from 'react-native-vector-icons/Entypo';


class DrawerModel extends Component{
  static propTypes = {
    //messageData:PropTypes.object
  };
  
render() {
  return <TouchableOpacity onPress={this.props.transformMessage.bind(this,this.props.messageData)}>
    <View
      style={{
      flex: 1,
      flexDirection: 'row',
      marginLeft: 10,
      marginRight: 10 ,
      backgroundColor: '#fff'    
    }}>
      <View style={circle}>
      
          {this.props.messageData && this.props.messageData =='Inbox'?<Icon name='box' size={30} color={'#868A8F'} />:
           this.props.messageData && this.props.messageData =='Sent'?<Icon name='direction' size={30} color={'#868A8F'} />:
           this.props.messageData && this.props.messageData =='Draft'?<Icon name='news' size={30} color={'#868A8F'} />:
           <Icon name='archive' size={30} color={'#868A8F'} />}

      </View>
      <View
        style={{
        flex: 3,
        marginLeft: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingBottom: 4,
        alignItems: 'flex-start', 
        justifyContent: 'center' 
      }}
        
      >     
        <Text  style={{color: '#32363C', fontSize:16}}>
            {this.props.messageData}
        </Text>        
      </View>
    </View>
  </TouchableOpacity>
}
}
const circle = {
  borderWidth: 0,
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent:'center',
  alignItems:'center',
  overflow:'hidden'
};

export default DrawerModel;