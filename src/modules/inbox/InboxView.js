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

import Icon from 'react-native-vector-icons/MaterialIcons';

class InboxView extends Component {
  constructor(props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    dataSource: ds.cloneWithRows([{fromName:'fromName1',subjectName:'Subject1',messageBody:'This is Message Body!!'}, {fromName:'fromName2',subjectName:'Subject2',messageBody:'This is Message Body222!!'}]),
  };
}
  static displayName = 'CounterView';

  static navigationOptions = {
    title: 'Inbox',
    tabBar: () => ({
      icon: (props) => (
        <Icon name='plus-one' size={24} color={props.tintColor} />
      )
    })
  }

  static propTypes = {
    counter: PropTypes.number.isRequired,
    userName: PropTypes.string,
    userProfilePhoto: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    counterStateActions: PropTypes.shape({
      increment: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired,
      random: PropTypes.func.isRequired
    }).isRequired,
    navigate: PropTypes.func.isRequired
  };

  render() {

    return (
      <ListView
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


      {/*<View style={styles.container}>
        <View style={{flexDirection:'row',marginLeft:20,marginRight:10}}>
          <View style={circle}>
            <Image style={{width: 40,height: 40,borderRadius: 20}} source={require('./../../../images/pepperoni.png')}></Image>
          </View>
          <View style={{flex:3,marginLeft:10,borderBottomColor:'#ddd',borderBottomWidth:1,paddingBottom:4}}>
            <Text style={{fontSize:18}}>fromName</Text>
            <Text style={{fontSize:14}}>Subject</Text>
            <Text style={{fontSize:14}}>This is Message Body!!</Text>
          </View>
        </View>
        <View style={{flexDirection:'row',marginLeft:20,marginRight:10}}>
          <View style={circle}>
            <Image style={{width: 40,height: 40,borderRadius: 20}} source={require('./../../../images/pepperoni.png')}></Image>
          </View>
          <View style={{flex:3,marginLeft:10,borderBottomColor:'#ddd',borderBottomWidth:1,paddingBottom:4}}>
            <Text style={{fontSize:18}}>fromName2</Text>
            <Text style={{fontSize:14}}>Subject2</Text>
            <Text style={{fontSize:14}}>This is Message Body2!!</Text>
          </View>
        </View>
      </View>*/}
