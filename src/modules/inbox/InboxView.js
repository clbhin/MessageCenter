import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ListView
} from 'react-native';
import MessageView from './../../components/Message';
import {GetMessages} from './../../services/messageCenterServices'
import Icon from 'react-native-vector-icons/MaterialIcons';

class InboxView extends Component {
  constructor(props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  const data=[
    {Message:{From:{Id:'Xiang Zhang',PersonName:'Xiang Zhang'},Subject:'111',MessageBody:'<p>111</p>'}},
    {Message:{From:{Id:'Xiang Zhang',PersonName:'Xiang Zhang'},Subject:'222',MessageBody:'<p>222</p>'}}]
  // const data=[
  //   {fromName:'fromName1',subjectName:'Subject1',messageBody:'This is Message Body!!',timeStamp:'0619'}, 
  //   {fromName:'fromName2',subjectName:'Subject2',messageBody:'This is Message Body222!!',timeStamp:'1011'},
  //   {fromName:'fromName3',subjectName:'Subject3',messageBody:'This is Message Body333!!',timeStamp:'0912'}];
  this.state = {
    dataSource: ds.cloneWithRows(data),
  };
  this.ds=ds;
}
  static displayName = 'InboxView';

  static navigationOptions = {
    title: 'Inbox',
    tabBar: () => ({
      icon: (props) => (
        <Icon name='plus-one' size={24} color={props.tintColor} />
      )
    })
  }

  static propTypes = {
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    try{
      if (nextProps.value !== this.props.value) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.value)
      });
    }
    }catch(err){
      console.log(err)
    }
  }

  componentWillMount(){
    this.props.InboxStateActions.getMessages('Xiang Zhang','Inbox');
  }


  render() {
    return (
      <ListView style={{paddingTop:10}}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => 
      <MessageView messageData={rowData}/>
      }/>
    );
  }
}

const circle = {
  borderWidth: 0,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor:'red',
  justifyContent:'center',
  alignItems:'center',
  overflow:'hidden'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:10
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center'
  },
  counterButton: {
    ...circle,
    backgroundColor: '#349d4a',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  counter: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  }
});

export default InboxView;