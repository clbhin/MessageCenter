import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Button 
} from 'react-native';

class LoginView extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header:{
        style:{height:0}
        }
    }

    loginIn(userId){
        this.props.LoginStateActions.loginIn(userId);
        this.props.navigate({routeName: 'InboxStack'});
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>this.loginIn('Xiang Zhang')}>
                    <Text style={styles.loginText}>login as Xiang Zhang</Text>   
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.loginIn('Yanliang Sun')}>
                    <Text style={styles.loginText}>login as Yanliang Sun </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

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
  },
  loginText:{
      fontSize: 20,
      backgroundColor: '#eee'
  }
});

export default LoginView;