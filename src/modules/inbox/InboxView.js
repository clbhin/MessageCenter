import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

class InboxView extends Component {
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

  increment = () => {
    this.props.counterStateActions.increment();
  };

  reset = () => {
    this.props.counterStateActions.reset();
  };

  random = () => {
    this.props.counterStateActions.random();
  };

  bored = () => {
    this.props.navigate({routeName: 'Color'});
  };

  renderUserInfo = () => {
    if (!this.props.userName) {
      return null;
    }

    return (
      <View style={styles.userContainer}>
        <Image
          style={styles.userProfilePhoto}
          source={{
            uri: this.props.userProfilePhoto,
            width: 80,
            height: 80
          }}
          />
        <Text style={styles.linkButton}>
          Welcome, {this.props.userName}!
        </Text>
      </View>
    );
  };

  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (
      <View style={styles.container}>
        {this.renderUserInfo()}
        <View style={{flexDirection:'row'}}>
          <View style={circle}>
            <Image  source={require('./../../../images/pepperoni.png')}></Image>
          </View>
          <View style={{flex:1}}>
            <Text>fromName</Text>
            <Text>Subject</Text>
          </View>
          <View style={circle}></View>
        </View>
      </View>
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
  overFlow:'hidden'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
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
